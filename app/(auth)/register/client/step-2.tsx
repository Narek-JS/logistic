import {
  useClearByFocusCell,
  useBlurOnFulfill,
  CodeField,
  Cursor,
} from "react-native-confirmation-code-field";
import { TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Buttons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { useVerifyCodeClientMutation } from "@/store/auth/api";
import { setErrorsFields } from "@/utils/form/errorFields";
import { showMessage } from "react-native-flash-message";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesome } from "@expo/vector-icons";
import { YoPhoneIcon } from "@/components/Icons";
import { useLocale } from "@/hooks/useLocal";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";
import { IError } from "@/store/types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .required("Code is required")
    .length(6, "Code must be 6 digits")
    .matches(/^\d+$/, "Code must contain only numbers"),
});

export default function ClientRegStep2() {
  const router = useRouter();

  const { phone } = useLocalSearchParams();
  const { t } = useLocale();

  const [verifyCode, { isLoading }] = useVerifyCodeClientMutation();

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    watch,
  } = form;

  const code = watch("code");
  const ref = useBlurOnFulfill({ value: code, cellCount: 6 });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    setValue: (val) => setValue("code", val, { shouldValidate: true }),
    value: code,
  });

  const onSubmit = async ({ code }: { code: string }) => {
    try {
      const res = await verifyCode({ code, phone: phone.toString() });

      if (res.data?.message) {
        showMessage({
          message: "Code verified successfully",
          type: "info",
        });

        await AsyncStorage.setItem("ape-ape", res.data.token);

        router.push({
          pathname: "/(auth)/register/client/step-3",
          params: { token: res.data.token },
        });
      } else if ((res.error as any).status === 422) {
        const errorResponse = (res.error as any).data;
        setErrorsFields(form, errorResponse as IError);
      } else {
        const message =
          (res.error as any).data.message ||
          "Could not verify code. Please try again.";

        showMessage({ message, type: "danger" });
      }
    } catch (error) {
      console.log("verify code error --> ", error);
      showMessage({
        message: "Could not verify code. Please try again.",
        type: "danger",
      });
    }
  };

  const handleCodeChange = (value: string) => {
    setValue("code", value, { shouldValidate: true });
  };

  const handleYoPhone = () => {};

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Text style={styles.stepActive}>1/</Text>
              <Text style={styles.stepInactive}>2</Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesome name="chevron-left" size={16} />
            </TouchableOpacity>
          ),
          title: t("clientPhoneVerification.title"),
          headerShown: true,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.container}
      >
        <View style={styles.codeContainer}>
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <CodeField
                ref={ref}
                {...props}
                value={field.value}
                onChangeText={(val) => {
                  handleCodeChange(val);
                  field.onChange(val);
                }}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => {
                  const hasSymbol = symbol && symbol.length > 0;
                  const showErrorStyle = errors.code && code.length === 6;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.codeInput,
                        hasSymbol && styles.codeInputFilled,
                        showErrorStyle && styles.codeInputError,
                      ]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      <Text style={styles.codeText}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  );
                }}
              />
            )}
          />

          <Text style={styles.instructionText}>
            {t("clientPhoneVerification.verificationCode.instruction")}
          </Text>

          {errors.code && (
            <Text style={styles.errorText}>
              {errors.code?.message ||
                t("clientPhoneVerification.verificationCode.codeRequired")}
            </Text>
          )}

          <ButtonPrimary
            onPress={handleSubmit(onSubmit)}
            disabled={code.length !== 6}
            style={styles.verifyButton}
            isLoading={isLoading}
          >
            {t("clientPhoneVerification.verificationCode.verifyButton")}
          </ButtonPrimary>
        </View>

        <View style={styles.bottomSection}>
          <ButtonSecondary
            leftComponent={<YoPhoneIcon color="#000000" />}
            style={styles.yoPhoneButton}
            onPress={handleYoPhone}
          >
            <Text style={{ fontFamily: "open-sans-bold" }}>
              {t("clientPhoneVerification.continueWithYoPhone")}
            </Text>
          </ButtonSecondary>

          <TermsAndPrivacy
            privacyCallback={() => console.log("Privacy pressed")}
            termsCallback={() => console.log("Terms pressed")}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  headerRightContainer: {
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  stepActive: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
  },
  stepInactive: {
    fontSize: 16,
    color: Colors.inactiveGray,
    fontWeight: "bold",
  },
  codeContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  codeFieldRoot: {
    gap: 12,
  },
  codeInput: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  codeInputFilled: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
  },
  codeInputError: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Colors.error,
  },
  codeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  instructionText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 20,
    maxWidth: 280,
  },
  errorText: {
    fontSize: 14,
    color: Colors.error,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 280,
  },
  bottomSection: {
    gap: 16,
    marginTop: 40,
    marginBottom: 24,
  },
  verifyButton: {
    marginTop: 8,
  },
  yoPhoneButton: {
    backgroundColor: Colors.secondary,
    height: 54,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

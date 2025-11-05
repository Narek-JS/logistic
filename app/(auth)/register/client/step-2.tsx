import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import {
  useClearByFocusCell,
  useBlurOnFulfill,
  CodeField,
  Cursor,
} from "react-native-confirmation-code-field";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Buttons";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesome } from "@expo/vector-icons";
import { YoPhoneIcon } from "@/components/Icons";
import { Stack, useRouter } from "expo-router";
import { useLocale } from "@/hooks/useLocal";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";
import { useState } from "react";
import * as yup from "yup";
import { useVerifyCodeMutation } from "@/store/auth/api";

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .required("Code is required")
    .length(4, "Code must be 4 digits")
    .matches(/^\d+$/, "Code must contain only numbers"),
});

// const verifyCode = async (code: string): Promise<boolean> => {
//   await new Promise((resolve) => setTimeout(resolve, 1500));

//   return code === "1234";
// };

export default function ClientRegStep2() {
  const router = useRouter();
  const { t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const [verifyCode] = useVerifyCodeMutation();

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: { code: "" },
  });

  const code = watch("code");

  const ref = useBlurOnFulfill({ value: code, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: (val) => {
      setValue("code", val, { shouldValidate: true });
      setShowError(false);
    },
  });

  const onSubmit = async (data: { code: string }) => {
    setIsLoading(true);
    setShowError(false);

    const res = await verifyCode({ code: "593981", phone: "+37498738620" });

    console.log(res);
    router.replace("/(auth)/register/client/step-3");

    try {
      // const isValid = await verifyCode({ code });
      // if (isValid) {
      //   router.replace("/(auth)/register/client/step-3");
      // } else {
      //   setShowError(true);
      // }
    } catch {
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (value: string) => {
    setValue("code", value, { shouldValidate: true });
    setShowError(false);
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
                cellCount={4}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => {
                  const hasSymbol = symbol && symbol.length > 0;
                  const showErrorStyle =
                    showError || (errors.code && code.length === 4);
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

          {(errors.code || showError) && (
            <Text style={styles.errorText}>
              {showError
                ? t("clientPhoneVerification.verificationCode.invalidCode")
                : errors.code?.message ||
                  t("clientPhoneVerification.verificationCode.codeRequired")}
            </Text>
          )}

          <ButtonPrimary
            style={styles.verifyButton}
            onPress={handleSubmit(onSubmit)}
            disabled={code.length !== 4 || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              t("clientPhoneVerification.verificationCode.verifyButton")
            )}
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
            termsCallback={() => console.log("Terms pressed")}
            privacyCallback={() => console.log("Privacy pressed")}
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
    width: 56,
    height: 56,
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

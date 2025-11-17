import { TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Buttons";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { setErrorsFields } from "@/utils/form/errorFields";
import { showMessage } from "react-native-flash-message";
import { PhoneNumberInput } from "@/components/shared";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePhoneClientMutation } from "@/store/auth/api";
import { FontAwesome } from "@expo/vector-icons";
import { YoPhoneIcon } from "@/components/Icons";
import { Stack, useRouter } from "expo-router";
import { useLocale } from "@/hooks/useLocal";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";
import { IError } from "@/store/types";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  phone: yup.string().required(),
});

export default function DriverPhoneStep() {
  const router = useRouter();
  const { t } = useLocale();

  const [phoneMutation, { isLoading }] = usePhoneClientMutation();

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { phone: "" },
    mode: "onChange",
  });

  const {
    formState: { isValid, errors },
    handleSubmit,
    control,
  } = form;

  const onSubmit = async ({ phone }: { phone: string }) => {
    try {
      const res = await phoneMutation({ phone });

      if (res.data?.message) {
        showMessage({
          message: "A verification code has been sent to your phone",
          type: "info",
        });
        router.push({
          pathname: "/(auth)/register/driver/step-2",
          params: { phone },
        });
      } else if ((res.error as any).status === 422) {
        const errorResponse = (res.error as any).data;
        setErrorsFields(form, errorResponse as IError);
      } else {
        const message =
          (res.error as any).data.message ||
          "Could not send verification code. Please try again.";

        showMessage({ message, type: "danger" });
      }
    } catch (error) {
      console.log("phone error --> ", error);
      showMessage({
        message: "Could not send verification code. Please try again.",
        type: "danger",
      });
    }
  };

  const handleYoPhone = () => {
    console.log("YoPhone integration");
  };

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
          title: t("driverPhoneVerification.title"),
          headerShown: true,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.container}
      >
        <View style={{ gap: 5 }}>
          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <PhoneNumberInput
                onChange={field.onChange}
                placeholder={t(
                  "driverPhoneVerification.phoneNumberPlaceholder"
                )}
                value={field.value}
                error={fieldState.error?.message || errors.phone?.message}
                defaultCountry="AM"
              />
            )}
          />
          <ButtonPrimary
            onPress={handleSubmit(onSubmit)}
            style={styles.sendCodeButton}
            isLoading={isLoading}
            disabled={!isValid}
          >
            {t("driverPhoneVerification.sendCodeButton")}
          </ButtonPrimary>
        </View>

        <View style={{ gap: 16, marginBottom: 24 }}>
          <ButtonSecondary
            leftComponent={<YoPhoneIcon />}
            style={styles.yoPhoneButton}
            onPress={handleYoPhone}
          >
            <Text style={{ fontFamily: "open-sans-bold" }}>
              {t("driverPhoneVerification.continueWithYoPhone")}
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
  sendCodeButton: {
    marginTop: 8,
  },
  spacer: {
    flex: 1,
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

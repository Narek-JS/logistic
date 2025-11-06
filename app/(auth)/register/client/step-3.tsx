import { TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { setErrorsFields } from "@/utils/form/errorFields";
import { TextInput } from "@/components/shared/TextInput";
import { showMessage } from "react-native-flash-message";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { useRegisterMutation } from "@/store/auth/api";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesome } from "@expo/vector-icons";
import { useLocale } from "@/hooks/useLocal";
import { setRole } from "@/store/auth/slice";
import { Colors } from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { Text } from "@/components/ui";
import { IError } from "@/store/types";
import * as yup from "yup";

interface PasswordValidation {
  hasUppercase: boolean;
  hasLowercase: boolean;
  minLength: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

const validatePassword = (password: string): PasswordValidation => ({
  hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  hasUppercase: /[A-Z]/.test(password),
  hasLowercase: /[a-z]/.test(password),
  minLength: password.length >= 12,
  hasNumber: /\d/.test(password),
});

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function ClientRegStep3() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useLocale();
  const { token } = useLocalSearchParams();
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    },
  });

  const { handleSubmit, control, watch } = form;

  const onSubmit = async (data: {
    passwordConfirmation: string;
    firstName: string;
    password: string;
    lastName: string;
    email: string;
  }) => {
    try {
      const res = await register({ ...data, token });

      if (res.data?.message) {
        showMessage({
          message: "Account created successfully",
          type: "info",
        });
        dispatch(setRole({ role: "client" }));
        router.push("/(client)/profile");
      } else if ((res.error as any).status === 422) {
        const errorResponse = (res.error as any).data;
        setErrorsFields(form, errorResponse as IError);
      } else {
        const message =
          (res.error as any).data.message ||
          "Could not create account. Please try again.";

        showMessage({ message, type: "danger" });
      }
    } catch (error) {
      console.log("verify code error --> ", error);
      showMessage({
        message: "Could not create account. Please try again.",
        type: "danger",
      });
    }
  };

  const password = watch("password");
  const passwordValidation = validatePassword(password || "");

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <Text style={styles.stepActive}>2/</Text>
              <Text style={styles.stepInactive}>2</Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesome name="chevron-left" size={16} />
            </TouchableOpacity>
          ),
          title: t("clientRegStep3.title"),
          headerShown: true,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.container}
      >
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="firstName"
            render={({ field, fieldState }) => (
              <TextInput
                label={t("clientRegStep3.firstNamePlaceholder")}
                errorText={fieldState.error?.message}
                onChangeText={field.onChange}
                autoCapitalize="words"
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <TextInput
                label={t("clientRegStep3.surenamePlaceholder")}
                errorText={fieldState.error?.message}
                onChangeText={field.onChange}
                autoCapitalize="words"
                value={field.value}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                label={t("clientRegStep3.emailPlaceholder")}
                errorText={fieldState.error?.message}
                onChangeText={field.onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                value={field.value}
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <>
                <TextInput
                  onChangeText={field.onChange}
                  errorText={fieldState.error?.message}
                  label={t("clientRegStep3.password")}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={field.value}
                />

                <Controller
                  control={control}
                  name="passwordConfirmation"
                  render={({ field, fieldState }) => (
                    <TextInput
                      errorText={fieldState.error?.message}
                      onChangeText={field.onChange}
                      label={"Confirm password"}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={field.value}
                    />
                  )}
                />

                {/* Password Validation Requirements */}
                <View style={styles.validationContainer}>
                  <Text style={styles.validationTitle}>
                    {t("clientRegStep3.passwordValidation.title")}
                  </Text>
                  <View style={styles.validationList}>
                    <ValidationItem
                      text={t("clientRegStep3.passwordValidation.min12")}
                      isValid={passwordValidation.minLength}
                    />
                    <ValidationItem
                      text={t("clientRegStep3.passwordValidation.uppercase")}
                      isValid={passwordValidation.hasUppercase}
                    />
                    <ValidationItem
                      text={t("clientRegStep3.passwordValidation.lowercase")}
                      isValid={passwordValidation.hasLowercase}
                    />
                    <ValidationItem
                      text={t("clientRegStep3.passwordValidation.number")}
                      isValid={passwordValidation.hasNumber}
                    />
                    <ValidationItem
                      text={t("clientRegStep3.passwordValidation.symbol")}
                      isValid={passwordValidation.hasSymbol}
                    />
                  </View>
                </View>
              </>
            )}
          />

          <ButtonPrimary
            onPress={handleSubmit(onSubmit)}
            style={styles.createButton}
            isLoading={isLoading}
          >
            {t("clientRegStep3.createAccountButton")}
          </ButtonPrimary>
        </View>

        <View style={styles.bottomSection}>
          <TermsAndPrivacy
            privacyCallback={() => console.log("Privacy pressed")}
            termsCallback={() => console.log("Terms pressed")}
          />
        </View>
      </ScrollView>
    </>
  );
}

const ValidationItem = (props: { isValid: boolean; text: string }) => (
  <View style={styles.validationItem}>
    <FontAwesome
      color={props.isValid ? "#000000" : Colors.inactiveGray}
      name="check"
      size={16}
    />
    <Text
      style={[
        styles.validationText,
        props.isValid && styles.validationTextValid,
      ]}
    >
      {props.text}
    </Text>
  </View>
);

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
  formContainer: {
    gap: 4,
    marginTop: 8,
  },
  validationContainer: {
    marginTop: 8,
  },
  validationTitle: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 8,
  },
  validationList: {
    gap: 8,
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  validationText: {
    fontSize: 14,
    color: Colors.inactiveGray,
  },
  validationTextValid: {
    color: "#000000",
  },
  createButton: {
    marginTop: 8,
  },
  bottomSection: {
    marginTop: 40,
    marginBottom: 24,
  },
});

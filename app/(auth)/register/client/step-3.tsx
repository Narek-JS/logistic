import { TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { TextInput } from "@/components/shared/TextInput";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useAppDispatch } from "@/store/hooks";
import { setRole } from "@/store/auth/slice";
import { useLocale } from "@/hooks/useLocal";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";
import { useState } from "react";
import * as yup from "yup";
import { useRegisterMutation } from "@/store/auth/api";

interface PasswordValidation {
  hasUppercase: boolean;
  hasLowercase: boolean;
  minLength: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
}

const validatePassword = (password: string): PasswordValidation => {
  return {
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    minLength: password.length >= 12,
    hasNumber: /\d/.test(password),
  };
};

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
});

export default function ClientRegStep3() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useLocale();
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      hasUppercase: false,
      hasLowercase: false,
      minLength: false,
      hasNumber: false,
      hasSymbol: false,
    });

  const [register] = useRegisterMutation();

  const {
    formState: { isValid },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    },
  });

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordValidation(validatePassword(text));
  };

  const onSubmit = async (data: {
    firstName: string;
    password: string;
    lastName: string;
    email: string;
  }) => {
    const res = await register({
      ...data,
      token:
        "b06a85f308fc320ec5e2fc0ebc5b26a5.d1db85b7c58d02a290e16abd67a442031118ffff60d69bd96bfcc4a7e78a1e5e",
    });
    console.log("res -->", res);
    // dispatch(setRole({ role: "client" }));
    // router.push("/(client)/profile");
  };

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

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
                value={field.value}
                onChangeText={field.onChange}
                errorText={fieldState.error?.message}
                autoCapitalize="words"
              />
            )}
          />

          <Controller
            control={control}
            name="lastName"
            render={({ field, fieldState }) => (
              <TextInput
                label={t("clientRegStep3.surenamePlaceholder")}
                value={field.value}
                onChangeText={field.onChange}
                errorText={fieldState.error?.message}
                autoCapitalize="words"
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextInput
                label={t("clientRegStep3.emailPlaceholder")}
                value={field.value}
                onChangeText={field.onChange}
                errorText={fieldState.error?.message}
                keyboardType="email-address"
                autoCapitalize="none"
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
                  secureTextEntry={true}
                  label={t("clientRegStep3.password")}
                  value={password}
                  onChangeText={(text: string) => {
                    handlePasswordChange(text);
                    field.onChange(text);
                  }}
                  errorText={fieldState.error?.message}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* Password Validation Requirements */}
                <View style={styles.validationContainer}>
                  <Text style={styles.validationTitle}>
                    {t("clientRegStep3.passwordValidation.title")}
                  </Text>
                  <View style={styles.validationList}>
                    <ValidationItem
                      isValid={passwordValidation.minLength}
                      text={t("clientRegStep3.passwordValidation.min12")}
                    />
                    <ValidationItem
                      isValid={passwordValidation.hasUppercase}
                      text={t("clientRegStep3.passwordValidation.uppercase")}
                    />
                    <ValidationItem
                      isValid={passwordValidation.hasLowercase}
                      text={t("clientRegStep3.passwordValidation.lowercase")}
                    />
                    <ValidationItem
                      isValid={passwordValidation.hasNumber}
                      text={t("clientRegStep3.passwordValidation.number")}
                    />
                    <ValidationItem
                      isValid={passwordValidation.hasSymbol}
                      text={t("clientRegStep3.passwordValidation.symbol")}
                    />
                  </View>
                </View>
              </>
            )}
          />

          <ButtonPrimary
            style={styles.createButton}
            disabled={!isValid || !isPasswordValid}
            onPress={handleSubmit(onSubmit)}
          >
            {t("clientRegStep3.createAccountButton")}
          </ButtonPrimary>
        </View>

        <View style={styles.bottomSection}>
          <TermsAndPrivacy
            termsCallback={() => console.log("Terms pressed")}
            privacyCallback={() => console.log("Privacy pressed")}
          />
        </View>
      </ScrollView>
    </>
  );
}

const ValidationItem = ({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) => (
  <View style={styles.validationItem}>
    <FontAwesome
      name="check"
      size={16}
      color={isValid ? "#000000" : Colors.inactiveGray}
    />
    <Text
      style={[styles.validationText, isValid && styles.validationTextValid]}
    >
      {text}
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

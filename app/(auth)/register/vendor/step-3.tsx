import { TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { useRegisterVendorMutation } from "@/store/auth/api";
import { setErrorsFields } from "@/utils/form/errorFields";
import { TextInput } from "@/components/shared/TextInput";
import { showMessage } from "react-native-flash-message";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useLocale } from "@/hooks/useLocal";
import { setRole } from "@/store/auth/slice";
import { Colors } from "@/constants/Colors";
import { useDispatch } from "react-redux";
import { Text } from "@/components/ui";
import { IError } from "@/store/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export default function VendorRegStep3() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useLocale();
  const [register, { isLoading }] = useRegisterVendorMutation();
  const form = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      passwordConfirmation: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: {
    passwordConfirmation: string;
    firstName: string;
    password: string;
    lastName: string;
  }) => {
    try {
      const token = (await AsyncStorage.getItem("ape-ape")) || "";
      const res = await register({ ...data, token });

      if (res.data?.data?.token) {
        showMessage({
          message: "Account created successfully",
          type: "info",
        });

        dispatch(setRole({ role: "vendor" }));
        router.push("/(auth)/register/vendor/documents");
      } else if ((res.error as any).status === 422) {
        const errorResponse = (res.error as any).data;
        setErrorsFields(form, errorResponse as IError);
      } else {
        const message =
          (res.error as any)?.data?.message ||
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
          title: t("vendorRegStep3.title"),
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
            name="password"
            render={({ field, fieldState }) => (
              <>
                <TextInput
                  errorText={fieldState.error?.message}
                  label={t("clientRegStep3.password")}
                  onChangeText={field.onChange}
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
  createButton: {
    marginTop: 8,
  },
  bottomSection: {
    marginTop: 40,
    marginBottom: 24,
  },
});

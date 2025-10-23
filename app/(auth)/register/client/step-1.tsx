import { TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Buttons";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { PhoneNumberInput } from "@/components/shared";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";
import parsePhoneNumber from "libphonenumber-js";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      function (value) {
        if (!value) return false;
        try {
          const phoneNumber = parsePhoneNumber(value);
          return phoneNumber ? phoneNumber.isValid() : false;
        } catch {
          return false;
        }
      }
    )
    .required("Phone number is required"),
});

export default function ClientPhoneStep() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: { phoneNumber: "" },
  });

  const onSubmit = (data: { phoneNumber: string }) => {
    router.push("/(auth)/register/client/step-2");
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
          title: "Client Phone Verification",
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
            name="phoneNumber"
            render={({ field, fieldState }) => (
              <PhoneNumberInput
                onChange={field.onChange}
                placeholder="Enter phone number"
                value={field.value}
                error={fieldState.error?.message}
                defaultCountry="AM"
              />
            )}
          />
          <ButtonPrimary
            style={styles.sendCodeButton}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
          >
            Send Code
          </ButtonPrimary>
        </View>

        <View style={{ gap: 16, marginBottom: 24 }}>
          <ButtonSecondary style={styles.yoPhoneButton} onPress={handleYoPhone}>
            <Text style={styles.yoText}>yo</Text>{" "}
            <Text>Continue with Yo. sPhone</Text>
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
    backgroundColor: "#fff",
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
    color: "#BDBDBD",
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
  yoText: {
    fontWeight: "700",
    fontSize: 16,
  },
});

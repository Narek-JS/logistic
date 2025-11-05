import { ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

// const validationSchema = yup.object().shape({
//   email: yup.string().email().required(),
//   firstName: yup.string().required(),
//   surename: yup.string().required(),
//   password: yup.string().required(),
// });

const Login = () => {
  const router = useRouter();

  //   const { control } = useForm({
  //     resolver: yupResolver(validationSchema),
  //     mode: "onChange",
  //     defaultValues: {
  //       firstName: "",
  //       surename: "",
  //       password: "",
  //       email: "",
  //     },
  //   });

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <FontAwesome name="chevron-left" size={16} />
            </TouchableOpacity>
          ),
          title: "Sign In",
          headerShown: true,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        style={styles.container}
      >
        {/* <Controller
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
        /> */}
      </ScrollView>
    </>
  );
};

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
});

export default Login;

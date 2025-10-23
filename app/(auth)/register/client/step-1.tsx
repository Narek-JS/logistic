import { TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Buttons";
import { BottomSheetModal, PhoneNumberInput } from "@/components/shared";
import { countryData } from "@/components/shared/PhoneNumberInput";
import { TermsAndPrivacy } from "@/components/TermsAndPrivacy";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useState, useRef } from "react";
import { Text } from "@/components/ui";

type CountryOption = {
  phoneCode: string;
  code: string;
  name: string;
  flag: string;
};

export default function ClientPhoneStep() {
  const router = useRouter();

  const [selectedCountryCode, setSelectedCountryCode] = useState("US");
  const [phoneNumber, setPhoneNumber] = useState("");

  const bottomSheetRef = useRef<any>(null);
  const canContinue = phoneNumber.length >= 10;

  const handleSend = () => {
    if (!canContinue) return;
    router.push("/(auth)/register/client/step-2");
  };

  const handleYoPhone = () => {
    console.log("YoPhone integration");
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountryCode(countryCode);
    bottomSheetRef.current?.dismiss();
  };

  const countryOptions: CountryOption[] = countryData
    .map((country) => ({
      phoneCode: country.phoneCode,
      code: country.code,
      name: country.name,
      flag: country.flag,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

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
          <PhoneNumberInput
            onCountryCodePress={handleOpenBottomSheet}
            selectedCountryCode={selectedCountryCode}
            onChange={setPhoneNumber}
            placeholder="055 555 555"
            value={phoneNumber}
          />
          <ButtonPrimary
            style={styles.sendCodeButton}
            disabled={!canContinue}
            onPress={handleSend}
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

      <BottomSheetModal
        onClose={() => {}}
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        snapPoints={["60%"]}
        asScrollable
      >
        <BottomSheetFlatList<CountryOption>
          data={countryOptions}
          keyExtractor={(item: CountryOption) => item.code}
          renderItem={({ item }: { item: CountryOption }) => (
            <TouchableOpacity
              style={styles.countryItem}
              onPress={() => handleCountrySelect(item.code)}
            >
              <Text style={styles.countryFlag}>{item.flag}</Text>
              <Text style={styles.countryName}>{item.name}</Text>
              <Text style={styles.countryCode}>{item.phoneCode}</Text>
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>Select Country</Text>
            </View>
          }
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </BottomSheetModal>
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
  bottomSheetContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomSheetHeader: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    marginBottom: 10,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  countryFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  countryCode: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "500",
  },
});

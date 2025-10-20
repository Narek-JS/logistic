import { TouchableOpacity, StyleSheet, TextInput, View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";

export interface PhoneNumberInputProps {
  onChange?: (value: string) => void;
  onCountryCodePress?: () => void;
  selectedCountryCode?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  error?: string;
  style?: any;
}

const countryData = [
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", phoneCode: "+44" },
  { code: "US", name: "United States", flag: "🇺🇸", phoneCode: "+1" },
  { code: "AU", name: "Australia", flag: "🇦🇺", phoneCode: "+61" },
  { code: "AM", name: "Armenia", flag: "🇦🇲", phoneCode: "+374" },
  { code: "DE", name: "Germany", flag: "🇩🇪", phoneCode: "+49" },
  { code: "FR", name: "France", flag: "🇫🇷", phoneCode: "+33" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", phoneCode: "+55" },
  { code: "RU", name: "Russia", flag: "🇷🇺", phoneCode: "+7" },
  { code: "CA", name: "Canada", flag: "🇨🇦", phoneCode: "+1" },
  { code: "JP", name: "Japan", flag: "🇯🇵", phoneCode: "+81" },
  { code: "CN", name: "China", flag: "🇨🇳", phoneCode: "+86" },
  { code: "IN", name: "India", flag: "🇮🇳", phoneCode: "+91" },
];

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  placeholder = "055 555 555",
  selectedCountryCode = "US",
  onCountryCodePress,
  disabled = false,
  onChange,
  error,
  value,
  style,
}) => {
  const [inputValue, setInputValue] = useState("");

  const selectedCountry = useMemo(
    () => countryData.find((country) => country.code === selectedCountryCode),
    [selectedCountryCode]
  );

  const handleInputChange = (text: string) => {
    setInputValue(text);

    if (selectedCountry) {
      const fullPhoneNumber = selectedCountry.phoneCode + text;
      onChange?.(fullPhoneNumber);
    }
  };

  const handleCountryCodePress = () => {
    if (!disabled && onCountryCodePress) {
      onCountryCodePress();
    }
  };

  useEffect(() => {
    if (value) {
      const country = countryData.find((c) => value.startsWith(c.phoneCode));
      if (country) {
        setInputValue(value.replace(country.phoneCode, ""));
      }
    }
  }, [value]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputRow}>
        {/* Country Code Selector */}
        <TouchableOpacity
          style={[styles.codeCell, disabled && styles.disabledCell]}
          onPress={handleCountryCodePress}
          activeOpacity={0.8}
          disabled={disabled}
        >
          <Text style={styles.codeLabel}>Code</Text>
          <View style={styles.codeValueRow}>
            <Text style={styles.codeValue}>
              {selectedCountry ? selectedCountry.phoneCode : "+1"}
            </Text>
            <FontAwesome name="chevron-down" size={12} color="#6b7280" />
          </View>
        </TouchableOpacity>

        {/* Phone Number Input */}
        <View style={styles.phoneCell}>
          <Text style={styles.phoneLabel}>Phone Number</Text>
          <TextInput
            keyboardType="phone-pad"
            placeholder={placeholder}
            placeholderTextColor="#6b7280"
            style={[styles.phoneInput, disabled && styles.disabledInput]}
            value={inputValue}
            onChangeText={handleInputChange}
            returnKeyType="done"
            editable={!disabled}
          />
        </View>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputRow: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    overflow: "hidden",
  },
  codeCell: {
    width: 92,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
  },
  phoneCell: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 6,
    borderLeftWidth: 1,
    borderLeftColor: "#e5e7eb",
  },
  codeLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  phoneLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  codeValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  codeValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  phoneInput: {
    fontSize: 16,
    padding: 0,
    height: 22,
    color: "#000",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
  disabledCell: {
    opacity: 0.5,
  },
  disabledInput: {
    opacity: 0.5,
  },
});

export { PhoneNumberInput };

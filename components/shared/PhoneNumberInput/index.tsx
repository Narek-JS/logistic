import { Select, SelectProps } from "@/components/ui/Select";
import { StyleSheet, TextInput, View } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Text } from "@/components/ui";
import parsePhoneNumber, { CountryCode } from "libphonenumber-js";
import countryData, { Country } from "world-countries";

export interface PhoneNumberInputProps {
  onChange?: (value: string) => void;
  defaultCountry?: CountryCode;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  error?: string;
  style?: any;
}

const getCountryNumber = (country: Country) =>
  country.idd.root +
  (country.idd.suffixes.length === 1 ? country.idd.suffixes[0] : "");

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  onChange,
  placeholder = "Phone number",
  defaultCountry = "AM",
  disabled = false,
  error,
  value,
  style,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState<
    CountryCode | undefined
  >(defaultCountry);

  const selectedCountry = useMemo(
    () => countryData.find((country) => country.cca2 === selectedCountryCode),
    [selectedCountryCode]
  );

  const countryOptions = useMemo(
    () =>
      countryData.map<SelectProps["options"][0]>((country) => ({
        title: (
          <Text style={styles.countryOption}>
            {country.flag} {getCountryNumber(country)} {country.name.common}
          </Text>
        ),
        value: country.cca2,
        extra: { countryName: country.name.common },
      })),
    []
  );

  const handleInputChange = (text: string) => {
    setInputValue(text);

    const phoneNumber = parsePhoneNumber(
      (selectedCountry ? getCountryNumber(selectedCountry) : "") + text,
      selectedCountryCode
    );

    if (phoneNumber) {
      onChange?.(phoneNumber.number);
    }
  };

  useEffect(() => {
    const parsedValue = value ? parsePhoneNumber(value) : undefined;

    if (parsedValue) {
      setSelectedCountryCode(parsedValue.country);
      setInputValue(parsedValue.nationalNumber);
    }
  }, [value]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputRow}>
        {/* Country Code Selector */}
        <Select
          value={selectedCountryCode}
          options={countryOptions}
          onChange={(value) => setSelectedCountryCode(value as CountryCode)}
          renderSelectedValue={() => (
            <View style={styles.codeCellContent}>
              <View style={styles.codeLabelRow}>
                <Text style={styles.codeLabel}>Code</Text>
                <FontAwesome name="chevron-down" size={12} color="#6b7280" />
              </View>
              <View style={styles.codeValueRow}>
                <Text style={styles.countryFlag}>{selectedCountry?.flag}</Text>
                <Text style={styles.codeValue}>
                  {selectedCountry ? getCountryNumber(selectedCountry) : "+374"}
                </Text>
              </View>
            </View>
          )}
          style={[styles.countrySelectWrapper, disabled && styles.disabledCell]}
          inputStyle={styles.countrySelectInput}
          title="Select Country"
          hideArrow={true}
        />

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
  countrySelectWrapper: {
    width: 92,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    height: "auto",
    minWidth: 0,
  },
  codeCellContent: {
    width: 60,
  },
  countrySelectInput: {
    width: 92,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: "transparent",
    height: "auto",
    minWidth: 0,
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
  codeLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
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
  countryFlag: {
    fontSize: 16,
  },
  codeValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  phoneInput: {
    fontSize: 16,
    padding: 0,
    height: 22,
    color: "#000000",
  },
  countryOption: {
    fontSize: 16,
    color: "#000000",
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

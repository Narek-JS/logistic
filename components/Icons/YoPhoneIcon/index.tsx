import { Image, ImageProps } from "react-native";

type Props = Omit<ImageProps, "source"> & {
  color?: string;
  size?: number;
};

export const YoPhoneIcon: React.FC<Props> = ({
  color = "#000000",
  size = 24,
  style,
  ...rest
}) => (
  <Image
    source={require("./icon.png")}
    style={[{ width: size, height: size, tintColor: color }, style]}
    {...rest}
  />
);

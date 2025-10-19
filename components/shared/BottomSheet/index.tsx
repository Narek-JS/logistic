import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { useCallback } from "react";

interface CustomBottomSheetProps extends Omit<BottomSheetProps, "children"> {
  children: React.ReactNode;
  backdrop?: boolean;
  viewProps?: React.ComponentProps<typeof BottomSheetView>;
}

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  children,
  viewProps,
  ...props
}) => {
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  return (
    <BottomSheet
      index={0}
      enableDynamicSizing={false}
      snapPoints={props.snapPoints || ["45%"]}
      backgroundStyle={props.backgroundStyle || styles.bottomSheetBackground}
      enablePanDownToClose={
        props.enablePanDownToClose === undefined
          ? true
          : props.enablePanDownToClose
      }
      handleIndicatorStyle={
        props.handleIndicatorStyle || styles.handleIndicator
      }
      {...(props.backdrop !== false && { backdropComponent: renderBackdrop })}
      {...props}
    >
      <BottomSheetView {...viewProps}>{children}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  handleIndicator: {
    backgroundColor: "#7878801F",
  },
  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export { CustomBottomSheet as BottomSheet };

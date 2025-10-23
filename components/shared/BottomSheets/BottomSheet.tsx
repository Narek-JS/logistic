import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useCallback, useImperativeHandle, useRef, forwardRef } from "react";
import { StyleSheet } from "react-native";

export interface CustomBottomSheetProps
  extends Omit<BottomSheetProps, "children" | "ref"> {
  viewProps?: React.ComponentProps<typeof BottomSheetView>;
  children: React.ReactNode;
  asScrollable?: boolean;
  onClose?: () => void;
  backdrop?: boolean;
  index?: number;
}

export interface BottomSheetRef {
  snapToIndex: (index: number) => void;
  close: () => void;
}

const CustomBottomSheet = forwardRef<BottomSheetRef, CustomBottomSheetProps>(
  (
    {
      backdrop = true,
      asScrollable,
      viewProps,
      children,
      onClose,
      index,
      ...restProps
    },
    ref
  ) => {
    const sheetRef = useRef<BottomSheetMethods>(null);

    useImperativeHandle(
      ref,
      () => ({
        snapToIndex: (snapIndex: number) => {
          sheetRef.current?.snapToIndex(snapIndex);
        },
        close: () => {
          sheetRef.current?.close();
        },
      }),
      []
    );

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
        ref={sheetRef}
        index={index ?? 0}
        enableDynamicSizing={false}
        snapPoints={restProps.snapPoints || ["45%"]}
        backgroundStyle={
          restProps.backgroundStyle || styles.bottomSheetBackground
        }
        enablePanDownToClose={
          restProps.enablePanDownToClose === undefined
            ? true
            : restProps.enablePanDownToClose
        }
        handleIndicatorStyle={
          restProps.handleIndicatorStyle || styles.handleIndicator
        }
        onChange={(idx) => {
          if (idx === -1) {
            onClose?.();
          }
        }}
        {...(backdrop && { backdropComponent: renderBackdrop })}
        {...restProps}
      >
        {asScrollable ? (
          children
        ) : (
          <BottomSheetView {...viewProps}>{children}</BottomSheetView>
        )}
      </BottomSheet>
    );
  }
);

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

CustomBottomSheet.displayName = "BottomSheet";

export { CustomBottomSheet as BottomSheet };

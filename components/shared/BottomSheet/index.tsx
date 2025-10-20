import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import {
  BottomSheetModalMethods,
  BottomSheetMethods,
} from "@gorhom/bottom-sheet/lib/typescript/types";
import { useCallback, useImperativeHandle, useRef, forwardRef } from "react";
import { StyleSheet } from "react-native";

export interface CustomBottomSheetProps
  extends Omit<BottomSheetProps, "children" | "ref"> {
  viewProps?: React.ComponentProps<typeof BottomSheetView>;
  children: React.ReactNode;
  asScrollable?: boolean;
  onClose?: () => void;
  backdrop?: boolean;
  useModal?: boolean;
  index?: number;
}

export interface BottomSheetRef {
  snapToIndex: (index: number) => void;
  present: () => void;
  dismiss: () => void;
  close: () => void;
}

const CustomBottomSheet = forwardRef<BottomSheetRef, CustomBottomSheetProps>(
  (
    {
      asScrollable,
      viewProps,
      children,
      index,
      onClose,
      backdrop = true,
      useModal = false,
      ...restProps
    },
    ref
  ) => {
    const sheetRef = useRef<BottomSheetMethods>(null);
    const modalRef = useRef<BottomSheetModalMethods>(null);
    const shouldUseModal = useModal || (backdrop && index === undefined);

    // Expose ref methods for backward compatibility
    useImperativeHandle(
      ref,
      () => ({
        snapToIndex: (snapIndex: number) => {
          if (shouldUseModal) {
            if (snapIndex === -1) {
              modalRef.current?.dismiss();
            } else {
              modalRef.current?.present();
              setTimeout(() => {
                modalRef.current?.snapToIndex(snapIndex);
              }, 50);
            }
          } else {
            sheetRef.current?.snapToIndex(snapIndex);
          }
        },
        close: () => {
          if (shouldUseModal) {
            modalRef.current?.dismiss();
          } else {
            sheetRef.current?.close();
          }
        },
        present: () => {
          if (shouldUseModal) {
            modalRef.current?.present();
          }
        },
        dismiss: () => {
          if (shouldUseModal) {
            modalRef.current?.dismiss();
          }
        },
      }),
      [shouldUseModal]
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

    if (!shouldUseModal) {
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

    // Use BottomSheetModal for conditional patterns that need backdrop overlay
    return (
      <BottomSheetModal
        ref={modalRef}
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
        onDismiss={onClose}
        {...(backdrop && { backdropComponent: renderBackdrop })}
        {...restProps}
      >
        {asScrollable ? (
          children
        ) : (
          <BottomSheetView {...viewProps}>{children}</BottomSheetView>
        )}
      </BottomSheetModal>
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

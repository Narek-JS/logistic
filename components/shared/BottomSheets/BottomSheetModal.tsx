import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useCallback, useImperativeHandle, useRef, forwardRef } from "react";
import { StyleSheet } from "react-native";

export interface CustomBottomSheetModalProps
  extends Omit<BottomSheetModalProps, "children" | "ref"> {
  viewProps?: React.ComponentProps<typeof BottomSheetView>;
  children: React.ReactNode;
  asScrollable?: boolean;
  onClose?: () => void;
  backdrop?: boolean;
}

export interface BottomSheetModalRef {
  snapToIndex: (index: number) => void;
  present: () => void;
  dismiss: () => void;
  close: () => void;
}

const CustomBottomSheetModal = forwardRef<
  BottomSheetModalRef,
  CustomBottomSheetModalProps
>(
  (
    {
      backdrop = true,
      asScrollable,
      viewProps,
      children,
      onClose,
      ...restProps
    },
    ref
  ) => {
    const modalRef = useRef<BottomSheetModalMethods>(null);

    useImperativeHandle(
      ref,
      () => ({
        snapToIndex: (snapIndex: number) => {
          if (snapIndex === -1) {
            modalRef.current?.dismiss();
          } else {
            modalRef.current?.present();
            setTimeout(() => {
              modalRef.current?.snapToIndex(snapIndex);
            }, 50);
          }
        },
        close: () => modalRef.current?.dismiss(),
        present: () => modalRef.current?.present(),
        dismiss: () => modalRef.current?.dismiss(),
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

CustomBottomSheetModal.displayName = "BottomSheetModal";

export { CustomBottomSheetModal as BottomSheetModal };

import React, { useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
}) => {
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const showSheet = useCallback(() => {
    translateY.value = withSpring(-32, {
      damping: 15,
    });
  }, []);

  const hideSheet = useCallback(() => {
    translateY.value = withTiming(SCREEN_HEIGHT, {}, () => {
      runOnJS(onClose)();
    });
  }, [onClose]);


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (isVisible) {
      showSheet();
    } else {
      hideSheet();
    }
  }, [isVisible, showSheet, hideSheet]);

  return (
    <GestureHandlerRootView style={styles.container}>
      {isVisible && (
        <TouchableWithoutFeedback onPress={hideSheet}>
          <Animated.View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[styles.sheet, animatedStyle]}
      >
        <View style={styles.dragHandle} />
        {children}
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#1c1e23",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dragHandle: {
    width: 75,
    height: 5,
    backgroundColor: "#54565a",
    alignSelf: "center",
    marginVertical: 8,
    borderRadius: 2.5,
  },
});

export default BottomSheet;

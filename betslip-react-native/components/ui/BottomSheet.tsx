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
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SNAP_TOP = -32;
const SNAP_BOTTOM = SCREEN_HEIGHT - 32;
const DRAG_THRESHOLD = SCREEN_HEIGHT * 0.25;

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isVisible, onClose, children }) => {
  const translateY = useSharedValue(SNAP_BOTTOM);

  const showSheet = useCallback(() => {
    translateY.value = withSpring(SNAP_TOP, { damping: 15 });
  }, []);

  const hideSheet = useCallback(() => {
  
    translateY.value = withTiming(SCREEN_HEIGHT, {}, () => {
      runOnJS(onClose)();
    });
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      showSheet();
    } else {
      hideSheet();
    }
  }, [isVisible, showSheet, hideSheet]);

  const panGesture = Gesture.Pan()
  .onUpdate((event) => {
    console.log("Dragging:", event.translationY);
    translateY.value = Math.max(event.translationY, -32);
  })
  .onEnd((event) => {
    console.log("Closing due to drag...");
    runOnJS(onClose)();
    if (event.translationY > DRAG_THRESHOLD) {
    }
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      {isVisible && (
        <TouchableWithoutFeedback onPress={hideSheet}>
          <Animated.View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.sheet, animatedStyle]}>
          <View style={styles.dragHandle} />
          {children}
        </Animated.View>
      </GestureDetector>
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

import { Colors } from "@/constants/Colors";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";

interface PrimaryButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    style?: object;
    textStyle?: object;
    disabled?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style, textStyle, disabled = false }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabledButton, style]}
            onPress={disabled ? undefined : onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <Text style={[styles.text, disabled && styles.disabledText, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.dark.buttonPrimary,
        paddingVertical: 12,
        width: "100%",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    disabledButton: {
        opacity: 0.60
    },
    text: {
        color: Colors.dark.buttonText,
        fontSize: 18,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 1.5,
    },
    disabledText: {
    },
});

export default PrimaryButton;
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { useBetSlip } from "./OpenBetSlipContext";

interface BetConfirmationProps {
  onNo: () => void;
}

export default function BetConfirmation(props: BetConfirmationProps) {
  const { setupCashBet } = useBetSlip()

  return (
    <View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>
          Would You like to copy this bet for
        </Text>
        <View style={styles.footerIconContainer}>
          <View style={styles.dollarIcon}>
            <IconSymbol size={12} name="hare.fill" color="white" />
          </View>

          <Text style={styles.cashText}>Cash?</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#282a2e",
            paddingHorizontal: "18%",
            paddingVertical: 8,
            marginLeft: 12,
            marginRight: 12,
            marginTop: 12,
            borderRadius: 4,
            marginBottom: 12,
          }}
          onPress={props.onNo}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            NO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#16c54b",
            paddingHorizontal: "18%",
            paddingVertical: 8,
            marginLeft: 12,
            marginRight: 12,
            marginTop: 12,
            borderRadius: 4,
            marginBottom: 12,
          }}
          onPress={setupCashBet}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            YES
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
  },
  footerText: { color: "white", fontSize: 14, fontWeight: "700" },
  footerIconContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  dollarIcon: {
    backgroundColor: "#16c54b",
    borderRadius: 20,
    padding: 4,
    marginLeft: 12,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cashText: { color: "#16c54b", fontWeight: "600", fontSize: 16 },
});

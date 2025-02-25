import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useBetSlip } from "./OpenBetSlipContext";
import { Colors } from "@/constants/Colors";

export default function AmountSummary() {
  const { totalBet, potentialWin, isCurrencyCoin } = useBetSlip();
  return (
    <View>
      <View style={styles.amountAcontainer}>
        <Text style={styles.totalBetText}>Total Bet</Text>
        <Text style={styles.totalBetAmount}>{totalBet}</Text>
      </View>

      <View style={styles.amountAcontainer}>
        <Text style={styles.potentiaWinText}>Potential Win</Text>
        <Text
          style={[
            styles.potentialWinAmount,
            { color: isCurrencyCoin ? Colors.coin : Colors.cash },
          ]}
        >
          {potentialWin}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  potentiaWinText: { color: "#a4a5a7", fontSize: 14 },
  potentialWinAmount: { color: "white", fontSize: 14 },
  totalBetText: { color: "#a4a5a7", fontSize: 14 },
  totalBetAmount: { color: "white", fontSize: 14 },
  amountAcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});

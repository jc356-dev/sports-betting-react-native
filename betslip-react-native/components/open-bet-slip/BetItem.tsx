import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Bet } from "./type";

interface BetItemProps {
  bet: Bet;
  onRemove: (id: number) => void;
}

export const BetItem: React.FC<BetItemProps> = ({ bet, onRemove }) => {
  return (
    <View style={styles.betItemContainer}>
      <TouchableOpacity style={styles.trashIconContainer} onPress={() => onRemove(bet.id)}>
        <IconSymbol size={20} name="trash" color="white" />
      </TouchableOpacity>

      <View style={styles.betItemBackground}>
        <View style={styles.betMatches}>
          <Text style={styles.matchText}>{bet.match}</Text>
          <Text style={styles.matchTime}>{bet.endTime}</Text>
        </View>

        <View style={styles.matchContainer}>
          <View style={styles.matchImage}>
            <IconSymbol size={12} name="hare.fill" color="white" />
          </View>
          <Text style={styles.matchDetails}>{bet.betDetail}</Text>
        </View>

        <View style={styles.matchOddContainer}>
          <Text style={styles.betOddText}>{bet.odds}</Text>
          <Text style={styles.totalBet}>{bet.amount}</Text>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  betItemContainer: {
    flexDirection: "row",
    marginBottom: 8
  },
  trashIconContainer: {
    backgroundColor: "#494b4f",
    paddingHorizontal: 12,
    paddingVertical: 30,
    width: 30,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  betItemBackground: {
    backgroundColor: "#333539",
    flex: 1,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  betMatches: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  matchText: {
    marginLeft: 20,
    color: "white",
    fontSize: 16,
  },
  matchTime: {
    marginRight: 20,
    color: "#959698",
    fontSize: 10,
  },
  matchOddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  matchContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    marginLeft: 8,
    alignItems: "center",
  },
  betOddText: {
    marginLeft: 18,
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  matchImage: {
    backgroundColor: "#f02f95",
    borderRadius: 20,
    padding: 4,
    marginLeft: 12,
    width: "6%",
  },
  matchDetails: {
    color: "white",
    fontWeight: "700",
    alignItems: "center",
    fontSize: 12,
  },
  totalBet: {
    color: "white",
    marginRight: 16,
    backgroundColor: "#47494d",
    paddingRight: 12,
    minWidth: 98,
    paddingVertical: 4,
    borderRadius: 5,
    textAlign: 'right',
    fontWeight: "600"
  },
});

export default BetItem;
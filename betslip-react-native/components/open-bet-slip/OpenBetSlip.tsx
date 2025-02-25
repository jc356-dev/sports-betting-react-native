import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import CustomTabs from "./CustomTabs";
import CurrencyToggle from "./CurrencyToggle";
import BetItem from "./BetItem";
import AmountOptions from "./AmountOptions";
import PrimaryButton from "../ui/PrimaryButton";
import BetConfirmation from "./BetConfirmation";
import AmountSummary from "./AmountSummary";
import { Tabs, useBetSlip } from "./OpenBetSlipContext";

const TabNames = Object.values(Tabs);

export default function OpenBetSlip() {
  const { activeTab, setActiveTab, selectedAmount, xpEarned, bets, deleteBet } =
    useBetSlip();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {}, []);

  return (
    <View style={styles.modalConatiner}>
      <Text style={styles.headingText}>BETSLIP ({bets.length})</Text>

      <CustomTabs
        tabs={TabNames}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as Tabs)}
      />

      <CurrencyToggle />

      <View style={{ padding: 12 }}>
        {bets.map((bet) => (
          <BetItem
            bet={bet}
            onRemove={(id) => {
              deleteBet(id);
            }}
          />
        ))}

        <AmountOptions />

        <View style={{ marginVertical: 12 }}>
          <AmountSummary />
        </View>

        {selectedAmount && (
          <View style={styles.xpEarnContainer}>
            <IconSymbol size={16} name="star" color="#06f2e6" />
            <Text style={styles.xpEarnText}>
              You Will Earn {xpEarned} XP with the bet
            </Text>
          </View>
        )}

        {/* <TouchableOpacity
        disabled={!selectedAmount || isConfirming || isConfirmed}
        style={{
          backgroundColor: selectedAmount ? "#d6c726" : "#5f5919",
          padding: 12,
          marginHorizontal: 12,
          marginTop: 12,
          borderRadius: 4,
          marginBottom: 12,
          opacity: selectedAmount ? 1 : 0.5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
        onPress={handleConfirmBet}
      >
        {isConfirming ? (
          <ActivityIndicator size="small" color="black" />
        ) : isConfirmed ? (
          <IconSymbol size={20} name="circle" color="black" />
        ) : null}
        
        <TouchableOpacity onPress={handleConfirmBet}>
          <Text>
            {isConfirming
              ? "Confirming..."
              : isConfirmed
              ? "✔ CONFIRMED"
              : "CONFIRM BET"}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity> */}

        <View style={{}}>
          <PrimaryButton title="Confirm Bet" onPress={() => {}} disabled />
        </View>

        <Text style={styles.maxAmountText}>Max Bet Amount: 1,000.000</Text>

        {showConfirmation && <BetConfirmation />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalConatiner: {
    overflow: "hidden",
  },
  headingText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  xpEarnContainer: {
    backgroundColor: "#1f3533",
    padding: 12,
    marginTop: 12,
    borderRadius: 4,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  xpEarnText: {
    color: "#06f2e6",
    textAlign: "center",
    fontSize: 14,
  },
  maxAmountText: {
    color: "#a4a5a7",
    textAlign: "center",
    fontSize: 11,
    marginTop: 12,
  },
});

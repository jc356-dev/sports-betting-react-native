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
import { BetStatus, Tabs, useBetSlip } from "./OpenBetSlipContext";

const TabNames = Object.values(Tabs);

const ButtonLabelByStatus = {
  [BetStatus.NONE]: "Confirm Bet",
  [BetStatus.CONFIRMING]: "Confirming...",
  [BetStatus.CONFIRMED]: "Confirmed",
  [BetStatus.COMPLETED]: "Completed",
  [BetStatus.FAILED]: "Failed",
};

interface OpenBetSlipProps {
  close: () => void;
}

export default function OpenBetSlip({ close }: OpenBetSlipProps) {
  const {
    activeTab,
    setActiveTab,
    selectedAmount,
    xpEarned,
    bets,
    deleteBet,
    status,
    handleConfirmBet,
    isCurrencyCoin,
  } = useBetSlip();

  useEffect(() => {
    if (bets.length === 0) {
      close();
    }
  }, [bets.length, status]);

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
            key={bet.id}
            bet={bet}
            onRemove={(id) => {
              deleteBet(id);
            }}
            currencySymbol={isCurrencyCoin ? "" : "$"}
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

        <View style={{}}>
          <PrimaryButton
            title={ButtonLabelByStatus[status]}
            onPress={() => {
              handleConfirmBet();
            }}
            disabled={
              !selectedAmount ||
              ![BetStatus.FAILED, BetStatus.NONE].includes(status)
            }
            loading={BetStatus.CONFIRMING === status}
          />
        </View>

        <Text style={styles.maxAmountText}>Max Bet Amount: 1,000.000</Text>

        {BetStatus.CONFIRMED === status && (
          <BetConfirmation
            onNo={() => {
              close();
            }}
          />
        )}
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

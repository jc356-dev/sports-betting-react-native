import { Button, Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import PrimaryButton from "@/components/ui/PrimaryButton";
import BottomSheet from "@/components/ui/BottomSheet";
import { useState } from "react";
import OpenBetSlip from "@/components/open-bet-slip/OpenBetSlip";
import { BetSlipProvider } from "@/components/open-bet-slip/OpenBetSlipContext";
import { Bet } from "@/components/open-bet-slip/type";

const defaultBetItems: Bet[] = [
  {
    id: 1,
    match: "Warriors vs Bucks",
    endTime: "Ends at: 8:00 PM East",
    betDetail: "Warriors - 3.5",
    odds: "-120",
  },
  {
    id: 2,
    match: "Hornet vs Kings",
    endTime: "Ends at: 8:00 PM East",
    betDetail: "Kings Moneyline",
    odds: "+140",
  },
];

export default function HomeScreen() {
  const [isSheetVisible, setSheetVisible] = useState(false);

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        <PrimaryButton
          title="Open Bet Slip"
          onPress={() => {
            setSheetVisible(true);
          }}
        />
      </ThemedView>
      {isSheetVisible ? (
        <BetSlipProvider defalutBets={defaultBetItems}>
          <BottomSheet
            isVisible={isSheetVisible}
            onClose={() => setSheetVisible(false)}
          >
            <OpenBetSlip />
          </BottomSheet>
        </BetSlipProvider>
      ) : (
        <></>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#101216",
  },
});

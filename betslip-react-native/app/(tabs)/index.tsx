import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import PrimaryButton from "@/components/ui/PrimaryButton";
import BottomSheet from "@/components/ui/BottomSheet";
import { useState } from "react";
import OpenBetSlip from "@/components/open-bet-slip/OpenBetSlip";
import { BetSlipProvider } from "@/components/open-bet-slip/OpenBetSlipContext";
import { gql, useQuery } from "@apollo/client";

const GET_BETS = gql`
  query {
    bets {
      id
      match
      betDetail
      odds
      amount
    }
  }
`;

export default function HomeScreen() {
  const [isSheetVisible, setSheetVisible] = useState(false);
  const { data } = useQuery(GET_BETS);

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
      {isSheetVisible && Array.isArray(data.bets) ? (
        <BetSlipProvider defalutBets={data.bets}>
          <BottomSheet
            isVisible={isSheetVisible}
            onClose={() => setSheetVisible(false)}
          >
            <OpenBetSlip close={() => setSheetVisible(false)} />
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

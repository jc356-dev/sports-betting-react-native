import { StyleSheet, Text, View, Switch } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useBetSlip } from "./OpenBetSlipContext";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

export default function CurrencyToggle() {
  const { isCurrencyCoin, toggleCurrency } = useBetSlip();

  return (
    <LinearGradient
      colors={[
        isCurrencyCoin ? "rgba(240, 47, 149, 0.5)" : "rgba(22, 197, 75, 0.5)",
        "transparent",
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={[styles.container]}>
        <View style={styles.contentRow}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isCurrencyCoin ? Colors.coin : Colors.cash },
            ]}
          >
            <IconSymbol
              size={12}
              name={isCurrencyCoin ? "hare" : "dollarsign"}
              color="white"
            />
          </View>
          <Text style={styles.totalAmountText}>12,000,000</Text>
        </View>

        <Switch
          value={isCurrencyCoin ? false : true}
          onValueChange={() => {
            toggleCurrency();
          }}
          trackColor={{ false: Colors.coin, true: Colors.cash }}
          thumbColor={"#fff"}
          style={styles.switchIcon}
          ios_backgroundColor={isCurrencyCoin ? Colors.coin : Colors.cash}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    borderRadius: 20,
    padding: 4,
    marginLeft: 12,
  },
  totalAmountText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  },
  switchIcon: {
    alignSelf: "center",
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  switchContainer: {
    padding: 3,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 50, // Set width to match switch
  },
  switch: {
    transform: [{ scaleX: 1 }, { scaleY: 1 }], // Standard size
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useBetSlip } from "./OpenBetSlipContext";
import { Colors } from "@/constants/Colors";

const AMOUNTS = ["25k", "50k", "100k", "Custom"];

const AmountOptions: React.FC = () => {
  const { isCurrencyCoin, selectedAmount, handleSelectAmount } = useBetSlip();
  const [customAmount, setCustomAmount] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const onAmountSelect = (amount: string) => {
    if (amount === "Custom") {
      setIsCustomSelected(true);
    } else {
      handleSelectAmount(amount);
      setCustomAmount("");
      setIsCustomSelected(false);
    }
  };

  const handleCustomAmountChange = (text: string) => {
    setCustomAmount(text.replace(/[^0-9]/g, ""));
  };

  const handleCustomAmountSubmit = () => {
    if (customAmount) {
      handleSelectAmount(customAmount);
      setIsCustomSelected(false);
    }
  };

  console.log('selectedAmount', selectedAmount)
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.selectedAmountContainer}>
        {AMOUNTS.map((amount) => {
          const numericValue =
            amount === "Custom"
              ? null
              : parseInt(amount.replace("k", "000"), 10);
          const isSelected = isCustomSelected
            ? amount === "Custom"
            : selectedAmount === numericValue;

          return (
            <TouchableOpacity
              key={amount}
              onPress={() => onAmountSelect(amount)}
              style={[
                styles.amountButton,
                {
                  backgroundColor: isSelected
                    ? isCurrencyCoin
                      ? Colors.coin
                      : Colors.cash
                    : "#47494d",
                },
              ]}
            >
              <Text style={styles.amountText}>{amount}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {isCustomSelected && (
        <TextInput
          style={styles.customInput}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor="#ccc"
          value={customAmount}
          onChangeText={handleCustomAmountChange}
          onSubmitEditing={handleCustomAmountSubmit}
          returnKeyType="done"
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedAmountContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    gap: 6,
  },
  amountButton: {
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  amountText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  customInput: {
    marginTop: 10,
    backgroundColor: "#47494d",
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    textAlign: "center",
  },
});

export default AmountOptions;

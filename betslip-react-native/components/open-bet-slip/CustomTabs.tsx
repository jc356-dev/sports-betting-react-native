import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TabsProps {
  tabs: string[];
  onTabChange: (tab: string) => void;
  activeTab?: string;
}

const CustomTabs: React.FC<TabsProps> = ({ tabs, onTabChange, activeTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab} onPress={() => onTabChange(tab)} style={styles.tab}>
          <Text
            style={[
              styles.tabText,
              activeTab === tab ? styles.activeTabText : styles.inactiveTabText,
            ]}
          >
            {tab}
          </Text>
          {activeTab === tab && <View style={styles.underline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tab: {
    flex: 1,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center"
  },
  activeTabText: {
    color: "white",
  },
  inactiveTabText: {
    color: "gray",
  },
  underline: {
    marginTop: 12,
    height: 1,
    width: "100%",
    backgroundColor: "white",
  },
});

export default CustomTabs;
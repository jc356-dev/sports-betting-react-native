import { useGlobalSearchParams } from "expo-router";
import { View, Text, Button } from "react-native";

export default function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  const params = useGlobalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "red", marginBottom: 10 }}>
        Oops! Something went wrong.
      </Text>
      <Text style={{ color: "gray", textAlign: "center" }}>{error.message}</Text>

      {params?.debug === "true" && (
        <Text style={{ marginTop: 10, fontSize: 12, color: "gray" }}>
          {JSON.stringify(error, null, 2)}
        </Text>
      )}

      <Button title="Try Again" onPress={retry} />
    </View>
  );
}

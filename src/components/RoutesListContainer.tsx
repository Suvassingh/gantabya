import { StyleSheet, ScrollView } from "react-native";

function RoutesListContainer({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView
      style={styles.container}
      // contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
export default RoutesListContainer;

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  // content: { paddingBottom: 20 },
});

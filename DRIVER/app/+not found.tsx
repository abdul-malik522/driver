import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import colors from './constraints/colors';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
        <Link href="/(tabs)/home" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: colors.dark.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: colors.dark.text,
    marginBottom: 16,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: colors.dark.primary,
    textDecorationLine: 'underline',
  },
});

import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TrendsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trends Screen</Text>
      <Text style={styles.subtitle}>This is a test screen for the workout page.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Test Section</Text>
        <Text style={styles.cardText}>Workout content will go here.</Text>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Test Button</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
  },
  card: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
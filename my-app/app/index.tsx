import { Stack } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DrawerLayoutAndroid,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeLayout() {
  const drawerRef = React.useRef(null);

  const navigationView = () => (
    <View style={styles.drawer} accessibilityRole="menu">
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle} accessibilityRole="header">
          Menu
        </Text>
      </View>
      <TouchableOpacity
        style={styles.drawerItem}
        accessible={true}
        accessibilityRole="menuitem"
        accessibilityLabel="Home screen">
        <Ionicons name="home-outline" size={24} color="#333" />
        <Text style={styles.drawerItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        accessible={true}
        accessibilityRole="menuitem"
        accessibilityLabel="Settings">
        <Ionicons name="settings-outline" size={24} color="#333" />
        <Text style={styles.drawerItemText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );

  const HomeContent = () => (
    <ScrollView style={styles.content}>
      <View style={styles.headerContainer}>
        <Text style={styles.title} accessibilityRole="header">
          An accessibility testing manual for developers
        </Text>
        <Text style={styles.description}>
          Discover how to make React Native components accessible to all users.
          Through practical examples and guided testing, learn essential techniques
          for creating inclusive applications.
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Component Examples"
          accessibilityHint="View accessible component implementations with code samples">
          <Ionicons name="code-outline" size={28} color="#333" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Component Examples</Text>
            <Text style={styles.cardDescription}>
              Explore accessible component implementations with code samples
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Best Practices"
          accessibilityHint="Learn about implementing WCAG guidelines">
          <Ionicons name="book-outline" size={28} color="#333" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Best Practices</Text>
            <Text style={styles.cardDescription}>
              Learn how to implement WCAG guidelines in React Native
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Testing Tools"
          accessibilityHint="Discover tools for accessibility testing">
          <Ionicons name="build-outline" size={28} color="#333" />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Testing Tools</Text>
            <Text style={styles.cardDescription}>
              Tools and methods to verify your app's accessibility
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  if (Platform.OS === 'ios') {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerLeft: () => (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Open menu"
                style={styles.menuButton}>
                <Ionicons name="menu" size={24} color="#333" />
              </TouchableOpacity>
            ),
            headerTitle: "Accessibility tester",
          }}
        />
        <HomeContent />
      </SafeAreaView>
    );
  }

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}>
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => drawerRef.current?.openDrawer()}
                accessibilityRole="button"
                accessibilityLabel="Open menu"
                style={styles.menuButton}>
                <Ionicons name="menu" size={24} color="#333" />
              </TouchableOpacity>
            ),
            headerTitle: "Accessibility tester",
          }}
        />
        <HomeContent />
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  drawerItemText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    padding: 24,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  smallTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    // Add subtle shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  menuButton: {
    marginLeft: 16,
  },
});
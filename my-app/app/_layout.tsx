import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitle: '', // This removes the duplicate title
        drawerStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerTitle: "An accessibility testing manual for developers",
        }}
      />
      <Drawer.Screen
        name="components"
        options={{
          drawerLabel: "Component Examples",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="code-outline" size={size} color={color} />
          ),
          headerTitle: "Component Examples",
        }}
      />
      <Drawer.Screen
        name="practices"
        options={{
          drawerLabel: "Best Practices",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
          headerTitle: "Best Practices",
        }}
      />
      <Drawer.Screen
        name="tools"
        options={{
          drawerLabel: "Testing Tools",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="build-outline" size={size} color={color} />
          ),
          headerTitle: "Testing Tools",
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          headerTitle: "Settings",
        }}
      />
    </Drawer>
  );
}
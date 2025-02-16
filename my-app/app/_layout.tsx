import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  AccessibilityInfo,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function CustomDrawerContent({ state, descriptors, navigation }) {
  const { colors, textSizes, isDyslexiaFont } = useTheme();
  const router = useRouter();
  const mainRoutes = [
    'index',
    'components',
    'practices',
    'tools',
    'frameworks-comparison',
    'accessibility-instruction',
    'settings',
  ];

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Navigation menu opened');
    return () => {
      AccessibilityInfo.announceForAccessibility('Navigation menu closed');
    };
  }, []);

  return (
    <View
      style={drawerStyles.container}
      accessibilityRole="menu"
      accessibilityLabel="Main navigation menu"
    >
      {/* Header */}
      <View style={drawerStyles.header} importantForAccessibility="no">
        <Ionicons
          name="rocket-outline"
          size={48}
          color="#FFFFFF"
          style={drawerStyles.appIcon}
        />
        <Text style={drawerStyles.appName}>AccessibleHub</Text>
        <Text style={drawerStyles.version}>Version 1.0.0</Text>
      </View>

      {/* Drawer Items */}
      <View style={drawerStyles.drawerContent}>
        {state.routes
          .filter((route) => mainRoutes.includes(route.name))
          .map((route, index) => {
            const isActive = state.index === index;
            const { drawerLabel, drawerIcon } = descriptors[route.key].options;
            const label = drawerLabel || route.name;

            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  drawerStyles.drawerItem,
                  isActive && drawerStyles.drawerItemActive,
                ]}
                onPress={() => {
                  if (route.name === 'index') {
                    router.replace('/');
                  } else {
                    router.push(route.name);
                  }
                  AccessibilityInfo.announceForAccessibility(`Navigating to ${label}`);
                }}
                accessibilityRole="menuitem"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={label}
                accessibilityHint={`Double tap to navigate to ${label} screen`}
              >
                {drawerIcon && (
                  <View
                    style={drawerStyles.drawerIcon}
                    importantForAccessibility="no"
                    accessibilityElementsHidden
                  >
                    {drawerIcon({
                      size: 24,
                      color: isActive ? '#0057D9' : colors.textSecondary,
                    })}
                  </View>
                )}
                <Text
                  style={[
                    drawerStyles.drawerLabel,
                    isActive && drawerStyles.drawerLabelActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}

const drawerStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#0057D9', // Changed from #6200EE to a blue
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  appIcon: {
    marginBottom: 8,
  },
  appName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 12,
    color: '#fff',
  },
  drawerContent: {
    flex: 1,
    padding: 16,
  },
  drawerItem: {
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    minHeight: 56,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemActive: {
    backgroundColor: '#D0E7FF', // Lighter blue for active item
    borderColor: '#0057D9',     // Match the main blue
    borderWidth: 2,
  },
  drawerLabel: {
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
    flex: 1,
  },
  drawerLabelActive: {
    color: '#0057D9',
    fontWeight: 'bold',
  },
  drawerIcon: {
    marginRight: 12,
  },
});

function DrawerNavigator() {
  const { colors } = useTheme();
  const router = useRouter();
  const mainRoutes = [
    'index',
    'components',
    'practices',
    'tools',
    'frameworks-comparison',
    'accessibility-instruction',
    'settings',
  ];

  const screenOptions = ({ navigation, route }) => {
    const routeName = route.name.toLowerCase();
    const isMainRoute = mainRoutes.includes(route.name);

    // If sub-route of 'components'
    if (route.name !== 'components' && routeName.includes('components')) {
      return {
        headerShown: true,
        headerStyle: { backgroundColor: colors.surface, elevation: 0, shadowOpacity: 0 },
        headerTintColor: colors.text,
        headerTitle: () => null,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.push('/components')}
            accessibilityRole="button"
            accessibilityLabel="Return to components list"
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        ),
      };
    }
    // If sub-route of 'practices'
    if (route.name !== 'practices' && routeName.includes('practices')) {
      return {
        headerShown: true,
        headerStyle: { backgroundColor: colors.surface, elevation: 0, shadowOpacity: 0 },
        headerTintColor: colors.text,
        headerTitle: () => null,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.push('/practices')}
            accessibilityRole="button"
            accessibilityLabel="Return to practices list"
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        ),
      };
    }
    // If main route
    if (isMainRoute) {
      return {
        headerShown: true,
        headerStyle: { backgroundColor: colors.surface, elevation: 0, shadowOpacity: 0 },
        headerTintColor: colors.text,
        headerTitle: () => null,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            accessibilityRole="button"
            accessibilityLabel="Toggle menu"
            style={styles.headerButton}
          >
            <Ionicons name="menu-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        ),
      };
    }
    // Otherwise fallback to goBack()
    return {
      headerShown: true,
      headerStyle: { backgroundColor: colors.surface, elevation: 0, shadowOpacity: 0 },
      headerTintColor: colors.text,
      headerTitle: () => null,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      ),
    };
  };

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={screenOptions}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="components"
        options={{
          drawerLabel: 'Accessibility Components',
          drawerIcon: ({ size, color }) => <Ionicons name="cube-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="practices"
        options={{
          drawerLabel: 'Best Practices',
          drawerIcon: ({ size, color }) => <Ionicons name="book-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="tools"
        options={{
          drawerLabel: 'Mobile Accessibility Tools',
          drawerIcon: ({ size, color }) => <Ionicons name="construct-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="frameworks-comparison"
        options={{
          drawerLabel: 'Framework Comparison',
          drawerIcon: ({ size, color }) => <Ionicons name="git-compare" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="accessibility-instruction"
        options={{
          drawerLabel: 'Instruction & Community',
          drawerIcon: ({ size, color }) => <Ionicons name="people-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ size, color }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}

function AppWrapper({ children }) {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      AccessibilityInfo.setAccessibilityLanguage?.('en');
    }
    setTimeout(() => {
      AccessibilityInfo.announceForAccessibility('AccessibleHub application ready');
    }, 1000);
  }, []);
  return (
    <View style={styles.appContainer} accessibilityRole="application" accessibilityLabel="AccessibleHub application">
      {children}
    </View>
  );
}

export default function AppLayout() {
  return (
    <ThemeProvider>
      <AppWrapper>
        <DrawerNavigator />
      </AppWrapper>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: { flex: 1 },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

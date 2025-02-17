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

// We still keep a white header text color, but remove brandDarkBlue:
const headerTextColor = '#FFFFFF';

// Only these routes appear in the drawer
const mainRoutes = [
  'index',
  'components',
  'practices',
  'tools',
  'frameworks-comparison',
  'accessibility-instruction',
];

/* --------------------------------------------
   1. Custom Drawer Content
-------------------------------------------- */
function CustomDrawerContent({ state, descriptors, navigation }) {
  const { colors, isDarkMode } = useTheme();
  const router = useRouter();

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Navigation menu opened');
    return () => {
      AccessibilityInfo.announceForAccessibility('Navigation menu closed');
    };
  }, []);

  return (
    <View
      style={[
        drawerStyles.container,
        { backgroundColor: colors.background },
      ]}
      accessibilityRole="menu"
      accessibilityLabel="Main navigation menu"
    >
      {/* Header now uses colors.primary (not brandDarkBlue) */}
      <View style={[drawerStyles.header, { backgroundColor: colors.primary }]}>
        <Ionicons
          name="rocket-outline"
          size={48}
          color="#FFFFFF"
          style={drawerStyles.appIcon}
        />
        <Text style={[drawerStyles.appName, { color: '#FFFFFF' }]}>
          AccessibleHub
        </Text>
        <Text style={[drawerStyles.version, { color: '#FFFFFF' }]}>
          Version 1.0.0
        </Text>
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
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                  isActive && {
                    borderColor: colors.primary,
                    borderWidth: 2,
                    backgroundColor: isDarkMode ? '#ffffff22' : '#0000000A',
                  },
                ]}
                onPress={() => {
                  if (route.name === 'index') {
                    router.replace('/');
                  } else {
                    router.push(route.name);
                  }
                  AccessibilityInfo.announceForAccessibility(
                    `Navigating to ${label}`
                  );
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
                      color: isActive ? colors.primary : colors.textSecondary,
                    })}
                  </View>
                )}
                <Text
                  style={[
                    drawerStyles.drawerLabel,
                    { color: colors.text },
                    isActive && { color: colors.primary, fontWeight: 'bold' },
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

/* --------------------------------------------
   2. Drawer Styles
-------------------------------------------- */
const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: '#0057D9',  // removed
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  version: {
    fontSize: 12,
  },
  drawerContent: {
    flex: 1,
    padding: 16,
  },
  drawerItem: {
    marginBottom: 12,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    minHeight: 56,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerIcon: {
    marginRight: 12,
  },
  drawerLabel: {
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
  },
});

/* --------------------------------------------
   3. Drawer Navigator
-------------------------------------------- */
function DrawerNavigator() {
  const router = useRouter();
  const { colors } = useTheme();

  const screenOptions = ({ navigation, route }) => {
    const routeName = route.name.toLowerCase();
    const isMainRoute = mainRoutes.includes(route.name);

    // For settings screen specifically
    if (route.name === 'settings') {
      return {
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: headerTextColor,
        headerTitle: () => null,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={24} color={headerTextColor} />
          </TouchableOpacity>
        ),
      };
    }

    // Sub-route of 'components'
    if (route.name !== 'components' && routeName.includes('components')) {
      return {
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: headerTextColor,
        headerTitle: () => null,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.push('/components')}
            accessibilityRole="button"
            accessibilityLabel="Return to components list"
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={24} color={headerTextColor} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            accessibilityRole="button"
            accessibilityLabel="Open Settings"
            style={styles.headerButton}
          >
            <Ionicons name="ellipsis-vertical" size={24} color={headerTextColor} />
          </TouchableOpacity>
        ),
      };
    }

    // Sub-route of 'practices'
    if (route.name !== 'practices' && routeName.includes('practices')) {
      return {
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: headerTextColor,
        headerTitle: () => null,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.push('/practices')}
            accessibilityRole="button"
            accessibilityLabel="Return to practices list"
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={24} color={headerTextColor} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            accessibilityRole="button"
            accessibilityLabel="Open Settings"
            style={styles.headerButton}
          >
            <Ionicons name="ellipsis-vertical" size={24} color={headerTextColor} />
          </TouchableOpacity>
        ),
      };
    }

    // Main route
    if (isMainRoute) {
      return {
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: headerTextColor,
        headerTitle: () => null,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            accessibilityRole="button"
            accessibilityLabel="Toggle menu"
            style={styles.headerButton}
          >
            <Ionicons name="menu-outline" size={24} color={headerTextColor} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.push('/settings')}
            accessibilityRole="button"
            accessibilityLabel="Open Settings"
            style={styles.headerButton}
          >
            <Ionicons name="ellipsis-vertical" size={24} color={headerTextColor} />
          </TouchableOpacity>
        ),
      };
    }

    // Otherwise fallback => back arrow and settings
    return {
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: headerTextColor,
      headerTitle: () => null,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color={headerTextColor} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          accessibilityRole="button"
          accessibilityLabel="Open Settings"
          style={styles.headerButton}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={headerTextColor} />
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
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="components"
        options={{
          drawerLabel: 'Accessibility Components',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="practices"
        options={{
          drawerLabel: 'Best Practices',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="tools"
        options={{
          drawerLabel: 'Mobile Accessibility Tools',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="construct-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="frameworks-comparison"
        options={{
          drawerLabel: 'Framework Comparison',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="git-compare" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="accessibility-instruction"
        options={{
          drawerLabel: 'Instruction & Community',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      {/* 'settings' is not in the drawer, so we don't add a Drawer.Screen for it */}
    </Drawer>
  );
}

/* --------------------------------------------
   4. App Wrapper & Export
-------------------------------------------- */
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
    <View
      style={styles.appContainer}
      accessibilityRole="application"
      accessibilityLabel="AccessibleHub application"
    >
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

/* --------------------------------------------
   5. Layout Styles
-------------------------------------------- */
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

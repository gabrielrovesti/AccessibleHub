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
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

/* ---------------------------------------------
   1. Custom Drawer Content
--------------------------------------------- */
function CustomDrawerContent(props) {
  // Now include isDyslexiaFont in the theme consumption
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

  // Overhauled styles with dyslexian font applied to text styles
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
      paddingVertical: 40,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
      // Hidden from screen readers
      importantForAccessibility: 'no',
    },
    appIcon: {
      marginBottom: 8,
    },
    appName: {
      fontSize: textSizes.large,
      color: colors.surface,
      fontWeight: 'bold',
      marginBottom: 4,
      fontFamily: isDyslexiaFont ? 'OpenDyslexic-Regular' : 'System',
    },
    version: {
      fontSize: textSizes.small,
      color: colors.surface,
      fontFamily: isDyslexiaFont ? 'OpenDyslexic-Regular' : 'System',
    },
    drawerContent: {
      flex: 1,
      padding: 16,
    },
    drawerItem: {
      backgroundColor: colors.surface,
      marginBottom: 12,
      borderRadius: 8,
      paddingVertical: 14,
      paddingHorizontal: 18,
      minHeight: 56,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
    },
    drawerItemActive: {
      backgroundColor: colors.primaryLight,
      borderColor: colors.primary,
      borderWidth: 2,
    },
    drawerLabel: {
      fontSize: textSizes.medium,
      color: colors.text,
      marginLeft: 16,
      flex: 1,
      fontFamily: isDyslexiaFont ? 'OpenDyslexic-Regular' : 'System',
    },
    drawerLabelActive: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    drawerIcon: {
      marginRight: 12,
    },
  });

  // Announce menu open/close
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Navigation menu opened');
    return () => {
      AccessibilityInfo.announceForAccessibility('Navigation menu closed');
    };
  }, []);

  return (
    <View
      style={dynamicStyles.container}
      accessibilityRole="menu"
      accessibilityLabel="Main navigation menu"
      accessibilityLanguage="en"
      accessibilityLiveRegion="polite"
    >
      {/* Header with app name + version, hidden from screen readers */}
      <View style={dynamicStyles.header}>
        <Ionicons
          name="rocket-outline"
          size={48}
          color={colors.surface}
          style={dynamicStyles.appIcon}
        />
        <Text style={dynamicStyles.appName}>AccessibleHub</Text>
        <Text style={dynamicStyles.version}>Version 1.0.0</Text>
      </View>

      {/* Drawer Items */}
      <View style={dynamicStyles.drawerContent}>
        {props.state.routes
          .filter((route) => mainRoutes.includes(route.name))
          .map((route, index) => {
            const isActive = props.state.index === index;
            const { drawerLabel, drawerIcon } = props.descriptors[route.key].options;
            const label = drawerLabel || route.name;

            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  dynamicStyles.drawerItem,
                  isActive && dynamicStyles.drawerItemActive,
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
                    style={dynamicStyles.drawerIcon}
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
                    dynamicStyles.drawerLabel,
                    isActive && dynamicStyles.drawerLabelActive,
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

/* ---------------------------------------------
   2. Drawer Navigator
--------------------------------------------- */
function DrawerNavigator() {
  const { colors } = useTheme();
  const router = useRouter();

  const screenOptions = ({ navigation, route }) => ({
    headerShown: true,
    drawerStyle: {
      backgroundColor: colors.background,
    },
    headerStyle: {
      backgroundColor: colors.surface,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: colors.text,
    // Remove headerTitle entirely
    headerTitle: () => null,
    headerLeft: () => {
      const isMainRoute = [
        'index',
        'components',
        'practices',
        'tools',
        'frameworks-comparison',
        'accessibility-instruction',
        'settings',
      ].includes(route.name);

      if (!isMainRoute) {
        return (
          <TouchableOpacity
            onPress={() => {
              // For nested routes
              const parentRoute = route.name.split('/')[0];
              if (parentRoute === 'practices-screens') {
                router.push('/practices');
              } else if (parentRoute === 'accessible-components') {
                router.push('/components');
              } else {
                navigation.goBack();
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        );
      }

      return (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          accessibilityRole="button"
          accessibilityLabel="Toggle menu"
          style={styles.headerButton}
        >
          <Ionicons name="menu-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      );
    },
  });

  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={screenOptions}
    >
      {/* Existing Routes */}
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



      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

/* ---------------------------------------------
   3. App Wrapper
--------------------------------------------- */
function AppWrapper({ children }) {
  useEffect(() => {
    const setupAccessibility = async () => {
      if (Platform.OS === 'ios') {
        await AccessibilityInfo.setAccessibilityLanguage('en');
      }
      setTimeout(() => {
        AccessibilityInfo.announceForAccessibility('AccessibleHub application ready');
      }, 1000);
    };
    setupAccessibility();
  }, []);

  return (
    <View
      style={styles.appContainer}
      accessibilityRole="application"
      accessibilityLabel="AccessibleHub application"
      accessibilityLanguage="en"
    >
      {children}
    </View>
  );
}

/* ---------------------------------------------
   4. Main App Layout
--------------------------------------------- */
export default function AppLayout() {
  return (
    <ThemeProvider>
      <AppWrapper>
        <DrawerNavigator />
      </AppWrapper>
    </ThemeProvider>
  );
}

/* ---------------------------------------------
   STYLES
--------------------------------------------- */
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

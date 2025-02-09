import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/ThemeContext';

// Custom Drawer Content Component
function CustomDrawerContent(props) {
  const { colors, textSizes } = useTheme();
  const mainRoutes = ['index', 'practices', 'tools', 'components', 'settings'];
  const router = useRouter();

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
    },
    drawerLabelActive: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    drawerIcon: {
      marginRight: 12,
    },
    footer: {
      paddingTop: 16,
      paddingBottom: 24,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingHorizontal: 16,
    },
    footerContent: {
      alignItems: 'center',
    },
    appName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.textSecondary,
    },
    version: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
  });

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Navigation menu opened');
    return () => {
      AccessibilityInfo.announceForAccessibility('Navigation menu closed');
    };
  }, []);

  return (
    <View
      style={[styles.container, dynamicStyles.container]}
      accessibilityRole="menu"
      accessibilityLabel="Main navigation menu"
      accessibilityLanguage="en"
      accessibilityLiveRegion="polite"
    >
      <View style={styles.drawerContent}>
        {props.state.routes
          .filter(route => mainRoutes.includes(route.name))
          .map((route, index) => {
            const isActive = props.state.index === index;
            const { drawerLabel, drawerIcon } = props.descriptors[route.key].options;
            const label = drawerLabel || route.name;

            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  styles.drawerItem,
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
                accessibilityLabel={`${label}${isActive ? ', currently selected' : ''}`}
                accessibilityHint={`Double tap to navigate to ${label} screen`}
                accessible={true}
              >
                <View style={styles.drawerItemContent}>
                  {drawerIcon && (
                    <View
                      style={dynamicStyles.drawerIcon}
                      importantForAccessibility="auto"
                      accessibilityElementsHidden={false}
                    >
                      {drawerIcon({
                        size: 24,
                        color: isActive ? colors.primary : colors.textSecondary,
                      })}
                    </View>
                  )}
                  <Text
                    style={[
                      styles.drawerLabel,
                      dynamicStyles.drawerLabel,
                      isActive && dynamicStyles.drawerLabelActive,
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>

      {/* Footer */}
      <View style={dynamicStyles.footer}>
        <View style={dynamicStyles.footerContent}>
          <Text style={dynamicStyles.appName}>AccessibleHub</Text>
          <Text style={dynamicStyles.version}>Version 1.0.0</Text>
        </View>
      </View>
    </View>
  );
}

// Drawer Navigator Component
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
    const isMainRoute = ['index', 'practices', 'tools', 'components', 'settings'].includes(route.name);

    if (!isMainRoute) {
      return (
        <TouchableOpacity
          onPress={() => {
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
  }
});

return (
  <Drawer
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={screenOptions}
  >
    <Drawer.Screen
      name="index"
      options={{
        drawerLabel: "Home",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="components"  // Move components right after home since it's the Quick Start destination
      options={{
        drawerLabel: "Accessibility Components",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="cube-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="practices"
      options={{
        drawerLabel: "Best Practices",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="book-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="tools"
      options={{
        drawerLabel: "Mobile Accessibility Tools",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="construct-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="settings"
      options={{
        drawerLabel: "Settings",
        drawerIcon: ({ size, color }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
      }}
    />
  </Drawer>
);
}

// App Wrapper Component
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

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
    padding: 16,
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  drawerLabel: {
    fontSize: 16,
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

// Main App Layout
export default function AppLayout() {
  return (
    <ThemeProvider>
      <AppWrapper>
        <DrawerNavigator />
      </AppWrapper>
    </ThemeProvider>
  );
}
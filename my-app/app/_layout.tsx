import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useEffect } from 'react';
import { AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from '../context/ThemeContext';
import { useTheme } from '../context/ThemeContext';

function CustomDrawerContent(props) {
  const { colors, textSizes, isDarkMode } = useTheme();
  const mainRoutes = ['index', 'practices', 'tools', 'components', 'settings'];
  const router = useRouter();

  const getConsistentLabel = (route) => {
      const { drawerLabel } = props.descriptors[route.key].options;

      // Map route names to consistent labels
      const labelMap = {
        'index': 'Home',
        'practices': 'Best Practices',
        'tools': 'Mobile Accessibility Tools',
        'settings': 'Settings',
        'components': 'Accessibility Components'
      };

      return drawerLabel || labelMap[route.name] || route.name;
    };

  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    drawerItem: {
      backgroundColor: colors.surface,
    },
    drawerLabel: {
      color: colors.textSecondary,
      fontSize: textSizes.medium,
    },
    drawerLabelActive: {
      color: colors.primary,
    },
    drawerIcon: {
      marginRight: 12,
    },
  };

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Navigation menu opened');
    return () => {
      AccessibilityInfo.announceForAccessibility('Navigation menu closed');
    };
  }, []);

  return (
    <View
      style={[styles.container, dynamicStyles.container]}
      accessibilityRole="menu"  // Changed to a valid role
      accessibilityLabel="Main navigation menu"
      accessibilityLanguage="en"
      accessibilityLiveRegion="polite"
    >
    <View
      style={styles.drawerContent}
      importantForAccessibility="yes"
    >
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
                  isActive && styles.drawerItemActive,
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
                accessibilityState={{
                  selected: isActive,
                  disabled: false
                }}
                accessibilityLabel={`${label}${isActive ? ', currently selected' : ''}`}
                accessibilityHint={`Double tap to navigate to ${label} screen`}
                accessible={true}
                minHeight={48}
              >
                <View style={styles.drawerItemContent}>
                  {drawerIcon && (
                    <View
                      style={dynamicStyles.drawerIcon}
                      importantForAccessibility="no"
                      accessibilityElementsHidden={true}
                    >
                      {drawerIcon({
                        size: 24,
                        color: isActive ? colors.primary : colors.textSecondary
                      })}
                    </View>
                  )}
                  <Text
                    style={[
                      styles.drawerLabel,
                      dynamicStyles.drawerLabel,
                      isActive && dynamicStyles.drawerLabelActive
                    ]}
                    importantForAccessibility="no"
                    accessibilityElementsHidden={true}
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>

      <View
        style={[styles.footer, { borderTopColor: colors.border }]}
        importantForAccessibility="no"
        accessibilityElementsHidden={true}
      >
        <View style={styles.footerContent}>
          <Text
            style={[styles.appName, { color: colors.textSecondary }]}
            importantForAccessibility="no"
          >
            AccessibleHub
          </Text>
          <Text
            style={[styles.version, { color: colors.textSecondary }]}
            importantForAccessibility="no"
          >
            Version 1.0.0
          </Text>
        </View>
      </View>
    </View>
  );
}

function DrawerNavigator() {
    const { colors, isDarkMode } = useTheme();
    const router = useRouter();

    const screenOptions = ({navigation}) => ({
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
      swipeEnabled: true,
      swipeEdgeWidth: 100,
      headerLeft: ({ canGoBack }) => {
        if (canGoBack) {
          return (
            <TouchableOpacity
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back to previous screen"
              accessibilityHint="Double tap to return to the previous view"
              style={styles.headerButton}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={colors.text}
                accessibilityElementsHidden={true}
              />
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            accessibilityRole="button"
            accessibilityLabel="Toggle navigation drawer"
            accessibilityHint="Double tap to open or close the navigation menu"
            style={styles.headerButton}
          >
            <Ionicons
              name="menu-outline"
              size={24}
              color={colors.text}
              accessibilityElementsHidden={true}
            />
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
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="practices"
        options={{
          drawerLabel: "Best Practices",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
          headerTitle: "Accessible Practices",
        }}
      />
      <Drawer.Screen
        name="components"
        options={{
          drawerItemStyle: { height: 0, margin: 0 },
          drawerLabel: "Accessibility Components",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
          headerTitle: "Components Accessible Code",
        }}
      />
      <Drawer.Screen
        name="tools"
        options={{
          drawerLabel: "Mobile Accessibility Tools",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="build-outline" size={size} color={color} />
          ),
          headerTitle: "Mobile Accessibility Tools",
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
      <Drawer.Screen
        name="practices-screens"
        options={{
          drawerItemStyle: { height: 0, margin: 0 },
          headerShown: true,
          headerTitle: "Mobile Accessibility Best Practices",
        }}
      />
      <Drawer.Screen
        name="accessible-components"
        options={{
          drawerItemStyle: { height: 0, margin: 0 },
          headerShown: true,
          headerTitle: "Components Accessible Code",
        }}
      />
      <Drawer.Screen
        name="frameworks-comparison"
        options={{
          drawerItemStyle: { height: 0, margin: 0 },
          headerShown: true,
          headerTitle: "",
        }}
      />
    </Drawer>
  );

}

function AppWrapper({ children }) {
  useEffect(() => {
    const setupAccessibility = async () => {
      // Set language for both platforms consistently
      if (Platform.OS === 'ios') {
        await AccessibilityInfo.setAccessibilityLanguage('en');
      }

      // Initial accessibility announcement
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
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minHeight: 48,
    marginBottom: 4,
  },
  drawerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  drawerItemActive: {
    backgroundColor: '#f0f0f0',
  },
  drawerLabel: {
    marginLeft: 16,
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  drawerLabelActive: {
    color: '#6200ee',
    fontWeight: '600',
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    padding: 16,
  },
  footerContent: {
    marginBottom: 8,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  version: {
    fontSize: 13,
    color: '#999',
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

export default function AppLayout() {
  return (
    <ThemeProvider>
      <AppWrapper>
        <DrawerNavigator />
      </AppWrapper>
    </ThemeProvider>
  );
}
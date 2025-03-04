import { Drawer } from 'expo-router/drawer';
import { useRouter, useSegments } from 'expo-router';
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

/* --------------------------------------------
   0. Constants & Maps
-------------------------------------------- */
const HEADER_TEXT_COLOR = '#FFFFFF';

const MAIN_ROUTES = [
  'index',
  'components',
  'practices',
  'tools',
  'frameworks-comparison',
  'accessibility-instruction',
];

const TITLE_MAP = {
  index: 'Home',
  components: 'Components',
  practices: 'Best Practices',
  tools: 'Mobile Accessibility Tools',
  'frameworks-comparison': 'Framework Comparison',
  'accessibility-instruction': 'Instruction & Community',
  settings: 'Settings',
};

const BREADCRUMB_MAP = {
  // Components sub-screens
  'accessible-button': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Button',
  },
  'accessible-form': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Form Controls',
  },
  'accessible-media': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Media Content',
  },
  'accessible-dialog': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Dialog',
  },
  'accessible-advanced': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Advanced Components',
  },

  // Practices sub-screens
  semantics: {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Semantic Structure',
  },
  guidelines: {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'WCAG 2.2 Guidelines',
  },
  'screen-reader': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Screen Reader Support',
  },
  navigation: {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Navigation & Focus',
  },
  gestures: {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Gesture Tutorial',
  },

  // Full-path keys (alternative)
  'accessible-components/accessible-button': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Button',
  },
  'accessible-components/accessible-form': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Form Controls',
  },
  'accessible-components/accessible-media': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Media Content',
  },
  'accessible-components/accessible-dialog': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Dialog',
  },
  'accessible-components/accessible-advanced': {
    parentRoute: 'components',
    parentLabel: 'Components',
    title: 'Advanced Components',
  },
  'practices-screens/semantics': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Semantic Structure',
  },
  'practices-screens/guidelines': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'WCAG 2.2 Guidelines',
  },
  'practices-screens/screen-reader': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Screen Reader Support',
  },
  'practices-screens/navigation': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Navigation & Focus',
  },
  'practices-screens/gestures': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Gesture Tutorial',
  },
};

/* --------------------------------------------
   1. Header Title Function (using useSegments)
-------------------------------------------- */
function renderHeaderTitle(router) {
  const segments = useSegments(); // Legge i segmenti di percorso

  // Se non ci sono segmenti o siamo in Home
  if (!segments || segments.length === 0 || segments[0] === 'index') {
    return (
      <Text
        style={styles.mainTitle}
        accessibilityLabel="Home"
      >
        Home
      </Text>
    );
  }

  // Se abbiamo un solo segmento (top-level screen come 'tools', 'components', ecc.)
  if (segments.length === 1) {
    const child = segments[0]; // Esempio: 'tools'
    const title = TITLE_MAP[child] || child; // Mappa su "Mobile Accessibility Tools"
    return (
      <View style={styles.breadcrumbContainer}>
        <TouchableOpacity
          onPress={() => router.replace('/')}
          accessibilityRole="button"
          accessibilityLabel="Go to Home"
        >
          <Text style={[styles.breadcrumbText, { fontWeight: 'normal' }]}>
            Home
          </Text>
        </TouchableOpacity>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={HEADER_TEXT_COLOR}
          style={{ marginHorizontal: 4 }}
          importantForAccessibility="no"
          accessibilityElementsHidden
        />
        <Text
          style={[styles.breadcrumbText, { fontWeight: 'bold' }]}
          accessibilityLabel={`Current screen: ${title}`}
        >
          {title}
        </Text>
      </View>
    );
  }

  // Se abbiamo più segmenti (subscreen)
  const parent = segments[0]; // ad esempio "components"
  const child = segments[segments.length - 1]; // ad esempio "accessible-button"
  const key = `${parent}/${child}`;
  const mapping = BREADCRUMB_MAP[key] || BREADCRUMB_MAP[child] || {
    parentRoute: parent,
    parentLabel: TITLE_MAP[parent] || parent,
    title: child,
  };

  return (
    <View style={styles.breadcrumbContainer}>
      <TouchableOpacity
        onPress={() => router.replace(`/${mapping.parentRoute}`)}
        accessibilityRole="button"
        accessibilityLabel={`Go to ${mapping.parentLabel}`}
      >
        <Text style={[styles.breadcrumbText, { fontWeight: 'normal' }]}>
          {mapping.parentLabel}
        </Text>
      </TouchableOpacity>
      <Ionicons
        name="chevron-forward"
        size={16}
        color={HEADER_TEXT_COLOR}
        style={{ marginHorizontal: 4 }}
        importantForAccessibility="no"
        accessibilityElementsHidden
      />
      <Text
        style={[styles.breadcrumbText, { fontWeight: 'bold' }]}
        accessibilityLabel={`Current screen: ${mapping.title}`}
      >
        {mapping.title}
      </Text>
    </View>
  );
}

/* --------------------------------------------
   2. Custom Drawer Content (invariato)
-------------------------------------------- */
function CustomDrawerContent({ state, descriptors }) {
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
      style={[drawerStyles.container, { backgroundColor: colors.background }]}
      accessibilityRole="menu"
      accessibilityLabel="Main navigation menu"
    >
      <View style={[drawerStyles.header, { backgroundColor: colors.primary }]}>
        <Ionicons name="rocket-outline" size={48} color="#FFFFFF" style={drawerStyles.appIcon} />
        <Text style={[drawerStyles.appName, { color: '#FFFFFF' }]}>AccessibleHub</Text>
        <Text style={[drawerStyles.version, { color: '#FFFFFF' }]}>Version 1.0.0</Text>
      </View>
      <View style={drawerStyles.drawerContent}>
        {state.routes
          .filter((route) => MAIN_ROUTES.includes(route.name))
          .map((route, index) => {
            const isActive = state.index === index;
            const { drawerLabel, drawerIcon } = descriptors[route.key].options;
            const label = drawerLabel || route.name;
            return (
              <TouchableOpacity
                key={route.key}
                style={[
                  drawerStyles.drawerItem,
                  { backgroundColor: colors.surface, borderColor: colors.border },
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
   3. Drawer Navigator
-------------------------------------------- */
function DrawerNavigator() {
 const router = useRouter();
  const { colors } = useTheme();
  const segments = useSegments(); // Hook at top level
  const currentRoute = segments && segments.length > 0 ? segments[0] : '';

  const screenOptions = ({ navigation, route }) => {
    return {
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: HEADER_TEXT_COLOR,
      headerTitle: () => renderHeaderTitle(router),
      headerLeft: () => {
        const routeName = route.name;

        if (MAIN_ROUTES.includes(routeName)) {
          // Top-level route → open drawer
          return (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              accessibilityRole="button"
              accessibilityLabel="Toggle menu"
              style={styles.headerButton}
            >
              <Ionicons name="menu-outline" size={24} color={HEADER_TEXT_COLOR} />
            </TouchableOpacity>
          );
        }

        // Various conditions for "accessible-components", "practices-screens", etc.
        if (routeName === 'accessible-components' || routeName.startsWith('accessible-')) {
          return (
            <TouchableOpacity
              onPress={() => {
                router.replace('/components');
              }}
              accessibilityRole="button"
              accessibilityLabel="Return to Components"
              style={styles.headerButton}
            >
              <Ionicons name="arrow-back" size={24} color={HEADER_TEXT_COLOR} />
            </TouchableOpacity>
          );
        }

        if (routeName === 'practices-screens' || routeName.startsWith('practices-screens/')) {
          return (
            <TouchableOpacity
              onPress={() => {
                router.replace('/practices');
              }}
              accessibilityRole="button"
              accessibilityLabel="Return to Best Practices"
              style={styles.headerButton}
            >
              <Ionicons name="arrow-back" size={24} color={HEADER_TEXT_COLOR} />
            </TouchableOpacity>
          );
        }

        // For settings with param "prev"
        if (routeName === 'settings') {
          const prevRoute = route.params?.prev;
          return (
            <TouchableOpacity
              onPress={() => {
                if (prevRoute) {
                  router.replace(`/${prevRoute}`);
                } else {
                  router.back();
                }
              }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={styles.headerButton}
            >
              <Ionicons name="arrow-back" size={24} color={HEADER_TEXT_COLOR} />
            </TouchableOpacity>
          );
        }

        // Default goBack
        return (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.headerButton}
          >
            <Ionicons name="arrow-back" size={24} color={HEADER_TEXT_COLOR} />
          </TouchableOpacity>
        );
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            // Pass currentRoute as 'prev' param
            router.push({
              pathname: '/settings',
              params: { prev: currentRoute },
            });
          }}
          accessibilityRole="button"
          accessibilityLabel="Open Settings"
          style={styles.headerButton}
        >
          <Ionicons name="ellipsis-vertical" size={24} color={HEADER_TEXT_COLOR} />
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

/* --------------------------------------------
   5. Styles
-------------------------------------------- */
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
  mainTitle: {
    fontSize: 17,
    color: HEADER_TEXT_COLOR,
    fontWeight: 'bold',
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    color: HEADER_TEXT_COLOR,
    fontSize: 14,
  },
});

const drawerStyles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  appIcon: { marginBottom: 8 },
  appName: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  version: { fontSize: 12 },
  drawerContent: { flex: 1, padding: 16 },
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
  drawerIcon: { marginRight: 12 },
  drawerLabel: { fontSize: 16, marginLeft: 16, flex: 1 },
});

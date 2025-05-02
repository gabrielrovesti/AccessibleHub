import { Drawer } from 'expo-router/drawer';
import { useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, AccessibilityInfo } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

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

function renderHeaderTitle(router) {
  const segments = useSegments();

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

  if (segments.length === 1) {
    const child = segments[0];
    const title = TITLE_MAP[child] || child;
    return (
      <View style={styles.breadcrumbContainer}>
        <TouchableOpacity
          onPress={() => router.replace('/')}
          accessibilityRole="button"
          accessibilityLabel="Go to Home"
          style={{
            padding: 8,
            minWidth: 40,
            minHeight: 44,
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 4
          }}
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
          style={[styles.breadcrumbText, { fontWeight: 'bold', textDecorationLine: 'underline'}]}
          accessibilityLabel={`Current screen: ${title}`}
        >
          {title}
        </Text>
      </View>
    );
  }

  const parent = segments[0];
  const child = segments[segments.length - 1];
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
      style={{
        padding: 8,
        minWidth: 40,
        minHeight: 44,
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4
      }}
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
        style={[styles.breadcrumbText, { fontWeight: 'bold', textDecorationLine: 'underline'}]}
        accessibilityLabel={`Current screen: ${mapping.title}`}
      >
        {mapping.title}
      </Text>
    </View>
  );
}

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
      <LinearGradient
        colors={['#1867e8', '#0043a8']}
        style={drawerStyles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Ionicons
        name="rocket-outline"
        size={56}
        color="#FFFFFF"
        style={drawerStyles.appIcon}
        importantForAccessibility="no"
        accessibilityElementsHidden={true}
        />
        <Text style={[drawerStyles.appName, { color: '#FFFFFF' }]}>AccessibleHub</Text>
      </LinearGradient>
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
                    { backgroundColor: colors.surface, borderColor: 'transparent' },
                    isActive && {
                      borderColor: colors.primary,
                      borderWidth: 1.5,
                      backgroundColor: isDarkMode ? '#ffffff16' : '#0055ff10',
                      shadowColor: colors.primary,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3,
                      elevation: 2,
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
              {isActive && (
                <View
                  style={{
                    position: 'absolute',
                    left: 0, right: 0, top: 0, bottom: 0,
                    borderLeftWidth: 4,
                    borderColor: colors.primary,
                    borderRadius: 12,
                    backgroundColor: 'transparent'
                  }}
                  importantForAccessibility="no"
                  accessibilityElementsHidden
                />
              )}
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
      <View
        style={drawerStyles.footer}
        importantForAccessibility="no"
        accessibilityElementsHidden={true}
      >
    <Text
        style={[drawerStyles.footerText, { color: colors.textSecondary }]}
        accessibilityLabel="Made with love by Gabriel Rovesti"
    >
        Made with ❤️ by Gabriel Rovesti
    </Text>
      </View>
    </View>
  );
}

function DrawerNavigator() {
 const router = useRouter();
  const { colors } = useTheme();
  const segments = useSegments();
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
          paddingVertical: 42,
          paddingHorizontal: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 16,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
    },
    appIcon: { marginBottom: 12 },
    appName: { fontSize: 26, fontWeight: 'bold' },
      version: { fontSize: 12 },
      drawerContent: { flex: 1, padding: 16 },
    drawerItem: {
      marginBottom: 12,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 18,
      minHeight: 56,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
  drawerIcon: { marginRight: 12 },
  drawerLabel: { fontSize: 16, marginLeft: 16, flex: 1 },
  footer: {
    padding: 16,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
  },
});

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

/* --------------------------------------------
   0. Constants
-------------------------------------------- */
const HEADER_TEXT_COLOR = '#FFFFFF';

// Main routes in the drawer
const MAIN_ROUTES = [
  'index',
  'components',
  'practices',
  'tools',
  'frameworks-comparison',
  'accessibility-instruction',
];

/**
 * BREADCRUMB_MAP:
 *  Keys = the **last segment** (e.g. "guidelines", "accessible-button").
 *  Values = metadata: { parentRoute, parentLabel, title }
 */
// Sostituisci la definizione di BREADCRUMB_MAP nel file _layout.tsx con questa versione ottimizzata
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
  'semantics': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Semantic Structure',
  },
  'guidelines': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'WCAG 2.2 Guidelines',
  },
  'screen-reader': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Screen Reader Support',
  },
  'navigation': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Navigation & Focus',
  },
  'gestures': {
    parentRoute: 'practices',
    parentLabel: 'Best Practices',
    title: 'Gesture Tutorial',
  },

  // Alternative paths per gestire i percorsi completi (segmento iniziale/finale)
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

/**
 * TITLE_MAP:
 *  For the main routes or single-route screens like "settings"
 */
const TITLE_MAP = {
  index: 'Home',
  components: 'Components',
  practices: 'Best Practices',
  tools: 'Mobile Accessibility Tools',
  'frameworks-comparison': 'Framework Comparison',
  'accessibility-instruction': 'Instruction & Community',
  settings: 'Settings',
};

/* --------------------------------------------
   1. renderHeaderTitle
-------------------------------------------- */
/* --------------------------------------------
   1. renderHeaderTitle
-------------------------------------------- */
function renderHeaderTitle(routeName, router) {
  // First try the full route name (for paths like "practices-screens/guidelines")
  if (BREADCRUMB_MAP[routeName]) {
    const bc = BREADCRUMB_MAP[routeName];
    return (
      <View style={styles.breadcrumbContainer}>
        <TouchableOpacity
          onPress={() => router.replace(`/${bc.parentRoute}`)}
          accessibilityRole="button"
          accessibilityLabel={`Go to ${bc.parentLabel}`}
        >
          <Text style={[styles.breadcrumbText, { fontWeight: 'normal' }]}>
            {bc.parentLabel}
          </Text>
        </TouchableOpacity>

        <Ionicons
          name="chevron-forward"
          size={16}
          color={HEADER_TEXT_COLOR}
          style={{ marginHorizontal: 4 }}
        />

        <Text
          style={[styles.breadcrumbText, { fontWeight: 'bold' }]}
          accessibilityLabel={`Current screen: ${bc.title}`}
        >
          {bc.title}
        </Text>
      </View>
    );
  }

  // Check if it's a main route with a simple title
  if (TITLE_MAP[routeName]) {
    return (
      <Text style={styles.mainTitle} accessibilityLabel={TITLE_MAP[routeName]}>
        {TITLE_MAP[routeName]}
      </Text>
    );
  }

  // Try to parse the path segments
  const segments = routeName.split('/');
  const lastSegment = segments[segments.length - 1];

  // Check if last segment is in BREADCRUMB_MAP
  const bc = BREADCRUMB_MAP[lastSegment];
  if (bc) {
    return (
      <View style={styles.breadcrumbContainer}>
        <TouchableOpacity
          onPress={() => router.replace(`/${bc.parentRoute}`)}
          accessibilityRole="button"
          accessibilityLabel={`Go to ${bc.parentLabel}`}
        >
          <Text style={[styles.breadcrumbText, { fontWeight: 'normal' }]}>
            {bc.parentLabel}
          </Text>
        </TouchableOpacity>

        <Ionicons
          name="chevron-forward"
          size={16}
          color={HEADER_TEXT_COLOR}
          style={{ marginHorizontal: 4 }}
        />

        <Text
          style={[styles.breadcrumbText, { fontWeight: 'bold' }]}
          accessibilityLabel={`Current screen: ${bc.title}`}
        >
          {bc.title}
        </Text>
      </View>
    );
  }

  // Fallback
  return (
    <Text style={styles.mainTitle} accessibilityLabel={routeName}>
      {lastSegment || routeName}
    </Text>
  );
}

/* --------------------------------------------
   2. Custom Drawer Content
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
      {/* Drawer Header */}
      <View style={[drawerStyles.header, { backgroundColor: colors.primary }]}>
        <Ionicons name="rocket-outline" size={48} color="#FFFFFF" style={drawerStyles.appIcon} />
        <Text style={[drawerStyles.appName, { color: '#FFFFFF' }]}>AccessibleHub</Text>
        <Text style={[drawerStyles.version, { color: '#FFFFFF' }]}>Version 1.0.0</Text>
      </View>

      {/* Drawer Items */}
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

const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
  // Funzione che determina il titolo corretto
 const getTitle = () => {
     const routeName = route.name;
     console.log("Current route name:", routeName);

     // Titoli delle schermate principali
     if (TITLE_MAP[routeName]) {
       return (
         <Text style={styles.mainTitle}>
           {TITLE_MAP[routeName]}
         </Text>
       );
     }

     // APPROCCIO DIRETTO: ogni schermata viene identificata esplicitamente
     if (routeName === 'accessible-button') {
       return createBreadcrumb('Components', 'Button');
     }
     if (routeName === 'accessible-form') {
       return createBreadcrumb('Components', 'Form Controls');
     }
     if (routeName === 'accessible-media') {
       return createBreadcrumb('Components', 'Media Content');
     }
     if (routeName === 'accessible-dialog') {
       return createBreadcrumb('Components', 'Dialog');
     }
     if (routeName === 'accessible-advanced') {
       return createBreadcrumb('Components', 'Advanced Components');
     }

     if (routeName === 'semantics') {
       return createBreadcrumb('Best Practices', 'Semantic Structure');
     }
     if (routeName === 'guidelines') {
       return createBreadcrumb('Best Practices', 'WCAG 2.2 Guidelines');
     }
     if (routeName === 'screen-reader') {
       return createBreadcrumb('Best Practices', 'Screen Reader Support');
     }
     if (routeName === 'navigation') {
       return createBreadcrumb('Best Practices', 'Navigation & Focus');
     }
     if (routeName === 'gestures') {
       return createBreadcrumb('Best Practices', 'Gesture Tutorial');
     }

     // Fallback: nome della route
     return <Text style={styles.mainTitle}>{routeName}</Text>;
   };

   // Funzione helper per creare un breadcrumb
   function createBreadcrumb(parent, current) {
     const parentRoute = parent === 'Components' ? 'components' : 'practices';

     return (
       <View style={styles.breadcrumbContainer}>
         <TouchableOpacity
           onPress={() => router.push(`/${parentRoute}`)}
           accessibilityRole="button"
           accessibilityLabel={`Go to ${parent}`}
         >
           <Text style={[styles.breadcrumbText, { fontWeight: 'normal' }]}>
             {parent}
           </Text>
         </TouchableOpacity>
         <Ionicons
           name="chevron-forward"
           size={16}
           color={HEADER_TEXT_COLOR}
           style={{ marginHorizontal: 4 }}
         />
         <Text style={[styles.breadcrumbText, { fontWeight: 'bold' }]}>
           {current}
         </Text>
       </View>
     );
   }

   // Gestione unificata e semplificata dei pulsanti Back
   const getLeftButton = () => {
     const routeName = route.name;
     console.log("Left button for:", routeName);

     // Per i percorsi principali -> menu hamburger
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

     // Indietro specifico per ogni sezione
     if (routeName.startsWith('accessible-')) {
       return (
         <TouchableOpacity
           onPress={() => navigation.navigate('components')}
           accessibilityRole="button"
           accessibilityLabel="Return to Components"
           style={styles.headerButton}
         >
           <Ionicons name="arrow-back" size={24} color={HEADER_TEXT_COLOR} />
         </TouchableOpacity>
       );
     }

     if (['semantics', 'guidelines', 'screen-reader', 'navigation', 'gestures'].includes(routeName)) {
       return (
         <TouchableOpacity
           onPress={() => navigation.navigate('practices')}
           accessibilityRole="button"
           accessibilityLabel="Return to Best Practices"
           style={styles.headerButton}
         >
           <Ionicons name="arrow-back" size={24} color={HEADER_TEXT_COLOR} />
         </TouchableOpacity>
       );
     }

     // Default back button
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
   };

   return {
     headerShown: true,
     headerStyle: {
       backgroundColor: colors.primary,
       elevation: 0,
       shadowOpacity: 0,
     },
     headerTintColor: HEADER_TEXT_COLOR,
     headerTitle: getTitle,
     headerLeft: getLeftButton,
     headerRight: () => (
       <TouchableOpacity
         onPress={() => router.push('/settings')}
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
      {/* 'settings' is not in the drawer */}
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
   5. Styles
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

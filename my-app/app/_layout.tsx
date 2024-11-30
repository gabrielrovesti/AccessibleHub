import { Drawer } from 'expo-router/drawer';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function CustomDrawerContent(props) {
  // Avoid including not_found screens by default and sitemap here
  const excludedRoutes = ['_sitemap', '+not-found', 'accessible-components', 'components'];

  return (
    <View style={styles.container}>
      <View style={styles.drawerContent}>
        {props.state.routes
          .filter((route) => !excludedRoutes.includes(route.name)) // Exclude unwanted routes
          .map((route, index) => {
            const isActive = props.state.index === index;
            const { drawerLabel, drawerIcon } = props.descriptors[route.key].options;

            return (
              <View
                key={route.key}
                style={[
                  styles.drawerItem,
                  isActive && styles.drawerItemActive,
                ]}
                onTouchEnd={() => props.navigation.navigate(route.name)}
              >
                {drawerIcon && drawerIcon({ size: 24, color: isActive ? '#6200ee' : '#666' })}
                <Text style={[styles.drawerLabel, isActive && styles.drawerLabelActive]}>
                  {drawerLabel || route.name}
                </Text>
              </View>
            );
          })}
      </View>

      {/* Footer section */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.appName}>AccessibleHub</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
      </View>
    </View>
  );
}


export default function AppLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        drawerStyle: {
          backgroundColor: '#fff',
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          headerTitle: "AccessibleHub",
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
    </Drawer>
  );
}

const styles = StyleSheet.create({
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
  },
  drawerItemActive: {
    backgroundColor: '#f0f0f0',
  },
  drawerLabel: {
    marginLeft: 16,
    fontSize: 16,
    color: '#666',
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
});

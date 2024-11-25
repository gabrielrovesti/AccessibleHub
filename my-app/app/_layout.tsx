import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function AppLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          title: "An accessibility testing manual for developers",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="components"
        options={{
          drawerLabel: "Component Examples",
          title: "Component Examples",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="code-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="practices"
        options={{
          drawerLabel: "Best Practices",
          title: "Best Practices",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="tools"
        options={{
          drawerLabel: "Testing Tools",
          title: "Testing Tools",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="build-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({});
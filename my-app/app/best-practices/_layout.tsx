import { Stack } from 'expo-router';

export default function PracticesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="practices"
        options={{
          title: 'Best Practices',
          headerShown: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="guidelines"
        options={{
          title: "WCAG 2.2 Guidelines",
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="semantics"
        options={{
          title: "Semantic Structure",
           headerShown: true,
           headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="screen-reader"
        options={{
          title: "Screen Reader Support",
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="navigation"
        options={{
          title: "Navigation & Focus",
          headerShown: true,
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
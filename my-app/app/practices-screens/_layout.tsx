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
        name="semantics"
        options={{
          title: "Semantic Structure",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="guidelines"
        options={{
          title: "WCAG 2.2 Guidelines",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="screen-reader"
        options={{
          title: "Screen Reader Support",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="navigation"
        options={{
          title: "Navigation & Focus",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="gestures"
        options={{
          title: "Gesture Tutorial",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
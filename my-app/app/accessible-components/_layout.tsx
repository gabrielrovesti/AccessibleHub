import { Stack } from 'expo-router';

export default function ComponentsLayout() {
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
        name="basic-button"
        options={{
          title: "Basic Button",
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="accessible-form"
        options={{
          title: "Form Controls",
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="media-content"
        options={{
          title: "Media Content",
          headerShown: true,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="navigation-pattern"
        options={{
          title: "Navigation Pattern",
          headerShown: true,
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
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
          headerShown: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="accessible-form"
        options={{
          title: "Form Controls",
          headerShown: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="media-content"
        options={{
          title: "Media Content",
          headerShown: false,
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="interactive-dialog"
        options={{
          title: "Interactive Dialog",
          headerShown: false,
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
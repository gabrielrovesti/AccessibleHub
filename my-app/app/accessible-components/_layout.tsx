import { Stack, useRouter } from 'expo-router';
import { Platform, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

export default function ComponentsLayout() {
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace('/components');
        return true;
      };

      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
    }, [])
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}
    >
      <Stack.Screen
        name="accessible-button"
        options={{
          title: "Basic Button"
        }}
      />
      <Stack.Screen
        name="accessible-form"
        options={{
          title: "Form Controls"
        }}
      />
      <Stack.Screen
        name="accessible-media"
        options={{
          title: "Media Content"
        }}
      />
      <Stack.Screen
        name="accessible-dialog"
        options={{
          title: "Interactive Dialog"
        }}
      />
      <Stack.Screen
        name="accessible-advanced"
        options={{
          title: "Advanced Components"
        }}
      />
    </Stack>
  );
}
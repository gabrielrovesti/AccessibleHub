import { Stack, useRouter } from 'expo-router';
import { Platform, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

export default function PracticesLayout() {
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace('/practices');
        return true;
      };

      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }
    }, [router])
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}
    >
      <Stack.Screen
        name="semantics"
        options={{
          title: "Semantic Structure"
        }}
      />
      <Stack.Screen
        name="guidelines"
        options={{
          title: "WCAG 2.2 Guidelines"
        }}
      />
      <Stack.Screen
        name="screen-reader"
        options={{
          title: "Screen Reader Support"
        }}
      />
      <Stack.Screen
        name="navigation"
        options={{
          title: "Navigation & Focus"
        }}
      />
      <Stack.Screen
        name="gestures"
        options={{
          title: "Gesture Tutorial"
        }}
      />
    </Stack>
  );
}
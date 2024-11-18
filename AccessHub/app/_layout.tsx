import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          drawerStyle: {
            backgroundColor: '#fff',
          },
          drawerActiveTintColor: '#2563eb',
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: 'Home',
            drawerIcon: ({ color }) => (
              <Feather name="home" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="screen-readers"
          options={{
            title: 'Screen Readers',
            drawerIcon: ({ color }) => (
              <Feather name="speaker" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="frameworks"
          options={{
            title: 'Framework Comparison',
            drawerIcon: ({ color }) => (
              <Feather name="layers" size={24} color={color} />
            ),
          }}
        />
      </Drawer>
    </ThemeProvider>
  );
}
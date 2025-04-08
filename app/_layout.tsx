// _layout.tsx
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Slot, useRouter } from 'expo-router';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();

      AsyncStorage.getItem('token')
        .then(token => {
          setIsAuthenticated(!!token);
        })
        .catch(err => {
          console.error('Error al recuperar token:', err);
          setIsAuthenticated(false);
        });
    }
  }, [loaded]);

  useEffect(() => {
    if (loaded && isAuthenticated === false) {
      requestAnimationFrame(() => {
        router.replace("/login");
      });
    }
  }, [loaded, isAuthenticated, router]);

  if (!loaded || isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});

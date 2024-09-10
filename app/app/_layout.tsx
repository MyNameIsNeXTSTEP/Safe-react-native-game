import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import MainView from '@/components/MainView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import PasswordInput from '@/components/PasswordTale';
import ResultPopup from '@/components/ResultPopup';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'times_new_roman': require('../assets/fonts/times_new_roman.ttf'),
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
      <MainView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Выберите 1 комбинацию</ThemedText>
        </ThemedView>
        <PasswordInput/>
      </MainView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
    gap: 8,
    marginBottom: 24,
    marginTop: 12,
    fontFamily: 'times_new_roman',
  },
});

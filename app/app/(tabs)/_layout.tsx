import { View, StyleSheet } from 'react-native';

import MainView from '@/components/MainView';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import PasswordInput from '@/components/PasswordInput';

export default function TabLayout() {
  const handlePasswordEntered = (password: string) => {
    console.log('Password entered:', password);
  };
  const colorScheme = useColorScheme();

  return (
    <View>
      <MainView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Приветствуем Вас!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.descContainer}>
          <ThemedText type="subtitle">Введите 4-x значное число и попробуйте отгадать код от сейфа с призом!</ThemedText>
          <PasswordInput onPasswordEntered={handlePasswordEntered} />
        </ThemedView>
      </MainView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 'auto',
    gap: 8,
    marginBottom: 32,
  },
  descContainer: {
    margin: 'auto',
    marginBottom: 32,
  },
});

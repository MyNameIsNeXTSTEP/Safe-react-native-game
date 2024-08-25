import { View, StyleSheet } from 'react-native';

import MainView from '@/components/MainView';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import PasswordInput from '@/components/PasswordInput';

export default function TabLayout() {
  const handlePasswordEntered = (password: string) => {
    console.log('Password entered:', password);
  };

  return (
    <View style={{ height: '100%' }}>
      <MainView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Приветствуем Вас!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.descContainer}>
          <ThemedText type='subtitle'>Попробуйте отгадать код от сейфа и получит приз!</ThemedText>
        </ThemedView>
        <PasswordInput onPasswordEntered={handlePasswordEntered} />
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
    marginBottom: 64,
    marginTop: 32,
  },
  descContainer: {
    margin: 'auto',
    gap: 32,
  },
});

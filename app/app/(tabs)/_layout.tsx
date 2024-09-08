import { View, StyleSheet } from 'react-native';

import MainView from '@/components/MainView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import PasswordInput from '@/components/PasswordTale';

export default function TabLayout() {
  return (
    <View style={{ height: '100%' }}>
      <MainView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Выберите 1 комбинацию</ThemedText>
        </ThemedView>
        <PasswordInput/>
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
    marginBottom: 24,
    marginTop: 12,
  },
});

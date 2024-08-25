import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedRef,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

export default function MainView({
  children,
}: any) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    overflow: 'scroll',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 'auto',
    gap: 16,
    overflow: 'hidden',
  },
});

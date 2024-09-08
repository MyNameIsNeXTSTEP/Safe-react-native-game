import { View, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";

interface IProps {
  isOpen: boolean,
  isSuccess?: boolean,
}

const ResultPopup = ({
    isOpen = false,
    isSuccess,
}: IProps) => {
  return <>
    {
      isOpen
        ?
        <View style={styles.overlay}>
          <ThemedView style={styles.container}>
            <p>
              {
                isSuccess
                  ? 'Unlocked'
                  : 'Пароль не верный'
              }
            </p>
          </ThemedView>
        </View>
        : null
    }
  </>;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1000,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: 300,
    height: 300,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'relative',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
});

export default ResultPopup;

import { View, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { useEffect, useState } from "react";

interface IProps {
  isOpen: boolean,
  isSuccess?: boolean,
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const ResultPopup = ({
  isOpen = false,
  isSuccess,
  setIsPopupOpen,
}: IProps) => {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   let timeoutId: number;
  //   if (isOpen) {
  //     setLoading(true);
  //     timeoutId = setTimeout(() => setLoading(false), 2000);
  //   }
  //   return () => clearTimeout(timeoutId);
  // }, [isOpen]);

  return <div>
    {
      isOpen
        ?
        <View style={styles.overlay}>
          <ThemedView
            style={
              loading
                ? { ...styles.container, ...styles.containerLoader }
                : isSuccess
                  ? styles.container
                  : { ...styles.container, ...styles.containerFail }
            }
          >
            <p style={{ fontFamily: 'times_new_roman' }}>
              {
                loading
                  ? 'Проверяем...'
                  : isSuccess
                    ? 'Unlocked ✅'
                    : 'Пароль не верный'
              }
            </p>
            {
              !loading && <div
                className='exit-btn'
                style={styles.exit}
                onClick={() => setIsPopupOpen(false)}
              >
                <p>❌</p>
              </div>
            }
          </ThemedView>
        </View>
        : null
    }
  </div>;
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
    height: 200,
    borderRadius: 25,
    backgroundColor: 'green',
    position: 'relative',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    color: 'white',
    fontSize: 20,
  },
  containerFail: {
    backgroundColor: 'red',
  },
  containerLoader: {
    backgroundColor: 'orange',
  },
  loader: {
    position: 'relative',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
  exit: {
    position: 'absolute',
    top: 0,
    right: 0,
    cursor: 'pointer',
    width: 'auto',
    height: 'auto',
    padding: 4,
    marginRight: 12,
    fontSize: 13,

    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'black',
  },
});

export default ResultPopup;

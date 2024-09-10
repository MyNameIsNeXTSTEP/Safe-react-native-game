import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { passwordCompareList } from '@/constants';
import { green } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storePassword = async (value: string) => {
  try {
    await AsyncStorage.setItem(value, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const getPassword = async (value: string) => {
  try {
    return await AsyncStorage.getItem(value);
  } catch (e) {
    console.log(e);
  }
};

const usePasswordState = (initialPasswords: string[] = []) => {
  const [usedPasswords, setUsedPasswords] = useState(initialPasswords);
  const updateUsedPasswords = useCallback((newPassword: string) => {
    setUsedPasswords([...usedPasswords, newPassword]);
  }, [usedPasswords]);
  return [usedPasswords, updateUsedPasswords];
};

const mapList = new Map();

const PasswordInput = () => {
  const [password, setPassword] = useState<string | null | undefined>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [allList, setAllList] = useState(mapList)
  const { 0: usedPasswords, 1: updateUsedPasswords } = usePasswordState();

  const [loading, setLoading] = useState(false);

  passwordCompareList.map(pswd => {
    mapList.set(
      pswd,
      () => <TouchableOpacity
        key={pswd}
        // @ts-ignore
        disabled={usedPasswords.includes(pswd)}
        style={styles.digitButton}
        onPress={(e) => handlePasswordPress(pswd)}
      >
        <Text style={styles.digitButtonText}>{pswd}</Text>
      </TouchableOpacity>
    )
  });

  useEffect(() => {
    let timeoutId: number;
    if (isPopupOpen) {
      setLoading(true);
      timeoutId = setTimeout(() => setLoading(false), 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [isPopupOpen]);

  useEffect(() => {
    const buttonTypeStyle = isSuccess ? styles.successButton : styles.usedButton;
    console.log(buttonTypeStyle);
    const updateStyles = async () => {
      setAllList(prevMap => {
        return prevMap.set(
          password,
          () => <TouchableOpacity
            key={password}
            // @ts-ignore
            disabled={usedPasswords.includes(password)}
            style={
              { ...styles.digitButton, ...buttonTypeStyle }
            }
            // @ts-ignore
            onPress={(e) => handlePasswordPress(password)}
          >
            <Text style={styles.digitButtonText}>{password}</Text>
          </TouchableOpacity>
        );
      })
    };
    updateStyles();
  }, [usedPasswords, password, isSuccess]);

  const checkIfPasswordWasUsed = useCallback(async (pswd: string) => {
    try {
      const wasUsed = !!(await getPassword(pswd))?.length;
      return wasUsed;
    } catch (error) {
      console.log(error);
    }
  }, [password]);

  const handlePasswordPress = (pswd?: string) => {
    if (!pswd) return;
    setPassword(pswd);

    console.log(pswd);

    checkIfPasswordWasUsed(pswd).then(async res => {
      try {
        if (!res) await storePassword(pswd);
      } catch (error) {
        console.log(error);
      }
    });

    // @ts-ignore
    updateUsedPasswords(pswd);
    setIsPopupOpen(true);

    setIsSuccess(
      pswd === '8336'
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.safe}>
        <ThemedView style={styles.digitButtonsContainer}>
          {
            passwordCompareList.map(pswd => allList.get(pswd)())
          }
        </ThemedView>
      </View>

      <div>
        {
          isPopupOpen
            &&
            <View style={stylesPopup.overlay}>
              <ThemedView
                style={
                  loading
                    ? { ...stylesPopup.container, ...stylesPopup.containerLoader }
                    : isSuccess
                      ? stylesPopup.container
                      : { ...stylesPopup.container, ...stylesPopup.containerFail }
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
                    style={stylesPopup.exit}
                    onClick={() => setIsPopupOpen(false)}
                  >
                    <p>закрыть</p>
                  </div>
                }
              </ThemedView>
            </View>
        }
      </div>
      {/* <ResultPopup
        isOpen={isPopupOpen}
        isSuccess={isSuccess}
        setIsPopupOpen={setIsPopupOpen}
      /> */}
    </View>
  );
};

const stylesPopup = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 3,
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
    marginRight: 12,
  },
});

const styles = StyleSheet.create({
  safe: {
    zIndex: 1,
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'darkgreen',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  digitButtonsContainer: {
    padding: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 'auto',
  },
  digitButton: {
    width: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'darkgreen',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    fontFamily: 'times_new_roman',
  },
  usedButton: {
    backgroundColor: 'gray',
  },
  successButton: {
    backgroundColor: 'green',
  },
  digitButtonText: {
    fontSize: 20,
    color: green,
  },
});

export default PasswordInput;
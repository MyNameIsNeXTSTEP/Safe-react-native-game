import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { passwordCompareList } from '@/constants';
import { green } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from './ThemedText';

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

const mapList = new Map();

const PasswordInput = () => {
  const [password, setPassword] = useState<string | null | undefined>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [allList, setAllList] = useState(mapList)

  const createButtonStates = (passwords: string[]) => {
    return passwords.reduce((acc: any, password: string) => {
      acc[password] = () => <TouchableOpacity
        key={password}
        disabled={usedPasswords.includes(password)}
        style={styles.digitButton}
        onPress={(e) => handlePasswordPress(password)}
      >
        <Text style={styles.digitButtonText}>{password}</Text>
      </TouchableOpacity>;
      return acc;
    }, {});
  };

  const [buttonStates, setButtonStates] = useState(createButtonStates(passwordCompareList));

  const [usedPasswords, setUsedPasswords] = useState<string[]>([]);
  const updateUsedPasswords = useCallback((newPassword: string) => {
    setUsedPasswords([...usedPasswords, newPassword]);
  }, [usedPasswords]);

  passwordCompareList.map(pswd => {
    mapList.set(
      pswd,
      () => <TouchableOpacity
        key={pswd}
        disabled={usedPasswords.includes(pswd)}
        style={styles.digitButton}
        onPress={(e) => handlePasswordPress(pswd)}
      >
        <Text style={styles.digitButtonText}>{pswd}</Text>
      </TouchableOpacity>
    )
  });

  const checkIfPasswordWasUsed = useCallback(async (pswd: string) => {
    try {
      const wasUsed = !!(await getPassword(pswd))?.length;
      return wasUsed;
    } catch (error) {
      console.log(error);
    }
  }, [password]);

  console.log(password);

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

    const buttonTypeStyle = isSuccess ? styles.successButton : styles.usedButton;

    setButtonStates((prev: any) => {
      console.log(prev)
      return {
        ...prev,
        [pswd]: () => <TouchableOpacity
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
      }
    });

    console.log(buttonStates[pswd])

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
            passwordCompareList.map(pswd => buttonStates[pswd]())
          }
        </ThemedView>
      </View>

      {
        isPopupOpen
          &&
          <View style={stylesPopup.overlay}>
            <ThemedView
              style={
                  isSuccess
                    ? stylesPopup.container
                    : { ...stylesPopup.container, ...stylesPopup.containerFail }
              }
            >
              <ThemedText style={{ color: 'white' }}>
                {
                    isSuccess
                      ? 'Unlocked ✅'
                      : 'Пароль не верный'
                }
              </ThemedText>
              {
                <TouchableOpacity
                  style={stylesPopup.exit}
                  onPress={() => setIsPopupOpen(false)}
                >
                  <ThemedText style={{ color: 'white' }}>закрыть</ThemedText>
                </TouchableOpacity>
              }
            </ThemedView>
          </View>
      }
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
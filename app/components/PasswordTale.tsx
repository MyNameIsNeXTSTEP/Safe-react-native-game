import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import { ThemedView } from './ThemedView';
import { passwordCompareList } from '@/constants';
import { green } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
}

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

const PasswordInput = ({
  setIsPopupOpen,
  setIsSuccess,
}: IProps) => {
  const [usedPasswordsList, setUsedPasswordKeys] = useState<string[]>([]);
  const [password, setPassword] = useState<string | null | undefined>(null);

  useEffect(() => {
    (async () => {
      const used = await AsyncStorage.getAllKeys();
      setUsedPasswordKeys([...used]);
    })();
  }, [password]);

  const checkIfPasswordWasUsed = useCallback(async (pswd: string) => {
    try {
      const wasUsed = !!(await getPassword(pswd))?.length;
      return wasUsed;
    } catch (error) {
      console.log(error);
    }
  }, [password]);

  const handlePasswordPress = async (pswd?: string) => {
    if (!pswd) return;

    setPassword(pswd);

    checkIfPasswordWasUsed(pswd).then(async res => {
      try {
        if (!res) await storePassword(pswd);
      } catch (error) {
        console.log(error);
      }
    });

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
            passwordCompareList.map(pswd => {
              return <TouchableOpacity
                key={pswd}
                // disabled={checkIfPasswordWasUsed(pswd)}
                style={
                  usedPasswordsList.includes(pswd)
                    ? { ...styles.digitButton, ...styles.usedButton }
                    : styles.digitButton
                }
                onPress={(e) => handlePasswordPress(pswd)}
              >
                <Text style={styles.digitButtonText}>{pswd}</Text>
              </TouchableOpacity>
            })
          }
        </ThemedView>
      </View>
    </View>
  );
};

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
  digitButtonText: {
    fontSize: 20,
    color: green,
  },
});

export default PasswordInput;
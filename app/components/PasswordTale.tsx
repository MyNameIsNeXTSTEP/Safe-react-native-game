import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { passwordCompareList } from '@/constants';
import { green } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResultPopup from './ResultPopup';

interface IProps { 
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>,
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

/**
* @Note
* Bad bad practice to use so much state hooks in one big component!
* Leaved as is here for the sake of developing speed.
* Better to decompose to several isolated pure components.
*/
const PasswordInput = ({ setIsPopupOpen }: IProps) => {
  const [password, setPassword] = useState('');
  const [passwordWasUsed, setPasswordWasUsed] = useState<boolean | undefined>(false);

  const shadowUsedPassword = useCallback(() => {

  }, [password]);

  useEffect(() => {
    ( async () => {
      if (password.length === 4) {
        var passwordFromStore = await getPassword(password);
        passwordFromStore && setPasswordWasUsed(true);
        shadowUsedPassword();
        if (!passwordFromStore) {
          storePassword(password);
        }
      }
    })();
  }, [password]);

  const handlePasswordPress = (pswd: string) => {
    setPassword(pswd);
    if (pswd === '8336') {
      setIsPopupOpen(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.safe}>
        <ThemedView style={styles.digitButtonsContainer}>
          {
            passwordCompareList.map(pswd => {
              return <TouchableOpacity
                key={pswd}
                onPress={e => handlePasswordPress(pswd)}
                style={[
                  styles.digitButton,
                ]}
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
  },
  digitButtonText: {
    fontSize: 20,
    color: green,
  },
});

export default PasswordInput;
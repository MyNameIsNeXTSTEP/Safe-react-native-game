import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { passwordCompareList } from '@/constants';
import { green } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResultPopup from './ResultPopup';

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
const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordWasUsed, setPasswordWasUsed] = useState<boolean | undefined>(false);

  const showResult = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3700);
    setIsResultOpen(true);
    setTimeout(() => {
      setPassword('');
      setIsResultOpen(false);
      setPasswordWasUsed(false);
    }, 6000);
  }, [password]);

  const generateAttemptsText = useCallback(() => {
    var text = '';
    if (passwordWasUsed) {
      text = 'Этот пароль уже был использован';
    } else {
      text = 'К сожалению, данный пароль не подходит \u{1F641}';
    }
    return text;
  }, [passwordWasUsed]);

  // 8336 <- PRIZ!

  // useEffect(() => {
  //   ( async () => {
  //     if (password.length === 4) {
  //       setIsLoading(true);
  //       var passwordIsValid = passwordCompareList.includes(password);
  //       var passwordFromStore = await getPassword(password);
  //       var passwordFromStoreWasUsed = passwordFromStore?.includes(passwordFromStore);
  //       setPasswordWasUsed(passwordFromStoreWasUsed);

  //       showResult();
  //       if (passwordIsValid) {
  //         storePassword(password);
  //       }
  //     }
  //     if (password.length === 3) {
  //       setIsResultOpen(false);
  //     }
  //   })();
  // }, [password]);

  const handleDigitPress = (digit: string) => {
    if (password.length < 4) {
      setPassword(password + digit);
    }
  };

  return (
    <View style={styles.container}>
      <ResultPopup isOpen={true} isSuccess={true}/>
      <View style={styles.safe}>
        <ThemedView style={styles.digitButtonsContainer}>
          {
            passwordCompareList.map(pswd => {
              return <TouchableOpacity
                key={pswd}
                onPress={() => console.log(pswd)}
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

      {/* {isLoading
        ? <>
          <ThemedText style={styles.loader} type={'defaultSemiBold'}>
            Проводим космические вычисления...
          </ThemedText>
        </>
        : <ThemedText
          type='defaultSemiBold'
          style={false ? styles.sucessResult : styles.failureResult}
        > */}
          {/* {
        isResultOpen
        ? resultType
        ? isSuperPrize
        ? 'Поздравляем, вам удалось вскрыть сейф и заслужить СУПЕРПРИЗ !!! \u{1F44F} \u{1F38A}'
        : 'Ура, вы открыли приз, поздравляем ! \u{1F44F} \u{1F38A}'
        : generateAttemptsText()
        : null
        } */}
        {/* </ThemedText> */}
      {/* } */}
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
  maskedPasswordText: {
    fontSize: 24,
    marginBottom: 20,
    color: green,
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

  lastDigitsNumber: {
    width: 210,
    paddingLeft: 70,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  digitButtonText: {
    fontSize: 20,
    color: green,
  },
  eraseButtonText: {
    fontSize: 20,
    fontWeight: 500,
    color: green,
  },
  numberContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  numberSquare: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: 'darkgreen',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: green,
  },
  sucessResult: {
    color: green,
    fontSize: 20,
    marginTop: 36,
  },
  failureResult: {
    color: 'black',
    fontSize: 20,
    marginTop: 36,
  },
  loader: {
    marginTop: 36,
    color: green,
  },
  moreText: {
    color: green,
  }
});

export default PasswordInput;
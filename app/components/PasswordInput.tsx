import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
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

/**
 * @Note
 * Bad bad practice to use so much state hooks in one big component!
 * Leaved as is here for the sake of developing speed.
 * Better to decompose to several isolated pure components.
 */
const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultType, setResultType] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreText, setIsMoreText] = useState(false);
  const [passwordWasUsed, setPasswordWasUsed] = useState<boolean | undefined>(false);
  const [isSuperPrize, setIsSuperPrize] = useState(false);

  const showResult = useCallback(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3700);
    setTimeout(() => setIsMoreText(true), 1000);
    setIsResultOpen(true);
    setTimeout(() => {
      setPassword('');
      setIsResultOpen(false);
      setPasswordWasUsed(false);
      setIsSuperPrize(false);
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

  useEffect(() => {
    ( async () => {
      if (password.length === 4) {
        setIsLoading(true);
        setIsSuperPrize(password === '0567');
        var passwordIsValid = passwordCompareList.includes(password);
        var passwordFromStore = await getPassword(password);
        var passwordFromStoreWasUsed = passwordFromStore?.includes(passwordFromStore);
        setResultType(
          !passwordFromStoreWasUsed && passwordIsValid
        );
        setPasswordWasUsed(passwordFromStoreWasUsed);
        
        showResult();
        if (passwordIsValid) {
          storePassword(password);
        }
      }
      if (password.length === 3) {
        setIsResultOpen(false);
        setResultType(null);
      }
    })();
  }, [password]);

  const handleDigitPress = (digit: string) => {
    if (password.length < 4) {
      setPassword(password + digit);
    }
  };

  const handleErasePress = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1));
    }
  };

  const renderNumberSquares = () => {
    const squares = [];
    for (let i = 0; i < 4; i++) {
      squares.push(
        <View key={i} style={styles.numberSquare}>
          {password.length > i && <Text style={styles.numberText}>{password[i]}</Text>}
        </View>
      );
    }
    return squares;
  };

  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>{renderNumberSquares()}</View>
      <View style={styles.safe}>
        <ThemedView style={styles.digitButtonsContainer}>
          <TouchableOpacity
            key={1}
            onPress={() => handleDigitPress('1')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{1}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={2}
            onPress={() => handleDigitPress('2')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{2}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={3}
            onPress={() => handleDigitPress('3')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{3}</Text>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.digitButtonsContainer}>
          <TouchableOpacity
            key={4}
            onPress={() => handleDigitPress('4')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{4}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={5}
            onPress={() => handleDigitPress('5')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{5}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={6}
            onPress={() => handleDigitPress('6')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{6}</Text>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.digitButtonsContainer}>
          <TouchableOpacity
            key={7}
            onPress={() => handleDigitPress('7')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{7}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={8}
            onPress={() => handleDigitPress('8')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{8}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            key={9}
            onPress={() => handleDigitPress('9')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{9}</Text>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.lastDigitsNumber}>
          <TouchableOpacity
            key={0}
            onPress={() => handleDigitPress('0')}
            style={[
              styles.digitButton,
            ]}
          >
            <Text style={styles.digitButtonText}>{0}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleErasePress}
            style={[styles.digitButton]}
          >
            <Text style={styles.eraseButtonText}>
              {'<'}
            </Text>
          </TouchableOpacity>
        </ThemedView>

      </View>
      { isLoading
        ? <>
            <ThemedText style={styles.loader} type={'defaultSemiBold'}>
              Проводим космические вычисления...
            </ThemedText>
            <ThemedText style={styles.moreText} type={'defaultSemiBold'}>
              {isMoreText && '\nИ ещё минуточку...'}
            </ThemedText>
          </>
        : <ThemedText
            type='defaultSemiBold'
            style={resultType ? styles.sucessResult : styles.failureResult}
          >
            {
              isResultOpen
              ? resultType
                  ? isSuperPrize
                    ? 'Поздравляем, вам удалось вскрыть сейф и заслужить СУПЕРПРИЗ !!! \u{1F44F} \u{1F38A}'
                    : 'Ура, вы открыли приз, поздравляем ! \u{1F44F} \u{1F38A}'
                  : generateAttemptsText()
              : null
            }
          </ThemedText>   
      }
    </View>
  );
};
    
const styles = StyleSheet.create({
  safe: {
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
    display: 'flex',
    flexDirection: 'row',
    width: 210,
  },
  digitButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
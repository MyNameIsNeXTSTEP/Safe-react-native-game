import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

const passwordCompareList = [
  '1234',
  '0000',
];

const green = 'darkgreen';

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultType, setResultType] = useState<boolean | null>(null);

  useEffect(() => {
    if (password.length === 4) { // show result
      setIsResultOpen(true);
      setResultType(
        passwordCompareList.includes(password)
      );
    }
    if (password.length === 3) { // reset after erasing
      setIsResultOpen(false);
      setResultType(null);
    }
  }, [password])

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

  const renderDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleDigitPress(String(i))}
          style={[
            styles.digitButton,
          ]}
        >
          <Text style={styles.digitButtonText}>{i}</Text>
        </TouchableOpacity>
      );
    }
      digits.push(
        <TouchableOpacity
          key={0}
          onPress={() => handleDigitPress(String(0))}
          style={[
            styles.digitButton,
            styles.lastDigitsNumber 
          ]}
        >
          <Text style={styles.digitButtonText}>{0}</Text>
        </TouchableOpacity>
      );
    return digits;
  };

  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>{renderNumberSquares()}</View>
      <View style={styles.digitButtonsContainer}>
        {renderDigits()}
        <TouchableOpacity
          onPress={handleErasePress}
          style={[styles.digitButton, styles.eraseButton]}
        >
          <Text style={styles.eraseButtonText}>
            {'<'}
          </Text>
        </TouchableOpacity>
      </View>
      {
        isResultOpen &&
          <ThemedText
            type='defaultSemiBold'
            style={resultType ? styles.sucessResult : styles.failureResult}
          >
            {
              resultType
                ? 'Поздравляем, вы вскрыли сейф и заслужили приз!!! \u{1F44F} \u{1F38A}'
                : 'К сожалению пароль не верный, попробуйте ввести снова'
            }
          </ThemedText>
      }
    </View>
  );
};
    
const styles = StyleSheet.create({
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
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridRemplateRows: 'repeat(4, 1fr)',
    gridColumnGap: 0,
    gridRowGap: 0,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  digitButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'transparent',
    border: '2px solid darkgreen',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },

  lastDigitsNumber: {
    gridArea: '4 / 2 / 5 / 3',
  },
  eraseButton: {
    gridArea: '4 / 4 / 5 / 3',
    backgroundColor: 'transparent',
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
  }
});

export default PasswordInput;
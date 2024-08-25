import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

const passwordCompareList = [
  '1234',
  '0000',
]

const PasswordInput = ({ onPasswordEntered }: { onPasswordEntered: (passwrod: string) => void }) => {
  const [password, setPassword] = useState('');
  const [isResultOpen, setIsResultOpen] = useState(false);

  useEffect(() => {
    if (password.length === 4 && passwordCompareList.includes(password)) { // show result
      setIsResultOpen(true);
    }
    if (password.length === 3) { // reset after erasing
      setIsResultOpen(false);
    }
  }, [password])

  const handleDigitPress = (digit: string) => {
    if (password.length < 4) {
      setPassword(password + digit);
    }
    if (password.length === 4) {
      onPasswordEntered(password);
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
        isResultOpen && <ThemedText type='defaultSemiBold'>
          Result!
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
    color: 'white',
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
    border: '1px solid white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },

  lastDigitsNumber: {
    gridArea: '4 / 2 / 5 / 3',
  },
  eraseButton: {
    gridArea: '4 / 4 / 5 / 3',
    backgroundColor: 'white',
  },
  digitButtonText: {
    fontSize: 20,
    color: 'white',
  },
  eraseButtonText: {
    fontSize: 20,
    color: 'black',
  },

  numberContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  numberSquare: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  numberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PasswordInput;
import {
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useState } from 'react';

import Card from '../components/Card';
import ColorContainer from '../components/ColorContainer';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = ({ onStartGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [confirmedValue, setConfirmedValue] = useState('');

  const handleResetInput = () => {
    setEnteredValue('');
    setConfirmed(false);
    setConfirmedValue('');
  }

  const handleConfirmColor = (color) => () => {
    setConfirmed(true);
    setConfirmedValue(color);
    setEnteredValue('');
  }

  const handleStartGame = () => {
    onStartGame(confirmedValue);
  }

  let confirmedOutput = null;
  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>Tu selección</Text>
        <ColorContainer>{confirmedValue}</ColorContainer>
        <Button title="EMPEZAR JUEGO" color={Colors.primary} onPress={handleStartGame} />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={30}
        style={styles.screen}
      >
        <ScrollView>
          <Text style={styles.title}>Comenzar Juego</Text>
          <Card style={styles.inputContainer}>
            <Text>Elija un color</Text>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Rojo" onPress={handleConfirmColor('ROJO')} color={Colors.red} style={styles.button} />
              </View>
              <View style={styles.button}>
                <Button title="Negro" onPress={handleConfirmColor('NEGRO')} color={Colors.black} style={styles.button} />
              </View>
            </View>            
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Elegir Nuevamente" onPress={handleResetInput} color={Colors.accent} style={styles.button} />
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '90%',
    padding: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  input: {
    width: 100,
  },
  button: {
    width: Dimensions.get('window').width / 3,
  },
  summaryContainer: {
    marginVertical: 10,
    padding: 10,
  }
});

export default StartGameScreen;
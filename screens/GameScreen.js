import { Alert, Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

import Card from '../components/Card';
import ColorContainer from '../components/ColorContainer';
import Colors from '../constants/colors';

const generateRandomBetween = (exclude) => {
  const min = Math.ceil(1)
  const max = Math.floor(100)
  const random = Math.floor(Math.random() * (max - min) + min)

  if (random % 2 == 0){
    return 'ROJO';
  }else{
    return 'NEGRO';
  }
}

const seeResultGame = (userOption, currentGuess) => {
  if (userOption == currentGuess){
    return 'HAS GANADO!';
  }else{
    return 'LO LAMENTO, INTENTA NUEVAMENTE!';
  }
}

const GameScreen = ({ onEndGame, onGameOver, userOption }) => {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(userOption));
  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [resultGame, setResultGame] = useState(seeResultGame(userOption, currentGuess));

  const handleEndGame = () => {
    onEndGame(0)
  }

  useEffect(() => {
    if (currentGuess === userOption) onGameOver(rounds);
  }, [currentGuess, userOption, onGameOver]);

  return (
    <View style={styles.screen}>
      <Text>Resultado de la Ruleta</Text>
      <ColorContainer>{currentGuess}</ColorContainer>
      <Text>Usted selecciono</Text>
      <ColorContainer>{userOption}</ColorContainer>
      <Card style={styles.buttonContainer}>      
        <Text>{resultGame}</Text>
      </Card>
      <Button title="TERMINAR" onPress={handleEndGame} color={Colors.accent} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    padding: 10,
    width: 300,
    maxWidth: '80%',
    marginBottom: 10,
  }
});

export default GameScreen;
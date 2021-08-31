import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import AppLoading from 'expo-app-loading';
import GameScreen from './screens/GameScreen';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import { useFonts } from 'expo-font';

export default function App() {
  const [userColor, setuserColor] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })

  const handleGameOver = (rounds) => {
    setGuessRounds(rounds);
  }

  const handleRestart = () => {
    setuserColor(null);
    setGuessRounds(0)
  }

  const handleStartGame = (selectedColor) => {
    setuserColor(selectedColor);
    setGuessRounds(0);
  }

  let content = <StartGameScreen onStartGame={handleStartGame} onGameOver={() => { }} />;

  if (userColor && guessRounds <= 0) {
    content = <GameScreen onEndGame={handleRestart} userOption={userColor} onGameOver={handleGameOver} />
  }

  if (!dataLoaded) {
    return <AppLoading />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Ruleta" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});

import React, { useState, useRef } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

const pomodor = 10; //10 sec

function formatSeconds(seconds) {
  if (seconds < 60) {
    return `${seconds} seg`;
  }

  return `${Math.floor(seconds / 60)} min`;
}

export default function Timer() {
  const navigation = useNavigation();

  const timerRef = useRef();

  const [timerEnabled, setTimerEnabled] = useState(false);
  const [secondsEllapsed, setSecondsEllapsed] = useState(0);

  function timerController(){
    if (secondsEllapsed == pomodor) {
      toggleTimer()
      Alert.alert(
        'Pomodora app',
        'The time has ended',
        [
          { text: 'OK', onPress: () => navigation.navigate("Welcome") },
        ],
        { cancelable: false }
      );
      
      return "Done"
    } else {
      return formatSeconds(secondsEllapsed)
    }
  }

  function toggleTimer() {
    if (timerEnabled) {
      clearInterval(timerRef.current);

      setTimerEnabled(false);
    } else {
      timerRef.current = setInterval(() => {
        setSecondsEllapsed((state) => state + 1);
      }, 1000);

      setTimerEnabled(true);
    }
  }

  return (
    <LinearGradient colors={["#E7F3FE", "#9ABEE0"]} style={styles.container}>
      <Text style={styles.title}>Pomodora</Text>

      <AnimatedCircularProgress
        size={300}
        width={12}
        fill={(secondsEllapsed * 100) / pomodor}
        tintColor="#75A1DE"
        rotation={0}
        backgroundColor="#fff"
      >
        {() => (
          <Text style={styles.progress}>{timerController()}</Text>
        )}
      </AnimatedCircularProgress>

      <TouchableOpacity style={styles.button} onPress={toggleTimer}>
        <MaterialIcons
          name={timerEnabled ? "pause" : "play-arrow"}
          size={32}
          color="#FFF"
        />
      </TouchableOpacity>
    </LinearGradient>
  );
}

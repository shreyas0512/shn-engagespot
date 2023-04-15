import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Sensors from "expo-sensors";
const { Accelerometer } = Sensors;
export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    if (data.x > 3 || data.y > 3 || data.z > 3) {
      setDetected(true);
      console.log("Fall Detected!");
    }
  }, [data]);

  return (
    <View className="flex w-screen h-screen items-center justify-center bg-white">
      <View className="w-fill h-fill px-2  bg-red-200 rounded-md shadow-2xl">
        <Text className="text-2xl font-bold text-center text-gray-800">
          x:{data.x} y:{data.y} z:{data.z}
        </Text>
      </View>
      {detected && (
        <Text className="text-2xl font-bold text-center text-gray-800">
          Fall Detected!
        </Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

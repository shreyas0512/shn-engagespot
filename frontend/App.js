import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import * as Sensors from "expo-sensors";
import Login from "./Components/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { Accelerometer } = Sensors;
export default function App() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);
  const [emailready, setEmailready] = useState(false);

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
  const [mail, setMail] = useState("");
  async function fetchmail() {
    try {
      console.log("fetchmail is running");
      const value = await AsyncStorage.getItem("email");
      if (value !== null) {
        // We have data!!
        console.log("data found");
        console.log(value);
        setMail(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  useEffect(() => {
    //fetchmail();
    fetchmail();
    console.log(mail, ",aasd");
    console.log("useeffect is running", emailready);
  }, [emailready]);

  const sendmail = async () => {
    try {
      const response = await fetch("http://localhost:3000/sentmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
        }),
      });
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      data.x > 4 ||
      data.y > 4 ||
      data.z > 4 ||
      data.x < -4 ||
      data.y < -4 ||
      data.z < -4
    ) {
      setDetected(true);
      sendmail();
      console.log("Fall Detecsted!");
    }
  }, [data]);
  useEffect(() => {
    if (detected) {
      setTimeout(() => {
        setDetected(false);
      }, 3000);
    }
  }, [detected]);

  return (
    <View className="flex-1 w-screen h-screen items-center justify-center bg-white">
      <StatusBar style="light" />
      <View className="w-fill h-fill px-2  bg-red-200 rounded-md shadow-2xl">
        {/* <Text className="text-2xl font-bold text-center text-gray-800">
          x:{data.x} y:{data.y} z:{data.z}
        </Text> */}
      </View>
      <Login emailready={emailready} setEmailready={setEmailready} />
      {detected && (
        <Text className="text-2xl font-bold text-center text-gray-800">
          Fall Detected!
        </Text>
      )}
    </View>
  );
}

import React from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import bg from "../assets/bg.svg";
import { StatusBar } from "expo-status-bar";
import englogo from "../assets/englogo.png";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = (props) => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState(false);

  //post to an api at localhost:3000/adduser with the mail as body
  const add = async () => {
    try {
      //store data in async storage
      await AsyncStorage.setItem("email", mail);
      const data123 = await AsyncStorage.getItem("email");
      console.log("data stored", data123);
      props.setEmailready(true);
      const response = await fetch("http://192.168.1.7:3000/adduser", {
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

  //set mail to the value stored in async storage
  // const fetchemail = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("email");
  //     if (value !== null) {
  //       // We have data!!
  //       console.log("data found");
  //       console.log(value);
  //       setMail(value);
  //     } else {
  //       console.log("no data found");
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // };

  function useradded() {
    console.log("user added");
    setUser(true);
  }

  return (
    <View className="flex-1 flex-col items-center justify-center w-screen min-h-screen h-[100%]  bg-[#370c2b]">
      <Text className="text-3xl text-white mb-48 font-black">
        Fall Detection
      </Text>
      <StatusBar style="light" />
      <Image source={englogo} className="w-32 h-32 -mt-32" />
      <View className="w-10/12 items-center justify-center bg-[#55sf8] py-8 rounded-md shadow-lg ">
        {!user ? (
          <TextInput
            editable
            placeholder="Email ID"
            numberOfLines={1}
            placeholderTextColor={"#ffffff"}
            maxLength={30}
            value={mail}
            onChangeText={(mail) => {
              setMail(mail);
            }}
            className=" font-bold text-white bg-[#370c2b] border-solid border-white border rounded-md w-5/6 py-1 px-2 my-2"
          />
        ) : (
          ""
        )}

        {!user ? (
          <TouchableOpacity
            className="bg-white w-4/6 py-2 px-2 my-2 -mb-16 mt-16 rounded-md shadow-lg"
            onPress={() => {
              add();
              // fetchemail();
              useradded();
            }}
          >
            <Text className="text-[#421A2C] font-black text-center text-lg">
              Login
            </Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-lg text-green-300 text-center ">
            User added Succesfully! Fall Detection Enabled!
          </Text>
        )}
      </View>
    </View>
  );
};

export default Login;

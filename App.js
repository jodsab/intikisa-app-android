import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import 'react-native-gesture-handler';

import Pagina from "./Pagina";

export default function App() {
  return (
    <View style={styles.container}>
        <Pagina />

      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
});

import React, { Component } from "react";
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  TouchableOpacity, // Pressable container
  View // Container component
} from "react-native";

export default class Button extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    borderRadius: 50, // Rounded border
    borderWidth: 2, // 2 point border widht
    //borderColor: "#128a08", // White colored border
    //borderColor: '#02aab0',
    borderColor: '#21B6A8',
    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 10 // Vertical padding

  },
  // Button text
  text: {
    //color: "#128a08",
    //color: '#02aab0',
    color: '#21B6A8',
    fontWeight: "bold",
    fontFamily: "Avenir"
  }
});

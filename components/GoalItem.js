import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// takes props because we want to get the item value  in app.js
const GoalItem = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItems}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItems: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    width: 235,
  },
});

export default GoalItem;

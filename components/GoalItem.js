import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import GoalInput from "./GoalInput";
import GoalEdit from "./GoalEdit";



// takes props because we want to get the item value  in app.js
const GoalItem = (props) => {
  
  const [isEditMode, setIsEditMode] = useState(false);

  const cancelItemAddtionHandler = () => {
    setIsEditMode(false);
  };


  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItems}>
        <View>
          <Text>{props.title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Edit' color='#7c7c7d' onPress={() => setIsEditMode(true)} />
          </View>
          <View style={styles.button}>
            <Button title='Star' color='#dbc60d'/>
          </View>
        </View>
        <GoalEdit
              visible={isEditMode}
              // onAddGoal={addListItemHandler}
              onCancel={cancelItemAddtionHandler}
            />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItems: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderColor: "black",
    borderWidth: 2,
    width: 370,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    //flex: 1,
    marginHorizontal: 2,
  }
});

export default GoalItem;

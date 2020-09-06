import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Text } from "react-native";

const GoalEdit = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [updatedGoal, setUpdatedGoal] = useState(enteredGoal)

  /*
  calls the function from useState to update the text
  with what is entered in the text input
  */
  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal("");
  };

  

  return (
    <Modal visible={props.visible} animationType="slide">
        <View style={styles.editHeading}>
            <Text>
                EDIT
            </Text>
        </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Edit item"
          style={styles.textContainer}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" color="#d4470f" onPress={props.onCancel} />
          </View>
          <View style={styles.button}>
            <Button title="Add" color='#07a629' onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Star" color='#dbc60d' onPress={addGoalHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10
  },
  textContainer: {
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    width: 350,
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  button: {
    width: 80,
    margin: 10    
  },
  editHeading: {
      flexDirection: 'row',
      backgroundColor: '#babab6',
      paddingTop: 20,
      paddingBottom: 20, 
      marginTop: 0,
      justifyContent: "center",
      fontSize: 10,
  }
});

export default GoalEdit;

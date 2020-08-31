// useState is a react hook to manage states
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button
} from "react-native";

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  /*
  uses array destructing to return a value and a function to update the value
  string passed in the useState is the default value
  for example, shen the setEnteredGoal function is called it will add that value to enteredGoal
  */
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  /*
  updates the courseGoals state by setting it to the
  current content of that state (whatever is in the array) and also
  the new goal we have just entered
  */
  const addGoalHandler = (goalTitle) => {
    setCourseGoals(currentGoals => [
      ...currentGoals, 
      { id: Math.random().toString(), value: goalTitle } // this creates a unique key for each list item in the flatlist. we access the value when we render the item.
    ]);
    setIsAddMode(false);
  };

  /*
  updates the state by takimg the vurrent goals as it is and using the filter
  method to create a new array if each goals id does not match the goalID (the one 
    we want to remove)
  */
  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    })
  }

  const cancelGoalAddtionHandler = () => {
    setIsAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={cancelGoalAddtionHandler}/> 
      <FlatList //used instead of scroll view when you don't know how long a list will be. better for performance
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },


});

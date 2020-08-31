// useState is a react hook to manage states
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  ScrollView,
  Text,
  Dimensions,
} from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

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
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }, // this creates a unique key for each list item in the flatlist. we access the value when we render the item.
    ]);
    setIsAddMode(false);
  };

  /*
  updates the state by takimg the vurrent goals as it is and using the filter
  method to create a new array if each goals id does not match the goalID (the one 
    we want to remove)
  */
  const removeGoalHandler = (goalId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoalAddtionHandler = () => {
    setIsAddMode(false);
  };

  const mainPageTitle = "What's On Your List?";
  const { width, height } = Dimensions.get("window");

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      paddingTop: 50,
      paddingLeft: 25,
      paddingRight: 25,
      backgroundColor: '#f2f2f2',
      borderColor: '#e6e6e6',
      borderWidth: 6,
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
  
      //padding: 30,
    },
    slider: {
     height: 0.8 * height,
    },
    title: {
      flex: 1,
      paddingTop: 150,
      paddingLeft: 25,
      color: "#3333ff",
      fontSize: 30,
      fontWeight: "bold",

    }
  });

  return (
    <View style={styles.screen}>
      <View style={styles.slider}>
        <ScrollView horizontal snapToInterval={width} decelerationRate="fast" showsHorizontalScrollIndicator={false} bounces={false}>
          <View style={{ width }}>
            <Text style={styles.title}>
              {mainPageTitle}
            </Text>
          </View>
          <View style={{ width }}>
            <Button title="Add New List Item" onPress={() => setIsAddMode(true)}/>
            <GoalInput
              visible={isAddMode}
              onAddGoal={addGoalHandler}
              onCancel={cancelGoalAddtionHandler}
            />
            <FlatList //used instead of scroll view when you don't know how long a list will be. better for performance
              keyExtractor={(item, index) => item.id}
              data={courseGoals}
              renderItem={(itemData) => (
                <GoalItem
                  id={itemData.item.id}
                  onDelete={removeGoalHandler}
                  title={itemData.item.value}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}



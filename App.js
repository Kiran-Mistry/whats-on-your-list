// useState is a react hook to manage states in a function component
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
  Uses array destructing to return a value and a function to update the value.
  The param passed in the useState is the default value
  for example, when the setEnteredGoal function is called it will add that value to enteredGoal
  */
  const [listItem, setListItem] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  /*
  updates the courseGoals state by setting it to the
  current content of that state (whatever is in the array) and also
  the new goal we have just entered
  */
  const addListItemHandler = (listItemTitle) => {
    setListItem((currentListItems) => [
      ...currentListItems,
      { id: Math.random().toString(), value: listItemTitle }, // this creates a unique key for each list item in the flatlist. we access the value when we render the item.
    ]);
    setIsAddMode(false);
  };

  /*
  updates the state by takimg the vurrent goals as it is and using the filter
  method to create a new array if each goals id does not match the goalID (the one 
    we want to remove)
  */
  const removeListItemHandler = (listItemId) => {
    setListItem((currentListItems) => {
      return currentListItems.filter((item) => item.id !== listItemId);
    });
  };

  const cancelItemAddtionHandler = () => {
    setIsAddMode(false);
  };

  const mainPageTitle = "What's On Your List?";
  const topItems = "Your Top 3 list items:";
  const { width, height } = Dimensions.get("window");

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: "white",
    },
    slider: {
      height: 0.75 * height,
      backgroundColor: "#F8F8F8",
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      borderBottomRightRadius: 125,
    },
    title: {
      flex: 1,
      paddingTop: 150,
      paddingLeft: 55,
      color: "black",
      fontSize: 40,
      fontFamily: "sans-serif-thin",
    },
    footer: {
      flex: 1,
    },
  });

  return (
    <View style={styles.screen}>
      <View style={styles.slider}>
        <ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <View style={{ width }}>
            <Text style={styles.title}>{mainPageTitle}</Text>
          </View>
          <View style={{ width }}>
            <View style={{ paddingTop: 40 }}>
              <Button
                title="Add New List Item"
                onPress={() => setIsAddMode(true)}
                color = '#66a5e3'
              />
            </View>
            <GoalInput
              visible={isAddMode}
              onAddGoal={addListItemHandler}
              onCancel={cancelItemAddtionHandler}
            />
            <FlatList style={{paddingLeft: 10}}//used instead of scroll view when you don't know how long a list will be. better for performance
              keyExtractor={(item, index) => item.id}
              data={listItem}
              renderItem={(itemData) => (
                <GoalItem
                  id={itemData.item.id}
                  onDelete={removeListItemHandler}
                  title={itemData.item.value}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
          <View style={styles.footer}>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "#F5F5F5",
              }}
            />

            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                borderTopLeftRadius: 125,
              }}
            />
          </View>
    </View>
  );
};
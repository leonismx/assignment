import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectStepsTaken } from './slices/gameSlice';

interface HeaderProps {
  restartBtnTapped: () => void;
}

export const StepsComponent = () => {
  const steps = useSelector(selectStepsTaken);

  return (
    <Text style={styles.stepsTextStyle}>
      STEPS:<Text style={styles.stepsNumberStyle}> {steps}</Text>
    </Text>
  );
};

const Header = (props: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Button title="Restart" onPress={props.restartBtnTapped}></Button>
      <StepsComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  stepsTextStyle: {
    fontSize: 20,
    textAlignVertical: 'center',
  },
  stepsNumberStyle: {
    color: 'skyblue',
    fontSize: 25,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
  },
});

export default Header;

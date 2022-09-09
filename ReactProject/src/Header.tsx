import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectStepsTaken } from './slices/gameSlice';

interface HeaderProps {
  restartBtnTapped: () => void;
}

const StepsComponent = () => {
  const steps = useSelector(selectStepsTaken);

  return (
    <Text style={{ fontSize: 20 }}>
      STEPS:
      <Text style={{ color: 'skyblue', fontSize: 25, fontWeight: 'bold' }}> {steps}</Text>{' '}
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
  },
});

export default Header;

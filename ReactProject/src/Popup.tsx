import { useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { selectIfGameEnded } from './slices/gameSlice';

export interface PopupProps {
  callBack: () => void;
}

const Popup = (props: PopupProps) => {
  const gameCompleted = useSelector(selectIfGameEnded);

  const showAlert = () =>
    Alert.alert('Congratulations!', 'You have won!', [
      {
        text: 'OK',
        onPress: () => {
          props.callBack();
        },
        style: 'cancel',
      },
    ]);

  useEffect(() => {
    if (gameCompleted) {
      //set a delay here for better ux
      setTimeout(() => {
        showAlert();
      }, 600);
    }
  }, [gameCompleted]);

  return null;
};

export default Popup;

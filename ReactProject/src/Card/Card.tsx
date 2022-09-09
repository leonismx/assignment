import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CARD_PAIRS_VALUE } from '../App';
import { Card } from '../slices/gameSlice';
import { getHeight, getWidth } from '../Utils/dimension';

export interface CardProps {
  card: Card;
  cardIndex: number;
  disable: boolean;
  disableAllCards: () => void;
  cardTapped: (cardIndex: number) => void;
  clearFlippedCards: (cardIndex: number) => void;
}

const CardComponent = (props: CardProps) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  let flipRotation = 0;
  flipAnimation.addListener(({ value }) => {
    flipRotation = value;
  });

  useEffect(() => {
    if (props.card.opened === false && props.card.reset) {
      props.disableAllCards();

      flipRotation = 180;
      setTimeout(() => {
        flipCard();
      }, 1000);

      // set this timer a tad longer when flipping back the unmatched cards else on quick succession taps user can mess up the states
      setTimeout(() => {
        props.clearFlippedCards(props.cardIndex);
      }, 1100);
    }
  }, [props.card.opened, props.card.reset]);

  useEffect(() => {
    if (props.card.restart) {
      flipRotation = 180;
      flipCard();
    }
  }, [props.card.restart]);

  const flipCard = () => {
    if (flipRotation >= 90) {
      Animated.spring(flipAnimation, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnimation, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const flipToFrontStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const flipToBackStyle = {
    transform: [
      {
        rotateY: flipAnimation.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <TouchableOpacity
      disabled={props.card.opened || props.disable}
      onPress={() => {
        props.disableAllCards();
        flipCard();
        props.cardTapped(props.cardIndex);
      }}
      style={[styles.cardContainer, { width: getWidth(CARD_PAIRS_VALUE), height: getHeight() }]}
    >
      <Animated.View style={[styles.card, flipToBackStyle]}>
        <Text style={{ fontSize: 20 }}>{props.card.value}</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.cardBackFace, flipToFrontStyle]}>
        <Text style={{ fontSize: 20 }}>?</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    borderRadius: 8,
  },
  card: {
    borderWidth: 0.5,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backfaceVisibility: 'hidden',
  },
  cardBackFace: {
    backgroundColor: 'skyblue',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  cardSelected: {
    backgroundColor: 'darkgreen',
  },
});

export default CardComponent;

package com.example.kotlinproject.viewmodels

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.kotlinproject.models.Card
import com.example.kotlinproject.utils.Utils

interface Delegation {
    fun showCards(card: Card, position: Int)
    fun hideCards(cards: MutableList<Card>, positions: MutableList<Int>)
    fun gameEnded(ended: Boolean, cards: List<Card>)
}

class GameViewModel() : ViewModel() {

    private val flippedCards: MutableList<Card> = mutableListOf()
    private val pairedCards: MutableList<Card> = mutableListOf()
    private val positionOfCard: MutableList<Int> = mutableListOf()
    var finalCards: MutableList<Card> = mutableListOf()
    var delegation: Delegation? = null
    var gameSteps: Int = 0
    val gameStepsLiveData: MutableLiveData<Int> by lazy {
        MutableLiveData<Int>(0)
    }

    fun incrementGameStep() {
        gameSteps += 1
        gameStepsLiveData.setValue(gameSteps)
    }

    fun generateRandomCards(): List<Card> {
        val cards: MutableList<Card> = mutableListOf()
        val numbers: MutableSet<Int> = Utils.randomNumberGenerator(1, 100, 3)
        numbers.map { num ->
            cards.add(Card(Math.random(), num, false))
        }
        val duplicatedCards: MutableList<Card> = mutableListOf()
        cards.map { card ->
            duplicatedCards.add(card.copy())
        }
        finalCards = cards.plus(duplicatedCards).shuffled() as MutableList<Card>
        return finalCards
    }

    fun didSelectCard( position: Int) {

        delegation?.showCards(finalCards[position], position)

        flippedCards.add(finalCards[position])
        positionOfCard.add(position)
        if (flippedCards.size == 2) {

            if (flippedCards.first().value != flippedCards.last().value) {
                delegation?.hideCards(flippedCards, positionOfCard)

            } else {
                pairedCards.add(finalCards[position])
            }
            flippedCards.clear()
            positionOfCard.clear()
        }

        if (pairedCards.size == 3) {
            delegation?.gameEnded(true, finalCards)
            gameSteps = 0
            gameStepsLiveData.setValue(0)
        }
    }

    fun restartGame() {
        flippedCards.clear()
        pairedCards.clear()
        positionOfCard.clear()
        finalCards.clear()
        gameSteps = 0
        gameStepsLiveData.setValue(0)
    }
}
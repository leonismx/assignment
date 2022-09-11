package com.example.kotlinproject.viewmodels

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.kotlinproject.models.Card
import com.example.kotlinproject.utils.Utils

class Constants {
    companion object {
        const val CARD_PAIRS_VALUE = 4
    }
}

interface Delegation {
    fun showCards(card: Card, position: Int)
    fun hideCards(cards: MutableList<Card>, positions: MutableList<Int>)
    fun gameEnded(ended: Boolean, cards: List<Card>)
}

class GameViewModel : ViewModel() {

    private val flippedCards: MutableList<Card> = mutableListOf()
    private val pairedCards: MutableList<Card> = mutableListOf()
    private val positionOfCard: MutableList<Int> = mutableListOf()
    private var finalCards: MutableList<Card> = mutableListOf()
    var delegation: Delegation? = null
    private var gameSteps: Int = 0
    val gameStepsLiveData: MutableLiveData<Int> by lazy {
        MutableLiveData<Int>(0)
    }

    fun incrementGameStep() {
        gameSteps += 1
        gameStepsLiveData.value = gameSteps
    }

    fun generateRandomCards(): List<Card> {
        val cards: MutableList<Card> = mutableListOf()
        val numbers: MutableSet<Int> = Utils.randomNumberGenerator(1, 100, Constants.CARD_PAIRS_VALUE)
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

        if (pairedCards.size == Constants.CARD_PAIRS_VALUE) {
            delegation?.gameEnded(true, finalCards)
            gameSteps = 0
            gameStepsLiveData.value = 0
        }
    }

    fun restartGame() {
        flippedCards.clear()
        pairedCards.clear()
        positionOfCard.clear()
        finalCards.clear()
        gameSteps = 0
        gameStepsLiveData.value = 0
    }
}
package com.example.kotlinproject.viewmodels

import android.view.View
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.kotlinproject.Card
import com.example.kotlinproject.utils.Utils
import java.util.*
import kotlin.concurrent.schedule

interface Delegation {
    fun showCards(card:Card, position: Int)
    fun hideCards(cards:MutableList<Card>, positions: MutableList<Int>)
    fun gameEnded(ended:Boolean,  cards: List<Card>)
}

class GameViewModel(): ViewModel()  {
    private val flippedCards: MutableList<Card> = mutableListOf()
    private val pairedCards: MutableList<Card> = mutableListOf()
    private val positionOfCard: MutableList<Int> = mutableListOf()
    private var finalCards: List<Card> = listOf()

    var delegation: Delegation? = null

    var gameSteps: Int = 0
    val gameStepsLiveData: MutableLiveData<Int> by lazy {
        MutableLiveData<Int>(0)
    }

    fun incrementGameStep(){

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
        finalCards = cards.plus(duplicatedCards).shuffled()
        return finalCards
    }

    fun didSelectCard(card:Card, position: Int){
    //delegate back to animate card
//        delegation?.onScannedCreditCard(mutableListOf(card), itemView)

        delegation?.showCards(card, position)

        flippedCards.add(card)
        positionOfCard.add(position)
        if(flippedCards.size == 2){

            if(flippedCards.first().value != flippedCards.last().value){
                //delegate back to main activity and hide cards
        println(flippedCards)
                println(positionOfCard)

                    delegation?.hideCards(flippedCards,positionOfCard)



            }else{
                pairedCards.add(card)
            }
            flippedCards.clear()
            positionOfCard.clear()
        }

        if(pairedCards.size == 3){
        println(finalCards)
            delegation?.gameEnded(true,finalCards)
            gameStepsLiveData.setValue(0)
        }

    }

    fun startGame(){
        generateRandomCards()

    }

}
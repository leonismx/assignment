package com.example.kotlinproject

import android.animation.AnimatorInflater
import android.animation.AnimatorSet
import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.DialogInterface
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import com.example.kotlinproject.viewmodels.Delegation
import com.example.kotlinproject.viewmodels.GameViewModel
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.android.synthetic.main.grid_view.view.*
import java.util.*
import kotlin.concurrent.schedule

class MainActivity : AppCompatActivity(), Delegation {

    private lateinit var gameViewModel: GameViewModel

    private val positiveButtonClick = { dialog: DialogInterface, _: Int ->
        println("run restart")
    }

    @SuppressLint("SetTextI18n")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        gameViewModel = ViewModelProvider(this)[GameViewModel::class.java]
        gameViewModel.delegation = this

        val adapter = CardItemAdapter(gameViewModel.generateRandomCards())
        val cardGridLayout = GridLayoutManager(this,3)

        cardItems.layoutManager = cardGridLayout
        cardItems.adapter = adapter

        adapter.onItemClick = {
            card, itemView, position ->

            gameViewModel.incrementGameStep()
            gameViewModel.didSelectCard(card, position)
        }

        val stepsObserver = Observer<Int> { steps ->
            gameStepsTextView.text = "Steps: $steps"
        }

        gameViewModel.gameStepsLiveData.observe(this, stepsObserver)
    }

    private fun animateCard (itemView: View, card:Card){
        val scale = applicationContext.resources.displayMetrics.density
        val frontAnim = AnimatorInflater.loadAnimator(applicationContext, R.animator.front_card_style_animator) as AnimatorSet
        val backAnim = AnimatorInflater.loadAnimator(applicationContext, R.animator.back_card_style_animator) as AnimatorSet
        val front = itemView.card_front
        val back = itemView.card_back

        front.cameraDistance = 10000 * scale
        back.cameraDistance = 10000 * scale

        if(!card.shown){
            frontAnim.setTarget(front);
            backAnim.setTarget(back);
            frontAnim.start()
            backAnim.start()
            card.shown = true
        }
        else {
            frontAnim.setTarget(back)
            backAnim.setTarget(front)
            backAnim.start()
            frontAnim.start()
            card.shown = false
        }
    }


    override fun showCards(card: Card, position: Int) {
        val itemView = cardItems.findViewHolderForAdapterPosition(position)?.itemView;
        if (itemView != null) {
            runOnUiThread {
                animateCard(itemView, card)
            }
        }
    }

    override fun hideCards(cards: MutableList<Card>, positions: MutableList<Int>) {

        val freezeCards = cards.toList()
        val freezePosition = positions.toList()
        Timer().schedule(1000) {
            freezePosition.mapIndexed { index, position ->
                val itemView = cardItems.findViewHolderForAdapterPosition(position)?.itemView;
                if (itemView != null) {
                    runOnUiThread {
                    animateCard(itemView, freezeCards[index])
                    }
                }
            }
        }
    }

    override fun gameEnded(ended: Boolean, cards: List<Card>) {

        if(ended){
            val builder = AlertDialog.Builder(this)
            with(builder)
            {
                setTitle("Congratulations!")
                setMessage("you have beaten the game!")
                setPositiveButton("OK", DialogInterface.OnClickListener(function = positiveButtonClick))
                show()
            }
            Timer().schedule(1000) {
                cards.mapIndexed { index, card ->
                    val itemView = cardItems.findViewHolderForAdapterPosition(index)?.itemView;
                    if (itemView != null) {
                        runOnUiThread {
                            animateCard(itemView, card)
                        }
                    }
                }
            }
        }
    }
}
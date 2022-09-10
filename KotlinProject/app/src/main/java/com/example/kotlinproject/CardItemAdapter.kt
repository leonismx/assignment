package com.example.kotlinproject

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.grid_view.view.*

class CardItemAdapter(private val cards: List<Card>): RecyclerView.Adapter<CardItemAdapter.CardViewHolder>() {

    lateinit var onItemClick: (Card, View, Int) -> Unit

    inner class CardViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val backCardTextView: TextView = itemView.card_back

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CardViewHolder{
        val view = LayoutInflater.from(parent.context).inflate(R.layout.grid_view, parent, false)
        return CardViewHolder(view)
    }

    override fun onBindViewHolder(holder: CardViewHolder, position: Int) {
        val card = cards[position]
        holder.backCardTextView.text = card.value.toString()
        holder.itemView.setOnClickListener {
            onItemClick.invoke(card, holder.itemView, position)
        }
    }

    override fun getItemCount(): Int {
        return cards.size
    }

}


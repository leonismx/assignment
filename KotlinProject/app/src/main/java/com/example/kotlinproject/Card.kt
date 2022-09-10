package com.example.kotlinproject

data class Card(
    var id: Double,
    var value: Int,
    var shown: Boolean,
){

fun copy(): Card {
    return Card(this.id,this.value,this.shown)
}


}
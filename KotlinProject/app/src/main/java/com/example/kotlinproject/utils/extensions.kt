package com.example.kotlinproject.utils

object Utils {

    fun randomNumberGenerator(min: Int, max: Int, count: Int) : MutableSet<Int> {

        val set: MutableSet<Int> = mutableSetOf()

        while (set.size < count) {
            set.add((min..max).random())
        }

        return set
    }
}
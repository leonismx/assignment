//
//  Card.swift
//  swiftProject
//
//  Created by Leon Ng on 8/9/22.
//
import UIKit

class Card {
    
    var id: String
    var shown: Bool = false
    var value: Int
    
    static var cards = [Card]()

    init(card: Card) {
        self.id = card.id
        self.shown = card.shown
        self.value = card.value
    }
    
    init(value: Int) {
        self.id = NSUUID().uuidString
        self.shown = false
        self.value = value
    }
        
    func copy() -> Card {
        return Card(card: self)
    }
}


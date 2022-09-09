//
//  GameBoardViewModel.swift
//  swiftProject
//
//  Created by Leon Ng on 8/9/22.
//

import Foundation
import UIKit


protocol GameBoardViewModelProtocolDelegate {
    
    func showCards(cards: [Card])
    func hideCards(cards:[Card])
    func stepsTaken(steps:Int)
    func showAlert(show:Bool)
}

class GameBoardViewModel: NSObject {
    let CARD_PAIRS_VALUE = 3
    
    var items: [Card] = [Card]()
    var cardsPaired: [Card] = [Card]()
    var gameSteps: Int = 0
    private var flippedCards:[Card] = [Card]()
    var delegate: GameBoardViewModelProtocolDelegate?
    
    override init() {
        super.init()
        restartGame()
    }
    
    func flipBackAllcards() {
        
        var arrayOfCardsToFlipBackInPosition:[Card] = []
        for card in self.items {
            if(card.shown){
                arrayOfCardsToFlipBackInPosition.append(card)
            }
        }
        
        self.delegate?.hideCards(cards: arrayOfCardsToFlipBackInPosition)
    }

    private func resetStepsScoreBoard() {
        gameSteps = 0
        self.delegate?.stepsTaken(steps: self.gameSteps)
    }
    
    func restartGame() {
        
        flipBackAllcards()
        resetStepsScoreBoard()
        
        self.items.removeAll()
        self.flippedCards.removeAll()
        self.cardsPaired.removeAll()
        
        let numbers = Int.generateRandomUniqueNumbers(min: 1, max: 100, count: CARD_PAIRS_VALUE)
        var copiedCards = Array<Card>()
        let cards = numbers.map { num -> Card in
            return Card(value: num)
        }
        
        for card in cards {
            copiedCards.append(card.copy())
        }
        copiedCards.append(contentsOf: cards)
        self.items = copiedCards.shuffled()
    }
    
    func didSelectCardAtIndex(card:Card?){

        guard let card = card else { return }

        delegate?.showCards(cards: [card])
        
        self.gameSteps += 1
        self.delegate?.stepsTaken(steps: self.gameSteps)
        
        self.flippedCards.append(card)
        
        if(self.flippedCards.count == 2){
            
            let reference = self.flippedCards
            
            if(self.flippedCards.first?.value != self.flippedCards.last?.value){
                
                let delayTime = DispatchTime.now() + 1.0
                DispatchQueue.main.asyncAfter(deadline: delayTime) {
                    self.delegate?.hideCards(cards: [reference[0], reference[1]])}
                
            }else{
                self.cardsPaired.append(card)
            }
            
            self.flippedCards.removeAll()
        }
        
        if(self.cardsPaired.count == CARD_PAIRS_VALUE){
            // all cards matched
            self.delegate?.showAlert(show: true)
        }
    }
    
    func indexForCard(card: Card) -> Int? {
        for index in 0...items.count-1 {
            if card === items[index] {
                return index
            }
        }
        return nil
    }
}

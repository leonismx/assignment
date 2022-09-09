//
//  Extensions.swift
//  swiftProject
//
//  Created by Leon Ng on 8/9/22.
//

import Foundation

extension Int {

    static func generateRandomUniqueNumbers(min: Int, max: Int, count: Int) -> [Int] {
        var set = Set<Int>()
        while set.count < count {
            set.insert(Int.random(in: min...max))
        }
        return Array(set)
    }
}

extension Array {
    mutating func shuffle() {
        for _ in 0...self.count {
            sort { (_,_) in arc4random() < arc4random() }
        }
    }
}


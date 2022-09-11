//
//  swiftProjectTests.swift
//  swiftProjectTests
//
//  Created by Leon Ng on 7/9/22.
//

import XCTest
@testable import swiftProject

class swiftProjectTests: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() throws {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }

    func testPerformanceExample() throws {
        // This is an example of a performance test case.
        self.measure {
            // Put the code you want to measure the time of here.
        }
    }
    
    func testEmptyGenerateRandomUniqueNumbers() throws{
        let expectedResult: [Int] = []
        let actualResult = Int.generateRandomUniqueNumbers(min: 1, max: 100, count: 0)
        XCTAssertEqual(actualResult, expectedResult)
    }
    
    func testGenerateRandomUniqueNumbers() throws{
        let expectedResult: Bool = true
        let uniqueGeneratedNumbers = Int.generateRandomUniqueNumbers(min: 1, max: 100, count: 6)
        let actualResult = (Set(uniqueGeneratedNumbers).count == 6)
        XCTAssertEqual(actualResult, expectedResult)
    }
    
    func testGenerateRandomUniqueNumbersFails() throws{
        let expectedResult: Bool = false
        var uniqueGeneratedNumbers = Int.generateRandomUniqueNumbers(min: 1, max: 100, count: 6)
        uniqueGeneratedNumbers.insert(4, at: 2)
        let actualResult = Set(uniqueGeneratedNumbers).count == 6
        XCTAssertEqual(actualResult, expectedResult)
    }
    
}

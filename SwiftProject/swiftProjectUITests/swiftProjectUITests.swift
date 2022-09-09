//
//  swiftProjectUITests.swift
//  swiftProjectUITests
//
//  Created by Leon Ng on 7/9/22.
//

import XCTest

class swiftProjectUITests: XCTestCase {
    let app = XCUIApplication()

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }


    func testLaunchPerformance() throws {
        if #available(macOS 10.15, iOS 13.0, tvOS 13.0, watchOS 7.0, *) {
            // This measures how long it takes to launch your application.
            measure(metrics: [XCTApplicationLaunchMetric()]) {
                XCUIApplication().launch()
            }
        }
    }
    
    func testStepsShouldIncrementWhenCardFlipped() throws {
        app.launch()
        XCTAssert(app.staticTexts["StepsTaken: 0"].exists)
        let collectionViewsQuery = XCUIApplication().collectionViews
        collectionViewsQuery.children(matching: .cell).element(boundBy: 1).otherElements.containing(.staticText, identifier:"?").element.tap()
        XCTAssert(app.staticTexts["StepsTaken: 1"].exists)
        collectionViewsQuery.children(matching: .cell).element(boundBy: 5).otherElements.containing(.staticText, identifier:"?").element.tap()
        XCTAssert(app.staticTexts["StepsTaken: 2"].exists)
        collectionViewsQuery.children(matching: .cell).element(boundBy: 7).otherElements.containing(.staticText, identifier:"?").element.tap()
        XCTAssert(app.staticTexts["StepsTaken: 3"].exists)

    }
}

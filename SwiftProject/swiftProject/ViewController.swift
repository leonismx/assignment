//
//  ViewController.swift
//  swiftProject
//
//  Created by Leon Ng on 7/9/22.
//

import UIKit

class ViewController: UIViewController{

    let gameboardViewModel = GameBoardViewModel()
    
    let gameboardCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        
        layout.itemSize = CGSize(width: 120, height: 150)
        layout.minimumInteritemSpacing = 10
        layout.minimumLineSpacing = 10
        layout.scrollDirection = .vertical
        let collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collectionView.contentInset = UIEdgeInsets(top: 20, left: 20, bottom: 20, right: 20)
        collectionView.translatesAutoresizingMaskIntoConstraints = false
        collectionView.register(CardCell.self, forCellWithReuseIdentifier: "CardCell")
        
        return collectionView
    }()
    
    let headerView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.systemBlue
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    let btn: UIButton = {
        let button = UIButton(frame: .zero)
        button.setTitle("Restart", for: UIControl.State.normal)
        button.addTarget(self, action: #selector(restartBtnTapped), for: .touchUpInside)
        button.titleLabel?.font =  UIFont(name: "HelveticaNeue-Medium", size: 20)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
    
    let lbl: UILabel = {
        let label = UILabel(frame: .zero)
        label.textColor = UIColor.white
        label.font = UIFont(name: "HelveticaNeue-Medium", size: 20)
        label.translatesAutoresizingMaskIntoConstraints = false
        return label
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
    
        self.view.addSubview(gameboardCollectionView)
        self.view.addSubview(headerView)
        headerView.addSubview(btn)
        headerView.addSubview(lbl)
        lbl.text = "StepsTaken: \(gameboardViewModel.gameSteps)"

        gameboardCollectionView.delegate = self
        gameboardCollectionView.dataSource = self
        gameboardViewModel.delegate = self

        NSLayoutConstraint.activate([
            gameboardCollectionView.topAnchor.constraint(equalTo: headerView.bottomAnchor,constant:0),
            gameboardCollectionView.bottomAnchor.constraint(equalTo: self.view.bottomAnchor,constant:0),
            gameboardCollectionView.leftAnchor.constraint(equalTo: self.view.leftAnchor,constant:0),
            gameboardCollectionView.rightAnchor.constraint(equalTo: self.view.rightAnchor,constant:0),
        ])
        NSLayoutConstraint.activate([
            headerView.topAnchor.constraint(equalTo: self.view.safeAreaLayoutGuide.topAnchor,constant:0),
            headerView.leftAnchor.constraint(equalTo: self.view.leftAnchor,constant:0),
            headerView.rightAnchor.constraint(equalTo: self.view.rightAnchor,constant:0),
            headerView.heightAnchor.constraint(equalToConstant: 80)
        ])
        NSLayoutConstraint.activate([
            btn.leftAnchor.constraint(equalTo: headerView.leftAnchor,constant:20),
            btn.centerYAnchor.constraint(equalTo: headerView.centerYAnchor, constant: 0)
        ])
        
        NSLayoutConstraint.activate([
            lbl.rightAnchor.constraint(equalTo: headerView.rightAnchor,constant:-20),
            lbl.centerYAnchor.constraint(equalTo: headerView.centerYAnchor, constant: 0)
        ])
    }
    
    private func restartApplication(){
        gameboardViewModel.restartGame()
        DispatchQueue.main.async {
            self.gameboardCollectionView.reloadData()
        }
    }
    
    @objc func restartBtnTapped() {
        restartApplication()
    }
}

extension ViewController: UICollectionViewDelegate, UICollectionViewDataSource, GameBoardViewModelProtocolDelegate{
    func showAlert(show: Bool) {
        if(show){
            let alert = UIAlertController(title: "Congratulations", message: "You have matched all cards!", preferredStyle: UIAlertController.Style.alert)
            alert.addAction(UIAlertAction(title: "OK", style: UIAlertAction.Style.default, handler: nil))
            self.present(alert, animated: true) {
                self.restartApplication()
            }
        }
    }
    
    func stepsTaken(steps: Int) {
        lbl.text = "StepsTaken: \(steps)"
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return gameboardViewModel.items.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CardCell", for: indexPath) as! CardCell

        cell.card = gameboardViewModel.items[indexPath.row]
        
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        
        let cell = collectionView.cellForItem(at: IndexPath(item: indexPath.item, section:0)) as! CardCell
        
        if(cell.card!.shown) {return}

        gameboardViewModel.didSelectCardAtIndex(card: cell.card)
    }
    
func showCards(cards: [Card]) {
        for card in cards {
            guard let index = gameboardViewModel.indexForCard(card: card) else { continue }
            let cell = gameboardCollectionView.cellForItem(at: NSIndexPath(item: index, section:0) as IndexPath) as! CardCell
            
            card.shown = true
            cell.card = card
        }
    }

func hideCards(cards: [Card]) {
        for card in cards {
            guard let index = gameboardViewModel.indexForCard(card: card) else { continue }
            let cell = gameboardCollectionView.cellForItem(at: NSIndexPath(item: index, section:0) as IndexPath) as! CardCell
            
            card.shown = false
            cell.card = card
        }
    }
}


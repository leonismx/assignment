//
//  GameBoardGridView.swift
//  swiftProject
//
//  Created by Leon Ng on 8/9/22.
//

import UIKit

protocol GameBoardGridViewDelegate {
    func gameBoardView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath)
    func gameBoardView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int
}

class GameboardGridView: UIView, UICollectionViewDelegate, UICollectionViewDataSource {
    
    var delegate: GameBoardGridViewDelegate?
    private var collectionView: UICollectionView?
    
    func cellForItem(at indexPath: IndexPath) -> UICollectionViewCell? {
        collectionView?.cellForItem(at: indexPath)
    }

    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        delegate?.gameBoardView(collectionView, didSelectItemAt: indexPath)
    }
    
    internal func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        delegate?.gameBoardView(collectionView, numberOfItemsInSection: section) ?? 0
    }
    
    internal func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "cell", for: indexPath)
        cell.backgroundColor = UIColor.systemBlue
        let title = UILabel(frame: CGRect(x: 0, y: 0, width: cell.bounds.size.width, height: 50))
        title.text = "\(indexPath)"
        title.font = UIFont(name: "HelveticaNeue-Medium", size: 20)
        title.textAlignment = .center
        cell.contentView.addSubview(title)
        return cell
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
        self.backgroundColor = .gray
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        setupViews()
    }
    
    private func setupViews() {
        
        let gameboardCollectionView: UICollectionView = {
            let layout = UICollectionViewFlowLayout()
            
            layout.itemSize = CGSize(width: 120, height: 150)
            layout.minimumInteritemSpacing = 10
            layout.minimumLineSpacing = 10
            layout.scrollDirection = .vertical
            let collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
            collectionView.contentInset = UIEdgeInsets(top: 20, left: 20, bottom: 20, right: 20)
            collectionView.translatesAutoresizingMaskIntoConstraints = false
            collectionView.register(UICollectionViewCell.self, forCellWithReuseIdentifier: "cell")
            collectionView.delegate = self
            collectionView.dataSource = self
            
            return collectionView
        }()
        
        self.addSubview(gameboardCollectionView)
        collectionView = gameboardCollectionView
        NSLayoutConstraint.activate([
            gameboardCollectionView.topAnchor.constraint(equalTo: self.topAnchor,constant:0),
            gameboardCollectionView.bottomAnchor.constraint(equalTo: self.bottomAnchor,constant:0),
            gameboardCollectionView.leftAnchor.constraint(equalTo: self.leftAnchor,constant:0),
            gameboardCollectionView.rightAnchor.constraint(equalTo: self.rightAnchor,constant:0),
        ])
    }
}



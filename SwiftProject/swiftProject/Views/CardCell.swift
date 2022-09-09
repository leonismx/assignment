//
//  CardCell.swift
//  swiftProject
//
//  Created by Leon Ng on 8/9/22.
//
import UIKit

class CardCell: UICollectionViewCell {
    
    var card: Card? {
        didSet{
            guard let card = card else { return }

            frontCardLabel.text="\(card.value)"
            card.shown ? flipCard(true) : flipCard(false)
        }
    }
    
    private(set) var flipped: Bool = false
    
    let frontFacingCard: UIView = {
        let view = UIView()
        view.layer.cornerRadius = 5.0
        view.translatesAutoresizingMaskIntoConstraints = false
        view.layer.borderWidth = 0.5
        return view
    }()
    
    let frontCardLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.font = UIFont(name: "HelveticaNeue-Medium", size: 20)

        return label
    }()
    
    let backFacingCard: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.systemBlue
        view.layer.cornerRadius = 5.0
        view.translatesAutoresizingMaskIntoConstraints = false
        
        return view
    }()
    let backCardlabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.text = "?"
        label.textColor = UIColor.white
        label.font = UIFont(name: "HelveticaNeue-Medium", size: 28)
        return label
    }()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupViews()
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    private func setupViews(){
        
        self.addSubview(frontFacingCard)
        self.addSubview(backFacingCard)
        frontFacingCard.addSubview(frontCardLabel)
        backFacingCard.addSubview(backCardlabel)
        
        NSLayoutConstraint.activate([
            frontFacingCard.topAnchor.constraint(equalTo: self.topAnchor,constant:0),
            frontFacingCard.bottomAnchor.constraint(equalTo: self.bottomAnchor,constant:0),
            frontFacingCard.leftAnchor.constraint(equalTo: self.leftAnchor,constant:0),
            frontFacingCard.rightAnchor.constraint(equalTo: self.rightAnchor,constant:0),
        ])
        
        NSLayoutConstraint.activate([
            frontCardLabel.centerXAnchor.constraint(equalTo: frontFacingCard.centerXAnchor,constant:0),
            frontCardLabel.centerYAnchor.constraint(equalTo: frontFacingCard.centerYAnchor,constant:0),
        ])
        
        NSLayoutConstraint.activate([
            backFacingCard.topAnchor.constraint(equalTo: self.topAnchor,constant:0),
            backFacingCard.bottomAnchor.constraint(equalTo: self.bottomAnchor,constant:0),
            backFacingCard.leftAnchor.constraint(equalTo: self.leftAnchor,constant:0),
            backFacingCard.rightAnchor.constraint(equalTo: self.rightAnchor,constant:0),
        ])
        
        NSLayoutConstraint.activate([
            backCardlabel.centerXAnchor.constraint(equalTo: backFacingCard.centerXAnchor,constant:0),
            backCardlabel.centerYAnchor.constraint(equalTo: backFacingCard.centerYAnchor,constant:0),
        ])
    }
    
    func flipCard(_ flip: Bool) {
        
        if flip {
            UIView.transition(
                from: backFacingCard,
                to: frontFacingCard,
                duration: 0.5,
                options: [.transitionFlipFromRight, .showHideTransitionViews],
                completion: { (finished: Bool) -> () in
                })
        } else {
            UIView.transition(
                from: frontFacingCard,
                to: backFacingCard,
                duration: 0.5,
                options: [.transitionFlipFromRight, .showHideTransitionViews],
                completion:  { (finished: Bool) -> () in
                })
        }
        flipped = flip
    }
}


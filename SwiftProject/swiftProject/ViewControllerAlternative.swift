//
//  ViewControllerAlternative.swift
//  swiftProject
//
//  Created by Leon Ng on 8/9/22.
//

import UIKit

struct Constants {
    static let CARD_PAIRS_VALUE = 6
}

class ViewControllerAlternative: UIViewController {

    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        var previousView: UIView? = nil
        var isNewRow: Bool = false
        for j in 0...2{
          
           
        for i in 0...2 {
            
            
            let qwe = UIView()
            qwe.backgroundColor = UIColor.red
            qwe.translatesAutoresizingMaskIntoConstraints = false
            self.view.addSubview(qwe)
            
            let label = UILabel()
            label.text = "\(i)"
            label.translatesAutoresizingMaskIntoConstraints = false
            qwe.addSubview(label)
            NSLayoutConstraint.activate([
                label.centerXAnchor.constraint(equalTo: qwe.centerXAnchor, constant: 0),
                label.centerYAnchor.constraint(equalTo: qwe.centerYAnchor, constant: 0)
            ])
            
            
        
            
            if(previousView == nil){
                NSLayoutConstraint.activate([
                    qwe.leadingAnchor.constraint(equalTo: self.view.leadingAnchor,constant:20),
                    qwe.topAnchor.constraint(equalTo: self.view.topAnchor,constant:80),
                    qwe.widthAnchor.constraint(equalToConstant: 100),
                    qwe.heightAnchor.constraint(equalToConstant: 150)
                    ])
            }
            else{
                if let pView = previousView {
                    if(isNewRow){
                        NSLayoutConstraint.activate([
                            qwe.leadingAnchor.constraint(equalTo: self.view.leadingAnchor,constant:20),
                            qwe.topAnchor.constraint(equalTo: pView.bottomAnchor,constant:20),
                            qwe.widthAnchor.constraint(equalToConstant: 100),
                            qwe.heightAnchor.constraint(equalToConstant: 150)
                            ])
                        isNewRow = false
                    }else{
                        NSLayoutConstraint.activate([
                            qwe.leadingAnchor.constraint(equalTo: pView.trailingAnchor,constant:20),
                            qwe.topAnchor.constraint(equalTo: pView.topAnchor,constant:0),
                            qwe.widthAnchor.constraint(equalToConstant: 100),
                            qwe.heightAnchor.constraint(equalToConstant: 150)
                            ])
                    }
                  
                }
            
                
               
            }
            
           
           
            previousView = qwe
            
            
            }
            isNewRow = true
            

        }
        
        
        

    }


}

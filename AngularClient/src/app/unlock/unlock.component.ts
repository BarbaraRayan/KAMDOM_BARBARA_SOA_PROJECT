import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pallier, World, Product } from '../world';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.component.html',
  styleUrls: ['./unlock.component.css']
})
export class UnlockComponent implements OnInit {
  canclose=false;
  server = "http://localhost:8080/";
  @Input() unlock: Pallier[];
  @Input() product: Product;
  @Input() world: World;

  @Output() closemodalevent = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  //Methode permettant l'affichage de message
  popMessage(message: string) : void {
    this.snackBar.open(message, "", {duration : 2000});
  }

  //Méthode permettant la fermeture de la modal en cliquant dehors
  closemodal(){
    if(this.canclose){
      this.closemodalevent.emit();
    }else{
      this.canclose=true;
    }
  }

  // Méthode permettant de mettre à jour le bonus d'un produit
  productBonusUnlocked() : void{
  }
}

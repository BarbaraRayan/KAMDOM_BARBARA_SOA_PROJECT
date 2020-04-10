import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { Pallier, World } from '../world';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductComponent } from '../product/product.component';
import { RestserviceService } from '../restservice.service';

@Component({
  selector: 'app-angel',
  templateUrl: './angel.component.html',
  styleUrls: ['./angel.component.css']
})
export class AngelComponent implements OnInit {
  canclose=false;
  server = "http://localhost:8080/";
  @Input() angel: Pallier[];
  @Input() world: World;
  @Input() money: number;
  @ViewChildren(ProductComponent) public productsComponent: QueryList<ProductComponent>;
  @Output() closemodalevent = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar, private service: RestserviceService) { }

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

  //Méthode permettant l'achat d'anges
  purchaseAngel(tu: Pallier) : void {
    if (this.world.money >= tu.seuil  && !tu.unlocked) {
      this.world.money -= tu.seuil;
      this.world.upgrades.pallier[this.world.upgrades.pallier.indexOf(tu)].unlocked = true;
      if (tu.idcible == 0) {
        this.productsComponent.forEach(prod => prod.calcUpgrade(tu));
      }else {
        this.productsComponent.forEach(prod => {if (tu.idcible == prod.product.id) {prod.calcUpgrade(tu);}});
      }
      this.service.putUpgrade(tu);
    }else{
      this.popMessage("You can't buy this angel");
    }
  }
}

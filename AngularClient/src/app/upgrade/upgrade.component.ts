import { Component, OnInit, ViewChildren, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { Pallier, World, Product } from '../world';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestserviceService } from '../restservice.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  canclose=false;
  server = "http://localhost:8080/";
  @Input() upgrade: Pallier[];
  @Input() product: Product;
  @Input() world: World;
  @Input() money: number;
  @ViewChildren(ProductComponent) public productsComponent: QueryList<ProductComponent>;
  @Output() closemodalevent = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar, private service: RestserviceService) {

  }

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

  canAfo
  //Méthode permettant l'achat d'upgrades
  purchaseUpgrade(tu: Pallier) : void {
    if (this.world.money > tu.seuil && !tu.unlocked) {
      this.world.money -= tu.seuil;
      this.world.upgrades.pallier[this.world.upgrades.pallier.indexOf(tu)].unlocked = true;
      if (tu.idcible == 0) {this.productsComponent.forEach(prod => prod.calcUpgrade(tu));
      }else {
        this.productsComponent.forEach(prod => {if (tu.idcible == prod.product.id) {prod.calcUpgrade(tu);}});
      }
      this.service.putUpgrade(tu);
    }else{
      this.popMessage("You can't buy this upgrade");
    }
  }
}


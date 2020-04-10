import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, Pallier } from '../world';
import { RestserviceService } from '../restservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product;
  progressBarValue: number=0;
  isLoading: boolean;
  @Input() lastUpdate: number;
  _qtmulti: string;
  _money: number;
  server: string ="http://localhost:8080/";

  @Input()
  set money(value: number) {
    this._money = value;
  }

  @Input()
  set qtmulti(value: string) {
    if(value == 'MAX'){
      this._qtmulti = 'x' + this.calcMaxCanBuy();
    } else {this._qtmulti = value;}
  }

  @Input()
  set prod(value: Product) {
    this.product = value;
    if (this.product && this.product.timeleft > 0) {
      this.lastUpdate = Date.now();
      this.progressBarValue = ((this.product.vitesse -this.product.timeleft) / this.product.vitesse) * 100}
  }


  @Input() set progress(value: number){
    this.progressBarValue = value;
  }


  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyPurchase: EventEmitter<number> = new EventEmitter<number>();

  constructor(private service: RestserviceService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    setInterval(() => {this.calcScore();}, 100);

  }

  // Méthode lançant la fabrication des produits
  startFabrication(): void {
    this.popMessage("Production is launched");
    if (this.product.quantite > 0 && this.product.timeleft === 0) {
      this.product.timeleft = this.product.vitesse;
      this.service.putProduct(this.product)
      this.launchProductFabrication();
    }
  }

  // Méthode permettant d'afficher un message durant 2 secondes
  popMessage(m: string) : void {
    this.snackBar.open(m, "", {duration : 2000});
  }

  // Méthode lançant la fabrication des produits
  launchProductFabrication() : void{
    this.product.timeleft = this.product.vitesse;
    this.lastUpdate = Date.now();
  }

  // Méthode permettant de calculer le score du joueur
  calcScore(): void {
    if (this.product.timeleft === 0 && this.product.managerUnlocked) {
      this.popMessage("Production is launched");
      this.launchProductFabrication();
    }
    else if (this.product.timeleft > 0) {
      let now = Date.now();
      let elapseTime = now - this.lastUpdate;
      this.lastUpdate = now;
      this.product.timeleft = this.product.timeleft - elapseTime;
      if (this.product.timeleft <= 0) {
        this.product.timeleft = 0;
        this.progressBarValue = 0
        this.notifyProduction.emit(this.product);
        if (this.product.managerUnlocked) {
          this.launchProductFabrication();
        }
      }else this.progressBarValue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100}
 }

 // Méthode calculant le nombre maximal de produits achetable
  calcMaxCanBuy() : number{
    let q = 0;
    let cost = 0;
    let productPrice = this.product.cout*(this.product.croissance**this.product.quantite);
    while ((cost+productPrice) <= this._money) {
      productPrice = productPrice * this.product.croissance;
      cost = cost + productPrice;
      q ++;
    }
    return q;
  }

  // Méthode calculant le prix d'achats des produits
  price(q: number) : number{
    let total = 0;
    let unity = this.product.cout*(this.product.croissance**this.product.quantite);
    for(let i=0; i<q; i++){
      total = total + unity;
      unity = unity*this.product.croissance;
    }
    return total;
  }

  // Méthode calculant la quantité achetable par produit en fonction du commutateur.
  purchasableQuantity() : number{
    var q: number;
    if(this._qtmulti=="x1"){
      q = 1;
    }else if(this._qtmulti=="x10"){
      q = 10;
    }else if(this._qtmulti=="x100"){
      q = 100;
    }else{
      q = this.calcMaxCanBuy();
    }
    return q;
  }

  // Méthode permettant l'achat d'un produit, on verifie aussi si un pallier a été passé pour les bonus.
  purchaseProduct() : void {
    let q: number;
    q = this.purchasableQuantity();
    var cost = this.price(q);
    if(this._money > cost){
      this.product.quantite += q;
      this.notifyPurchase.emit(cost);
    }
    this.product.palliers.pallier.forEach(value => {
      if(this.product.quantite > value.seuil && !value.unlocked){
        this.product.palliers.pallier[this.product.palliers.pallier.indexOf(value)].unlocked = true;
        this.calcUpgrade(value);
      }
    });
  }

  // Méthode permettant de calculer si le joueur a débloqué les bonus
  calcUpgrade(p: Pallier) : void{
    switch (p.typeratio) {
    case 'Vitesse':
      this.product.vitesse=this.product.vitesse/p.ratio;
    break;
    case 'Gain':
      this.product.revenu=this.product.revenu*p.ratio;
    break;
  }
  }
}

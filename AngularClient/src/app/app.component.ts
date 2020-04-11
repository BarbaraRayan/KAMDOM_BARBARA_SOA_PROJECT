import { Component, ViewChildren, QueryList } from '@angular/core';
import { Product, World } from './world';
import { RestserviceService } from './restservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products=[1,2,3,4,5,6];
  @ViewChildren(ProductComponent) public productsComponent: QueryList<ProductComponent>;
  title = 'AngularProject';
  world: World = new World();
  server: String;
  username: string;
  qtmulti = "x1";
  modal: string=null;

  constructor(private service: RestserviceService, public snackBar: MatSnackBar) {
    this.server = service.getServer();
    this.username = localStorage.getItem("username");
    // Fonction créant un nom de joueur aléatoire si le nom du joueur est et qui sera sauverarder dans le serveur
    if (this.username == '') {
      this.username = 'Player' + Math.floor(Math.random() * 10000);
      localStorage.setItem("username", this.username);
    }
    this.service.setUser(this.username);
    service.getWorld().then(world => { this.world = world; });
  }

  //Methode permettant d'afficher un message durant 2 secondes
  popMessage(m: string) : void {
    this.snackBar.open(m, "", { duration: 2000 });
  }

  // Méthode enregistrant la modification du nom de joeur par l'utilisateur
  setUsername() : void{
    localStorage.setItem("username", this.username);
    this.service.setUser(this.username);
  }

  // Methode permettant de mettre à jour l'argent et le score à la fait d'une production
  onProductionDone(p: Product) : void{
    this.world.money = this.world.money+p.quantite*p.revenu*(1 +(this.world.activeangels * this.world.angelbonus/100));
    this.world.score = this.world.score+p.quantite*p.revenu*(1 +(this.world.activeangels * this.world.angelbonus/100));
    this.popMessage("Production is finished")
  }

  //Commutateur de la quantité de produit à acheter
  changeQuantity() : void{
    switch(this.qtmulti){
      case "x1":
        this.qtmulti = "x10";
      break;
      case "x10":
        this.qtmulti = "x100";
      break;
      case "x100":
        this.qtmulti = "xMAX";
      break;
      case "MAX":
        this.qtmulti = "x1";
      break;
      default:
        this.qtmulti = "x1"
    }
  }

  // Méthode deduisant l'argent du joueur suite à un achat
  onPurchase(m: number) : void{
    this.world.money -= m;
  }

  // Méthode pour mettre l'argent à 0 sinon les produits et le commutateur sauteur
    ngOnInit(): void {
  }
}

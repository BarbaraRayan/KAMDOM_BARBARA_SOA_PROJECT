import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pallier, World } from '../world';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestserviceService } from '../restservice.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  canclose=false;
  server = "http://localhost:8080/";
  @Input() manager: Pallier[];
  @Input() world: World;
  @Input() money: number;

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

  // Méthode permettant d'engager un manager
  hireManager(p : Pallier) : void{
    this.popMessage(p.name + " has been hired");
    if (this.world.money >= p.seuil) {
      this.world.money -= p.seuil;
      this.world.managers.pallier[this.world.managers.pallier.indexOf(p)].unlocked = true;
      this.world.products.product.forEach(element => {if (p.idcible == element.id) {this.world.products.product[this.world.products.product.indexOf(element)].managerUnlocked = true;}});
      this.service.putManager(p);
    }else{
      this.popMessage(p.name + " can't be hired");
    }
  }
}

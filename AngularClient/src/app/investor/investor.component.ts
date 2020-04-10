import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestserviceService } from '../restservice.service';

@Component({
  selector: 'app-investor',
  templateUrl: './investor.component.html',
  styleUrls: ['./investor.component.css']
})
export class InvestorComponent implements OnInit {
  canclose=false;
  @Input() investor: number;
  @Input() bonus: number;
  @Input() total: number;
  @Output() closemodalevent = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar, private service: RestserviceService) { }

  ngOnInit(): void {
  }
  //Methode permettant l'affichage de message
  popMessage(message: string) : void {
    this.snackBar.open(message, "", {duration : 2000});
  }

  //Méthode permettant la fermeture de la modal en cliquant dehors
  closemodal(): void{
    if(this.canclose){
      this.closemodalevent.emit();
    }else{
      this.canclose=true;
    }
  }

  claimAngel(): void{

  }

}

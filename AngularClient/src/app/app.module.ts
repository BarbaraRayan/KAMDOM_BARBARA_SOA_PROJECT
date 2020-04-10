import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestserviceService } from 'src/app/restservice.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { BigvaluePipe } from './bigvalue.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ClickOutsideModule } from 'ng-click-outside';
import { UnlockComponent } from './unlock/unlock.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ManagerComponent } from './manager/manager.component';
import { InvestorComponent } from './investor/investor.component';
import { AngelComponent } from './angel/angel.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    BigvaluePipe,
    UnlockComponent,
    UpgradeComponent,
    ManagerComponent,
    InvestorComponent,
    AngelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    ClickOutsideModule,
    MatSnackBarModule,
    MatBadgeModule,
    FormsModule,
  ],
  providers: [RestserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

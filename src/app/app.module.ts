import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { InvisibleFriendComponent } from './components/invisible-friend/invisible-friend.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDialogModule } from '@angular/material/dialog'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LoginComponent } from './components/login/login.component'
import { MatSliderModule } from '@angular/material/slider'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms'
import { ControlPanelComponent } from './components/control-panel/control-panel.component'
import { MatMenuModule } from '@angular/material/menu'
import { WishListComponent } from './components/wish-list/wish-list.component'
import { WishDialogComponent } from './components/wish-list/wish-dialog/wish-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    InvisibleFriendComponent,
    LoginComponent,
    ControlPanelComponent,
    WishListComponent,
    WishDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgbModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

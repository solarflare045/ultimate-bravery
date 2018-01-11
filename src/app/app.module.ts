import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';

import { RandomizerService } from '../services/randomizer/randomizer.service';

const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyBf2HwvQsoHXYw_cWGow5LknWaotzhinLA',
  authDomain: 'ultimate-bravery-d09b5.firebaseapp.com',
  databaseURL: 'https://ultimate-bravery-d09b5.firebaseio.com',
  projectId: 'ultimate-bravery-d09b5',
  storageBucket: 'ultimate-bravery-d09b5.appspot.com',
  messagingSenderId: '824460430066'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [RandomizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

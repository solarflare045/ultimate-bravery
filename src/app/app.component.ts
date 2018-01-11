import { Component } from '@angular/core';

import { RandomizerService, ILoadout } from '../services/randomizer/randomizer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isKiller = true;
  loadout: ILoadout;

  constructor(private randomizer: RandomizerService) {
    this.roll();
  }

  async roll(): Promise<void> {
    this.loadout = await (this.isKiller ? this.randomizer.getKillerLoadout() : this.randomizer.getSurvivorLoadout());
  }
}

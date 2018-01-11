import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/toPromise';

import * as _ from 'lodash';

export interface IObject { name: string; img: string; }
export type TPerk = IObject;
export type TAddon = IObject;
export type TOffering = IObject;
export type TItem = IObject & { addons: Array<TAddon> };
export type TKiller = IObject & { addons: Array<TAddon> };
export interface ILoadout { perks: Array<TPerk>; offering: TOffering; item: TItem; }

export type TFirebaseLayout = any;

@Injectable()
export class RandomizerService {
  private db: Observable<TFirebaseLayout>;

  constructor(private fb: AngularFireDatabase) {
    const object = fb.object('/').valueChanges().publishReplay(1); object.connect();
    this.db = object.first();
  }

  private async fetch(): Promise<TFirebaseLayout> {
    return await this.db.toPromise();
  }

  async getRandomItem(): Promise<TItem> {
    const survivors = (await this.fetch()).survivors;
    const item = _.chain(survivors.items).sample().sample().value();
    return _.extend({}, item, {
      addons: _.sampleSize( survivors.addons[ item.type ], 2 )
    });
  }

  async getSurvivorLoadout(): Promise<ILoadout> {
    return {
      item: await this.getRandomItem(),
      offering: null,
      perks: _.sampleSize( (await this.fetch()).survivors.perks, 4 )
    };
  }

  async getRandomKiller(): Promise<TKiller> {
    const killers = (await this.fetch()).killers;
    const killer = _.sample( killers.abilities );
    return _.extend({}, killer, {
      addons: _.sampleSize( killers.addons[ killer.name.replace(/The\s/, '') ], 2 )
    });
  }

  async getKillerLoadout(): Promise<ILoadout> {
    return {
      item: await this.getRandomKiller(),
      offering: null,
      perks: _.sampleSize( (await this.fetch()).killers.perks, 4 )
    };
  }
}

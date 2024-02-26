import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getNations() {
    return of([
      {
        value: null,
        label: '--'
      },
      {
        value: 1,
        label: 'Italy'
      },
      {
        value: 2,
        label: 'Germany'
      },
      {
        value: 3,
        label: 'U.S.'
      },
      {
        value: 4,
        label: 'Spain'
      }
    ])
  }

  getCities(nationId: number = null) {
    return of([
        {
          value: null,
          label: '--',
          nationId: null
        },
        {
          value: 1,
          label: 'Bolzano',
          nationId: 1
        },
        {
          value: 1,
          label: 'Rome',
          nationId: 1
        },
        {
          value: 2,
          label: 'Berlin',
          nationId: 2
        },
        {
          value: 2,
          label: 'Munich',
          nationId: 2
        },
        {
          value: 3,
          label: 'San Francisco',
          nationId: 3
        },
        {
          value: 4,
          label: 'León',
          nationId: 4
        }
      ].filter(entry => {
        if (nationId) {
          return entry.nationId === nationId;
        } else {
          return true
        }
      })
    );
  }
}

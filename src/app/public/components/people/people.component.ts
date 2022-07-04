import { Component, OnInit } from '@angular/core';
import { IPerson, PersonBuilder } from '../../models/pesonal.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  person: IPerson = new PersonBuilder()
    .name('Fabian')
    .lastName('Serrano')
    .age(29)
    .heigth(1.80)
    .weigth(80)
    .build();

  constructor() { }

  ngOnInit(): void {
  }
}

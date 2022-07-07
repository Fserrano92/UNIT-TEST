import { Component, OnInit } from '@angular/core';
import { IPerson, PersonBuilder } from '../../models/pesonal.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  people: IPerson[] = [];
  selectedPerson: IPerson = new PersonBuilder().build();

  constructor() { }

  ngOnInit(): void {
    const person1: IPerson = new PersonBuilder()
      .name('Fabian')
      .lastName('Serrano')
      .age(29)
      .heigth(1.80)
      .weigth(80)
      .build();

    const person2: IPerson = new PersonBuilder()
      .name('Alexander')
      .lastName('Martinez')
      .age(30)
      .heigth(1.80)
      .weigth(75)
      .build();

    const person3: IPerson = new PersonBuilder()
      .name('Katy')
      .lastName('Lamount')
      .age(26)
      .heigth(1.70)
      .weigth(50)
      .build();

    this.people.push(person1);
    this.people.push(person2);
    this.people.push(person3);
  }

  onSelect(person: IPerson): void{
    this.selectedPerson = person;
  }
}

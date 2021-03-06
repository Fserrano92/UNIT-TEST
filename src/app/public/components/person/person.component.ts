import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calculation, IPerson, PersonBuilder } from '../../models/pesonal.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  @Input()
  person: IPerson = new PersonBuilder()
    .build();

  @Output()
  onSelect = new EventEmitter<IPerson>();

  img: string = '';

  calculation: Calculation = new Calculation();

  constructor() { }

  ngOnInit(): void { }

  calcImg(): void {
    this.img = this.calculation.calcIMC(this.person);
  }

  choosePerson(){
    this.onSelect.emit(this.person);
  }
}

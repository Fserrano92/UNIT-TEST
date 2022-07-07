import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IPerson, PersonBuilder } from '../../models/pesonal.model';
import { PersonComponent } from '../person/person.component';
import { PeopleComponent } from './people.component';

fdescribe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Pruebas de renderisado de app-person', () => {

    const people: IPerson[] = [];

    const person1: IPerson = new PersonBuilder()
      .name('Hey')
      .lastName('Arnol')
      .age(30)
      .heigth(1.6)
      .weigth(50)
      .build();


    const person2: IPerson = new PersonBuilder()
      .name('Morty')
      .lastName('Rick')
      .age(15)
      .heigth(1.65)
      .weigth(50)
      .build();

    people.push(person1);
    people.push(person2);

    beforeEach(() => {
      component.people = people;
      fixture.detectChanges();
    });

    it('Verificacion de numero de app-person renderisados', () => {
      const personDe = fixture.debugElement.queryAll(By.css('app-person'));

      expect(personDe.length).toEqual(people.length);
    });

    it('Verificacion de renderisado de 1ra y 2da iteracion de app-component', () => {
      const person1H3De = fixture.debugElement.query(By.css(`app-person#${people[0].name} button.btn-choose`));
      const person2H3El = fixture.debugElement.query(By.css(`app-person#${people[1].name} h3`)).nativeElement;
      
      person1H3De.triggerEventHandler('click', null);
      fixture.detectChanges();

      const namePersonChoose = fixture.debugElement.query(By.css('li#name')).nativeElement;
      const lastNamePersonChoose = fixture.debugElement.query(By.css('li#lastName')).nativeElement;
      
      expect(namePersonChoose.textContent).toContain(people[0].name);
      expect(lastNamePersonChoose.textContent).toContain(people[0].lastName);
      expect(person2H3El.textContent).toContain(people[1].name);
    });

  });
});

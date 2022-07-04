import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ETypeIMC, IPerson, PersonBuilder } from '../../models/pesonal.model';
import { PersonComponent } from './person.component';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Muestra que se creo <h3> y dentro tenga "Hola, soy { person.name }"', () => {
    const testName = 'Fabian';

    component.person = new PersonBuilder()
      .name(testName)
      .build();

    const renderMessage = `Hola, soy ${testName}`

    const h3Debug: DebugElement = fixture.debugElement;
    const h3: DebugElement = h3Debug.query(By.css('h3'));
    const h3Element = h3.nativeElement;

    fixture.detectChanges();

    expect(h3Element?.textContent).toEqual(renderMessage);
  });

  it('Prueba de llamado de metodo de calculo de IMC', () => {
    const person: IPerson = new PersonBuilder()
      .heigth(1.5)
      .weigth(55)
      .build();

    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    component.person = person;
    component.calcImg();

    fixture.detectChanges();

    expect(button?.textContent).toEqual(`IMC: ${ETypeIMC.NORMAL}`);
  });

  it('Prueba de uso del boton de calculo de img', () => {
    const person: IPerson = new PersonBuilder()
      .heigth(1.5)
      .weigth(55)
      .build();

    const buttonDe: DebugElement = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonEl = buttonDe.nativeElement;
    component.person = person;

    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(buttonEl?.textContent).toEqual(`IMC: ${ETypeIMC.NORMAL}`);
  });

  it('Prueba de emicion de evento u Output', () => {
    const person: IPerson = new PersonBuilder()
      .name('Alexander')
      .lastName('Martinez')
      .age(30)
      .heigth(1.80)
      .weigth(75)
      .build();

    component.person = person;
    const buttonChooseDe = fixture.debugElement.query(By.css('butto.btn-choose'));

    let personSelected: IPerson | undefined;

    component.onSelect.subscribe(personSelectedTemp => {
      personSelected = personSelectedTemp;
    });

    buttonChooseDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(personSelected).toEqual(person)
  })


  xit('Muestra que se creo <h3> y dentro tenga "Hola, personComponet"', () => {
    const h3Debug: DebugElement = fixture.debugElement;
    const h3: DebugElement = h3Debug.query(By.css('h3'));
    const h3Element = h3.nativeElement;
    expect(h3Element?.textContent).toEqual('Hola, personComponet');
  });

  xit('Muestra que se creo <p> y dentro tenga "Soy un parrafo"', () => {
    const pDebug: DebugElement = fixture.debugElement;
    const p = pDebug.query(By.css('p'));
    const pElement = p.nativeElement;
    expect(pElement?.textContent).toEqual('Soy un parrafo');
  });
});

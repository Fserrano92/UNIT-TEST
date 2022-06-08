import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('Pruebas de CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('prueba de resultado de metodo #multiply', () => {

    const calculator = new CalculatorService();
    const rst = calculator.multiply(3,3);
    expect(rst).toEqual(9);
  });

  it('prueba de validacion de metodo #divide', () => {
    
    const calculator = new CalculatorService();
    const rst = calculator.divide(3,0);
    expect(rst).toEqual(null);
  });

  it('prueba de resultado de validacion #divide', () => {
    
    const calculator = new CalculatorService();
    const rst = calculator.divide(3,1);
    expect(rst).toEqual(3);
  });
});

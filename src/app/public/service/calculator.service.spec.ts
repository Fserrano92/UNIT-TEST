import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('Pruebas de CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  describe('Pruebas de metodo #multiply', () => {

    it('Comprobacion de resultado', () => {

      const calculator = new CalculatorService();

      expect(calculator.multiply(3, 3)).toEqual(9);
      expect(calculator.multiply(3, 0)).toEqual(0);
      expect(calculator.multiply(3, 4)).toEqual(12);
      expect(calculator.multiply(2, 3)).toEqual(6);
    });
  })

  describe('Pruebas de metodo #divide', () => {
    it('Comprobacion validacion Dividendo en cero', () => {

      const calculator = new CalculatorService();

      expect(calculator.divide(3, 0)).toBeNull();
      expect(calculator.divide(23, 0)).toBeNull();
      expect(calculator.divide(2, 0)).toBeNull();
      expect(calculator.divide(12312346, 0)).toBeNull();
    });

    it('Comprobacion de resultado', () => {

      const calculator = new CalculatorService();

      expect(calculator.divide(3, 1)).toEqual(3);
      expect(calculator.divide(3, 3)).toEqual(1);
      expect(calculator.divide(6, 2)).toEqual(3);
      expect(calculator.divide(12, 3)).toEqual(4);
    });
  })
});

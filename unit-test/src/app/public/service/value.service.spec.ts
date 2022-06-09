import { ValueService } from './value.service';

fdescribe('Pruebas de ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  describe('Creacion de instancia del servicio', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('Pruebas del metodo #getValue', () => {

    it('Comprobacion de respuesta', () => {

      expect(service.getValue()).toBe('my name');
      expect(service.getValue()).not.toBe('mi nombre');
    });
  });

  describe('Pruebas del metodo #setValue', () => {

    it('Comprobacion de respuesta', () => {

      expect(service.getValue()).toBe('my name');
      service.setValue('mi nombre');
      expect(service.getValue()).toBe('mi nombre');
    });
  });

  describe('Pruebas del metodo #getValuePromise', () => {

    it('Comprobacion de respuesta con then', (doneFn) => {

      service.getValuePromise().then(value => {

        expect(value).toBe('Value promise');
        expect(value).not.toBe('Value observable');
        doneFn();
      })
    });

    it('Comprobacion de respuesta con async', async () => {

      const rst = await service.getValuePromise();

      expect(rst).toBe('Value promise');
      expect(rst).not.toBe('Value observable');
    });
  });

  describe('Pruebas del metodo #getValueObservable', () => {

    it('Comprobacion de respuesta Observable', (doneFn) => {
      service.getValueObservable().subscribe(value => {

        expect(value).toBe('Value observable');
        expect(value).not.toBe('Value promise');
        doneFn();
      });
    });
  });
});

import { MasterService } from './master.service';
import { ValueFakeService } from './value-fake.service';
import { ValueService } from './value.service';

fdescribe('Prueba de MasterService', () => {

  it('Prueba de metodo #getValue con inyeccionde de servicio', () => {
    // tener en cuenta que esta practica no es la indicada.
    const valueService = new ValueService();
    const masterService = new MasterService(valueService);

    expect(masterService.getValue()).toBe('my name');
  });

  it('Prueba de metodo #getValue con inyeccionde de servicio fake', () => {
    // Esta opcion aunque es un aceptable nos presenta el gran inconveniente 
    // de mantener actualizado el servicio fake.
    const valueFakeService = new ValueFakeService();
    const masterService = new MasterService(valueFakeService as unknown as ValueService);

    expect(masterService.getValue()).toBe('my name fake service');
  });

  it('Prueba de metodo #getValue con inyeccionde de objeto fake', () => {
    // Esta opcion de momento es la mas aceptada por la comunidad (para pruebas de respuesta)
    const objetFake = { getValue: () => { return 'my name objet fake'; } }
    const masterService = new MasterService(objetFake as ValueService);

    expect(masterService.getValue()).toBe('my name objet fake');
  });

  it('Prueba de llamado de #getValue con espias', () => {
    // Esta opcion de momento es la mas aceptada por la comunidad (para probar los metodos llamados y numero de llamadas)
    const spyValue = jasmine.createSpyObj('ValueService', ['getValue']);
    spyValue.getValue.and.returnValue('test spy value');
    const masterService = new MasterService(spyValue);

    expect(masterService.getValue()).toBe('test spy value');
    expect(spyValue.getValue).toHaveBeenCalled();
    expect(spyValue.getValue).toHaveBeenCalledTimes(1);
  });
});

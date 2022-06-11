import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('Prueba de MasterService', () => {

  let masterService: MasterService;
  let valueSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const providerValueSpy = jasmine.createSpyObj('ValueService', ['getValue']);
    
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        {
          provide: ValueService, useValue: providerValueSpy
        }
      ]
    });
  
    masterService = TestBed.inject(MasterService);
    valueSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  }) 

  it('Prueba de llamado de #getValue con espias', () => {
    // Esta opcion de momento es la mas aceptada por la comunidad (para probar los metodos llamados y numero de llamadas)
    valueSpy.getValue.and.returnValue('test spy value');
    expect(masterService.getValue()).toBe('test spy value');
    expect(valueSpy.getValue).toHaveBeenCalled();
    expect(valueSpy.getValue).toHaveBeenCalledTimes(1);
  });
});

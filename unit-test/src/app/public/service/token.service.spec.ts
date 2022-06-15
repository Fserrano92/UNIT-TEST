import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Pruebas de #saveToken & #getToken', () => {

    it('Ingreso de "1234"', () => {
      const mockToken = '1234';
      service.saveToken(mockToken);
      expect(service.getToken()).toEqual(mockToken);
    });

    it('sobre escritura de token ', () => {
      const mockTokenInit = 'init';
      const mockToken = '1234';

      service.saveToken(mockTokenInit);
      expect(service.getToken()).toEqual(mockTokenInit);
            
      service.saveToken(mockToken);
      expect(service.getToken()).toEqual(mockToken);
    });

  });

  describe('Pruebas de #removeToken', () => {

    it('Remover token "1234"', () => {
      const mockToken = '1234';
      service.saveToken(mockToken);
      service.removeToken();
      expect(service.getToken()).not.toEqual(mockToken);
      expect(service.getToken()).toBeNull();
    });
  });
});

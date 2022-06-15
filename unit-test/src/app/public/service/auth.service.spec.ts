import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';

describe('AuthService', () => {
  let service: AuthService;
  let tokenService: TokenService;
  let httpClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TokenService
      ]
    });

    tokenService = TestBed.inject(TokenService);
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Prueba de metodo #login ', () => {

    it('Respuesta Correcta', (doneFn) => {
      const mailMock = 'fabian es lo maximo';
      const passwordMock = '123456';
      const responseMock: Auth = {
        access_token: '12345'
      }

      service.login(mailMock, passwordMock).subscribe(data => {
        expect(data).toEqual(responseMock);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/auth/login`
      const req = httpClient.expectOne(URL_API);
      req.flush(responseMock);
    });

    it('Comprobacion de llamado a tokenService', (doneFn) => {
      const mailMock = 'fabian es lo maximo';
      const passwordMock = '123456';
      const responseMock: Auth = {
        access_token: '12345'
      }
      spyOn(tokenService, 'saveToken').and.callThrough();

      service.login(mailMock, passwordMock).subscribe(data => {
        expect(data).toEqual(responseMock);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith('12345');
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/auth/login`
      const req = httpClient.expectOne(URL_API);
      req.flush(responseMock);
    });    
  });
});

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { generateProductList } from '../mock/product.mock';
import { Product } from '../models/product.model';
import { ProductsService } from '../service/product.service';
import { TokenService } from '../service/token.service';

import { TokenInterceptor } from './token.interceptor';

describe('TokenInterceptor', () => {
  let interceptor: TokenInterceptor;
  let service: ProductsService;
  let httpClient: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ProductsService,
        TokenService,
        TokenInterceptor,
        { 
          provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true 
        }
      ]
    });

    tokenService = TestBed.inject(TokenService);
    service = TestBed.inject(ProductsService);
    interceptor = TestBed.inject(TokenInterceptor);
    httpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    tokenService.removeToken();
    httpClient.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('Prueba de integracion con ProductService', () => {

    it('Prueba de Envio de token', (doneFn) => {

      const mockLimit: number = 100;
      const mockOffset: number = 10;
      const mockResponse: Product[] = generateProductList();
      spyOn(tokenService, 'getToken').and.returnValue('1234');


      service.getAll(mockLimit, mockOffset).subscribe(data => {
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/products?limit=${mockLimit}&offset=${mockOffset}`
      const req = httpClient.expectOne(URL_API);
      req.flush(mockResponse);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toEqual('Bearer 1234')
    });
  });
});

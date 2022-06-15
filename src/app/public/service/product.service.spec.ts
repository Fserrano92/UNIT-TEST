import { HttpStatusCode, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { generateOneProduct, generateProductList } from '../mock/product.mock';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { ProductsService } from './product.service';
import { TokenService } from './token.service';


describe('ProductService', () => {
  let service: ProductsService;
  let httpClient: HttpTestingController;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        TokenService,
        ProductsService,
        { 
          provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true 
        }
      ]
    });

    tokenService = TestBed.inject(TokenService);
    service = TestBed.inject(ProductsService);
    httpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Pruebas a metodo #getAllSimple', () => {

    it('Mock de servicio', (doneFn) => {
      const mockResponse: Product[] = generateProductList();

      service.getAllSimple().subscribe(data => {
        expect(data).toEqual(mockResponse);
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/products?limit=100&offset=10`
      const req = httpClient.expectOne(URL_API);
      req.flush(mockResponse);
      httpClient.verify();
    });
  });

  describe('Pruebas al metodo #getAll', () => {

    it('Mock de servicio', (doneFn) => {
      const mockResponse: Product[] = generateProductList();

      service.getAll(100, 10).subscribe(data => {
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/products?limit=100&offset=10`
      const req = httpClient.expectOne(URL_API);
      req.flush(mockResponse);
      httpClient.verify();
    });

    it('Mock de servicio con impuestos', (doneFn) => {
      const mockResponse: Product[] = [
        {
          ...generateOneProduct(),
          price: 100
        },
        {
          ...generateOneProduct(),
          price: 200
        },
        {
          ...generateOneProduct(),
          price: 0
        },
        {
          ...generateOneProduct(),
          price: -20
        }
      ];

      service.getAll(100, 10).subscribe(data => {
        expect(data.length).toEqual(mockResponse.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
        expect(data[2].taxes).toEqual(0);
        expect(data[3].taxes).toEqual(0);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/products?limit=100&offset=10`
      const req = httpClient.expectOne(URL_API);
      req.flush(mockResponse);
      httpClient.verify();
    });

    it('Mock de servicio con parametros', (doneFn) => {
      const mockResponse: Product[] = generateProductList();

      const limit = 100;
      const offset = 10;

      service.getAll(limit, offset).subscribe(data => {
        expect(data.length).toEqual(mockResponse.length);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`
      const req = httpClient.expectOne(URL_API);
      req.flush(mockResponse);
      const request = req.request.params;
      expect(request.get('limit')).toEqual(`${limit}`);
      expect(request.get('offset')).toEqual(`${offset}`);
      httpClient.verify();
    });
  });

  describe('Pruebas al metodo #create', () => {

    it('Tipo de metodo', (doneFn) => {

      const mockResponse: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        categoryId: 1,
        title: '',
        price: 100,
        description: 'des',
        images: ['ima']
      }

      service.create(dto).subscribe(data => {
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/products`
      const req = httpClient.expectOne(URL_API);
      req.flush(mockResponse);
      expect(req.request.method).toEqual('POST');
      httpClient.verify();
    });
  })

  describe('Pruebas al metodo #update', () => {
    it('mock servicio', (doneFn) => {

      const mockResponse: Product = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'test'
      }
      const productId: number = 1;

      service.update(productId, { ...dto }).subscribe(data => {
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpClient.expectOne(URL_API);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(dto);
      req.flush(mockResponse);
    });
  });

  describe('Pruebas al metodo #delete', () => {
    it('mock servicio', (doneFn) => {

      const mockResponse = true;
      const productId = 1;

      service.delete(productId).subscribe(data => {
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpClient.expectOne(URL_API);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('Pruebas al metodo #getOne', () => {

    it('mock servicio', (doneFn) => {

      const mockResponse: Product = generateOneProduct();
      const productId: number = 1;

      service.getOne(productId).subscribe(data => {
        expect(data).toEqual(mockResponse);
        doneFn();
      });

      const URL_API = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpClient.expectOne(URL_API);
      expect(req.request.method).toEqual('GET');
      req.flush(mockResponse);
    });

    it('Prueba de error 404', (doneFn) => {

      const productId: number = 1;
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      }

      service.getOne(productId).subscribe(
        {
          error: (error) => {
            expect(error).toEqual('El producto no existe');
            doneFn();
          }
        }
      );

      const URL_API = `${environment.API_URL}/api/v1/products/${productId}`;
      const req = httpClient.expectOne(URL_API);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);
    })
  });

  describe('Prueba de integracion con TokenInterceptor', () => {

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

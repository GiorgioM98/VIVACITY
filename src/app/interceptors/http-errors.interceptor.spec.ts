import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorsInterceptor } from './http-errors.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

const testUrl = 'https://gorest.co.in/public/v2/';
describe('HttpErrorsInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorsInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // verifica intercettazione e gestione degli errori
  it('should intercept and handle errors', () => {
    const mockErrorResponse = { status: 500, statusText: 'Server Error' };

    httpClient.get(`${testUrl}?key=value`).subscribe({
      next: () => fail('should have failed with the network error'),
      error: (error) => {
        expect(error.message).toEqual('Errore interno del server.');
      }
    });

    const req = httpMock.expectOne((request) => request.url.startsWith(testUrl));
    req.flush(null, mockErrorResponse);
  });
});

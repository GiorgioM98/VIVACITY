import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpHeadersInterceptor } from './http-headers.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { User } from '../modelli/user.model';

describe('HttpHeadersInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpHeadersInterceptor,
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

  // verifica aggiunta header Authorization
  it('should add an Authorization header', () => {
    const userMock: User = {
      auth_token: 'YOUR_TOKEN',
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      gender: '',
      status: ''
    };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify(userMock);
      }
      return null;
    });

    httpClient.get('/test').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${userMock.auth_token}`);
    req.flush({});
  });

  // verifica non aggiunta header Authorization se user è null
  it('should not add an Authorization header if user is null', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);

    httpClient.get('/test').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toEqual(false);
    req.flush({});
  });

  // verifica non aggiunta header Authorization se URL Firebase
  it('should not add an Authorization header for Firebase URLs', () => {
    const firebaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]';

    httpClient.get(firebaseUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(firebaseUrl);
    expect(req.request.headers.has('Authorization')).toEqual(false);
    req.flush({});
  });

  // verifica non aggiunta header Authorization se auth_token mancante
  it('should not add an Authorization header if auth_token is missing', () => {
    const userMock: User = {
      auth_token: '',
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      gender: '',
      status: ''
    };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') {
        return JSON.stringify(userMock);
      }
      return null;
    });

    httpClient.get('/test').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toEqual(false);
    req.flush({});
  });
});

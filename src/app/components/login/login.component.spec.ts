import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of({
        localId: '12345',
        idToken: 'abcd1234',
        expiresIn: 3600
      })),
      createUser: jasmine.createSpy('createUser')
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatToolbarModule,
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Ripristina gli spy dopo ogni test per evitare conflitti
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifica isLoggedIn = false se i loggin fallisce
  it('should set isLoggedIn to false on failed login', fakeAsync(() => {
    // Simula un errore di login
    (authService.login as jasmine.Spy).and.returnValue(throwError({ status: 400 }));

    // Imposta valori validi nel modulo
    component.loginForm.setValue({ email: 'test@example.com', password: 'password', auth_token: 'authToken' });

    // Esegui la sottomissione del modulo
    component.onSubmit();
    tick();

    // Verifica che isLoggedIn sia false
    expect(component.isLoggedIn).toBeFalse();
  }));

  // verifica isLoggedIn = true se i loggin va a buon fine
  it('should set isLoggedIn to true on successful login', fakeAsync(() => {
    // Simula un login di successo
    const userData = { localId: '12345', idToken: 'abcd1234', expiresIn: 3600 };
    (authService.login as jasmine.Spy).and.returnValue(of(userData));

    // Imposta valori validi nel modulo
    component.loginForm.setValue({ email: 'test@example.com', password: 'password', auth_token: 'authToken' });

    // Esegui la sottomissione del modulo
    component.onSubmit();
    tick();

    // Verifica che isLoggedIn sia true
    expect(component.isLoggedIn).toBeTrue();
  }));

  // verifica che il modulo sia resettato
  it('should reset the login form on submit', fakeAsync(() => {
    // Imposta valori validi nel modulo
    component.loginForm.setValue({ email: 'test@example.com', password: 'password', auth_token: 'authToken' });

    // Esegui la sottomissione del modulo
    component.onSubmit();
    tick();

    // Verifica che il modulo sia stato resettato
    const resetFormValues = component.loginForm.value;
    expect(resetFormValues.email).toEqual('');
    expect(resetFormValues.password).toEqual('');
    expect(resetFormValues.auth_token).toEqual('');
  }));
});

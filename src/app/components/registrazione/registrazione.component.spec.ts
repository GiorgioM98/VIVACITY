import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrazioneComponent } from './registrazione.component';
import { AuthService } from '../../auth/auth.service';
import { GoRestService } from '../../servizi/go-rest.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

describe('RegistrazioneComponent', () => {
  let component: RegistrazioneComponent;
  let fixture: ComponentFixture<RegistrazioneComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let goRestService: jasmine.SpyObj<GoRestService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['registrazione', 'createUserRegistrazione']);
    const goRestSpy = jasmine.createSpyObj('GoRestService', ['creaNuovoUtente']);

    await TestBed.configureTestingModule({
      declarations: [RegistrazioneComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: GoRestService, useValue: goRestSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    goRestService = TestBed.inject(GoRestService) as jasmine.SpyObj<GoRestService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifica se il form e' valido quando tutti i campi sono compilati
  it('should have a valid form when all fields are filled', () => {
    component.registrazioneForm.setValue({
      name: 'John Doe',
      gender: 'male',
      email: 'john.doe@example.com',
      status: 'active',
      auth_token: 'token123'
    });

    expect(component.registrazioneForm.valid).toBeTrue();
  });

  // verifica se il form non e' valido quando un campo non e' compilato
  it('should have an invalid form when any field is missing', () => {
    component.registrazioneForm.setValue({
      name: '',
      gender: '',
      email: '',
      status: '',
      auth_token: ''
    });

    expect(component.registrazioneForm.invalid).toBeTrue();
  });
});

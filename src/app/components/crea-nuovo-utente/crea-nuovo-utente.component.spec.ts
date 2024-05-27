import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreaNuovoUtenteComponent } from './crea-nuovo-utente.component';
import { GoRestService } from '../../servizi/go-rest.service';
import { of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// preparazione setup del componente per i test
describe('CreaNuovoUtenteComponent', () => {
  let component: CreaNuovoUtenteComponent;
  let fixture: ComponentFixture<CreaNuovoUtenteComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<CreaNuovoUtenteComponent>>;
  let mockData: any;
  let mockGoRestService: jasmine.SpyObj<GoRestService>;

    // configurazione ambiente per i test
  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj(['close']);
    mockData = {};
    mockGoRestService = jasmine.createSpyObj('GoRestService', ['creaNuovoUtente']);
    await TestBed.configureTestingModule({
      declarations: [CreaNuovoUtenteComponent],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: GoRestService, useValue: mockGoRestService },
      ],
    }).compileComponents();
  });

  // continuo configurazione ambiente per i test
  beforeEach(() => {
    fixture = TestBed.createComponent(CreaNuovoUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // verifica se il componente è stato creato
  it('should create', () => {
    expect(component).toBeTruthy();
  });

    // verifica se il componente viene chiuso
   it('should close dialog when chiudi() is called', () => {
     component.chiudi();
     expect(mockDialogRef.close).toHaveBeenCalled();
   });

  //  verifica se il form viene inizializzato correttamente
   it('should initialize creaNuovoUtenteForm on ngOnInit', () => {
     component.ngOnInit();
     expect(component.creaNuovoUtenteForm).toBeDefined();
     expect(component.creaNuovoUtenteForm.controls['name']).toBeDefined();
     expect(component.creaNuovoUtenteForm.controls['gender']).toBeDefined();
     expect(component.creaNuovoUtenteForm.controls['email']).toBeDefined();
     expect(component.creaNuovoUtenteForm.controls['status']).toBeDefined();
   });

  //  verifica nel caso il form fosse invalido
  it('should not submit form if invalid', () => {
    component.creaNuovoUtenteForm.controls['email'].setValue('invalid-email');
    component.onSubmit();
    expect(mockGoRestService.creaNuovoUtente).not.toHaveBeenCalled();
  });

  // verifica set timeout per il reload window
  it('should set timeout to reload window after onSubmit()', () => {
    spyOn(component, 'reloadWindow');
    const formValue = { name: 'Test', gender: 'male', email: 'test@example.com', status: 'active' };
    component.creaNuovoUtenteForm.setValue(formValue);

    mockGoRestService.creaNuovoUtente.and.returnValue(of({}));

    jasmine.clock().install();
    component.onSubmit();
    jasmine.clock().tick(1001);

    expect(component.reloadWindow).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });
});

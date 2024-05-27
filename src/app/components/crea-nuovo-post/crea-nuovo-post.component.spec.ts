import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreaNuovoPostComponent } from './crea-nuovo-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GoRestService } from '../../servizi/go-rest.service';
import { of } from 'rxjs';

class MatDialogRefMock {
  close(): void { }
}
// preparazione setup del componente per i test
describe('CreaNuovoPostComponent', () => {
  let component: CreaNuovoPostComponent;
  let fixture: ComponentFixture<CreaNuovoPostComponent>;
  let goRestService: GoRestService;
  let dialogRef: MatDialogRef<CreaNuovoPostComponent>;

  // configurazione ambiente per i test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreaNuovoPostComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        HttpClientTestingModule,
        HttpClientModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  // continuo configurazione ambiente per i test
  beforeEach(() => {
    fixture = TestBed.createComponent(CreaNuovoPostComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    goRestService = TestBed.inject(GoRestService);
    fixture.detectChanges();
  });

  // verifica se il componente è stato creato
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifica se il componente viene chiuso
  it('should close dialog on close()', () => {
    const spyClose = spyOn(dialogRef, 'close');
    component.chiudi();
    expect(spyClose).toHaveBeenCalled();
  });

  // verifica se il form viene inviato
  it('should not submit form if invalid', () => {
    const spyGoRest = spyOn(goRestService, 'creaNuovoPost').and.returnValue(of({}));
    component.onSubmit();
    expect(spyGoRest).not.toHaveBeenCalled();
  });
});

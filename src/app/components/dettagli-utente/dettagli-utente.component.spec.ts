import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DettagliUtenteComponent } from './dettagli-utente.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GoRestService } from '../../servizi/go-rest.service';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';

describe('DettagliUtenteComponent', () => {
  let component: DettagliUtenteComponent;
  let fixture: ComponentFixture<DettagliUtenteComponent>;
  let goRestServiceSpy: jasmine.SpyObj<GoRestService>;

  beforeEach(async () => {
    const goRestSpy = jasmine.createSpyObj('GoRestService', [
      'caricaPostUtente',
      'caricaCommentiPost',
      'caricaCommentoUtente',
    ]);

    await TestBed.configureTestingModule({
      declarations: [DettagliUtenteComponent],
      imports: [FormsModule, HttpClientTestingModule, MatCardModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: GoRestService, useValue: goRestSpy },
      ],
    }).compileComponents();

    goRestServiceSpy = TestBed.inject(
      GoRestService
    ) as jasmine.SpyObj<GoRestService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // verifica il caricamento dei commenti per un post specifico
  it('should load comments for a specific post', () => {
    const postId = 126957;
    const sampleComments = [
      { name: 'Commenter 1', body: 'Comment body 1' },
      { name: 'Commenter 2', body: 'Comment body 2' },
    ];

    // Simulazione del ritorno dei commenti dal servizio
    goRestServiceSpy.caricaCommentiPost.and.returnValue(of(sampleComments));

    // Chiamata al metodo per caricare i commenti per un post specifico
    component.caricaCommentiPost(postId);

    // Verifica che il metodo del servizio sia stato chiamato con l'ID del post corretto
    expect(goRestServiceSpy.caricaCommentiPost).toHaveBeenCalledWith(postId);

    // Verifica che i commenti caricati nel componente siano corretti
    expect(component.commenti[postId]).toEqual(sampleComments);
  });

  // verifica il non caricamento dei commenti per un post specifico
  it('should not submit comment if postId or comment body is missing', () => {
    const postId = 126957;
    const commentoForm = { value: { commento: 'Test comment' } } as NgForm;
    spyOn(console, 'error');
    component.onSubmit(postId, commentoForm);
    expect(goRestServiceSpy.caricaCommentoUtente).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });

  // verifica se il componente viene chiuso
  it('should close dialog when chiudi() is called', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);
    component.dialogRef = dialogRefSpyObj;
    component.chiudi();
    expect(dialogRefSpyObj.close).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { GoRestService } from '../../servizi/go-rest.service';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DettagliUtenteComponent } from '../dettagli-utente/dettagli-utente.component';
import { CreaNuovoUtenteComponent } from '../crea-nuovo-utente/crea-nuovo-utente.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let goRestServiceSpy: jasmine.SpyObj<GoRestService>;

  beforeEach(async () => {
    const goRestSpy = jasmine.createSpyObj('GoRestService', ['listaUtenti', 'eliminaUtente']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatDialogModule, HttpClientTestingModule, MatFormFieldModule, FormsModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, MatPaginator, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: GoRestService, useValue: goRestSpy }
      ]
    }).compileComponents();

    goRestServiceSpy = TestBed.inject(GoRestService) as jasmine.SpyObj<GoRestService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // verifica creazione componente
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifica caricamento utenti
  it('should load users on initialization', () => {
    const mockUsers = [{ id: 1, name: 'John', email: 'john@example.com', status: 'active' }];
    goRestServiceSpy.listaUtenti.and.returnValue(of(mockUsers));
    component.ngOnInit();
    expect(goRestServiceSpy.listaUtenti).toHaveBeenCalled();
    expect(component.utenti).toEqual(mockUsers);
    expect(component.utentiFiltrati).toEqual(mockUsers);
  });

  // verifica filtro user by name
  it('should filter users by name', () => {
    const mockUsers = [
      { id: 1, name: 'John', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane', email: 'jane@example.com', status: 'active' }
    ];
    component.utenti = mockUsers;
    component.searchQuery = 'John';
    component.filtroUtenti();
    expect(component.utentiFiltrati).toEqual([mockUsers[0]]);
  });

  // Verifica il cambio di pagina
  it('should handle page change event', () => {
    const pageEvent = { pageIndex: 2, pageSize: 25, length: 3000 } as PageEvent;
    component.handlePageEvent(pageEvent);
    expect(component.pageIndex).toEqual(pageEvent.pageIndex);
    expect(component.pageSize).toEqual(pageEvent.pageSize);
    expect(component.length).toEqual(pageEvent.length);
    expect(goRestServiceSpy.listaUtenti).toHaveBeenCalled();
  });

  // Verifica l'apertura del dialog per dettagli utente
  it('should open user details dialog', () => {
    const mockUser = { id: 1, name: 'John', email: 'john@example.com', status: 'active' };
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), open: null });
    dialogRefSpyObj.afterClosed.and.returnValue(of({}));
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.apriDettagliUtente(mockUser);
    expect(dialogSpy).toHaveBeenCalledOnceWith(DettagliUtenteComponent, {
      width: '60%',
      data: mockUser
    });
  });

  // Verifica l'apertura del dialog per la creazione di un nuovo utente
  it('should open create user dialog', () => {
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}), open: null });
    dialogRefSpyObj.afterClosed.and.returnValue(of({}));
    const dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.apriCreaUtente();
    expect(dialogSpy).toHaveBeenCalledOnceWith(CreaNuovoUtenteComponent, {
      width: '60%',
      data: null
    });
  });

  // Verifica l'eliminazione di un utente
  it('should delete user', () => {
    const mockUserId = 1;
    const mockUsers = [
      { id: 1, name: 'John', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane', email: 'jane@example.com', status: 'active' }
    ];
    component.utenti = mockUsers;
    component.utentiFiltrati = mockUsers; // Inizializziamo anche l'array utentiFiltrati con i mockUsers

    const confirmSpy = spyOn(window, 'confirm').and.returnValue(true);
    goRestServiceSpy.eliminaUtente.and.returnValue(of({}));

    component.eliminaUtente(mockUserId);

    // Verifica che l'utente sia stato eliminato dall'array utenti
    expect(component.utenti.length).toBe(mockUsers.length - 1);
    expect(component.utenti.some(user => user.id === mockUserId)).toBeFalse();

    // Verifica che l'array utentiFiltrati sia stato aggiornato correttamente
    expect(component.utentiFiltrati.length).toBe(mockUsers.length - 1);
    expect(component.utentiFiltrati.some(user => user.id === mockUserId)).toBeFalse();
  });

});

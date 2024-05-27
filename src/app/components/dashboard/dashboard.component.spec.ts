import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../auth/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// preparazione setup del componente per i test
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

    // configurazione ambiente per i test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        RouterTestingModule,
        HttpClientTestingModule,
        RouterModule,

        NoopAnimationsModule,
      ],
      providers: [AuthService],
    }).compileComponents();
  });

    // continuo configurazione ambiente per i test
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    // verifica se il componente è stato creato
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifica se la funzione logout viene chiamata correttamente
  it('should call authService.logout() when onLogout() is called', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const authService = TestBed.inject(AuthService);
    const logoutSpy = spyOn(authService, 'logout').and.stub();
    component.onLogout();
    expect(logoutSpy).toHaveBeenCalled();
  });

  // verifica che la funzione non venga chiamta se l utente annulla il logout
  it('should not call authService.logout() when onLogout() is called and user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const authService = TestBed.inject(AuthService);
    const logoutSpy = spyOn(authService, 'logout').and.stub();
    component.onLogout();
    expect(logoutSpy).not.toHaveBeenCalled();
  });
});

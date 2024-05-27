import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatLabel } from '@angular/material/form-field';
import { MatSidenav } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';






import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostComponent } from './components/post/post.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptor';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { DettagliUtenteComponent } from './components/dettagli-utente/dettagli-utente.component';
import { CreaNuovoUtenteComponent } from './components/crea-nuovo-utente/crea-nuovo-utente.component';
import { CreaNuovoPostComponent } from './components/crea-nuovo-post/crea-nuovo-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    PostComponent,
    ProfiloComponent,
    LoginComponent,
    RegistrazioneComponent,
    DettagliUtenteComponent,
    CreaNuovoUtenteComponent,
    CreaNuovoPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatListModule,
    MatLabel,
    MatSidenav,
    MatToolbarModule,
    MatIconButton,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbar,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpHeadersInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorsInterceptor, multi: true },
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

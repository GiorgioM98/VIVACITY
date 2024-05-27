import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfiloComponent } from './profilo.component';
import { GoRestService } from '../../servizi/go-rest.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('ProfiloComponent', () => {
  let component: ProfiloComponent;
  let fixture: ComponentFixture<ProfiloComponent>;
  let goRestServiceSpy: jasmine.SpyObj<GoRestService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GoRestService', ['caricaPostUtente', 'caricaCommentiPost', 'caricaCommentoUtente']);

    await TestBed.configureTestingModule({
      declarations: [ ProfiloComponent ],
      imports: [
        MatDialogModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
        HttpClientModule
      ],
      providers: [
        { provide: GoRestService, useValue: spy }
      ]
    })
    .compileComponents();

    goRestServiceSpy = TestBed.inject(GoRestService) as jasmine.SpyObj<GoRestService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifica caricamento commenti per post
  it('should load comments for a post', () => {
    const postId = 1;
    const mockComments = [{ id: 1, postId: postId, name: 'Test User', body: 'Test comment body' }];
    goRestServiceSpy.caricaCommentiPost.and.returnValue(of(mockComments));

    component.caricaCommentiPost(postId);

    expect(component.commenti[postId]).toEqual(mockComments);
    expect(goRestServiceSpy.caricaCommentiPost).toHaveBeenCalledWith(postId);
  });

});


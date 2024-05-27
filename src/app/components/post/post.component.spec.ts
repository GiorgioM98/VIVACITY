import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GoRestService } from '../../servizi/go-rest.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let goRestService: GoRestService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        MatCardModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        FormsModule,
        NoopAnimationsModule

      ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: GoRestService,
          useValue: {
            listaPost: jasmine.createSpy('listaPost').and.returnValue(of([])),
            caricaCommentiPost: jasmine.createSpy('caricaCommentiPost').and.returnValue(of([])),
            caricaCommentoUtente: jasmine.createSpy('caricaCommentoUtente').and.returnValue(of({})),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    goRestService = TestBed.inject(GoRestService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // verifica caricamento post iniziale
  it('should load posts on init', fakeAsync(() => {
    const mockPosts = [{ id: 1, title: 'Test Title', body: 'Test Body', user_id: 1 }];
    (goRestService.listaPost as jasmine.Spy).and.returnValue(of(mockPosts));
    component.ngOnInit();
    tick();
    expect(goRestService.listaPost).toHaveBeenCalled();
    expect(component.posts).toEqual(mockPosts);
    expect(component.postsFiltrati).toEqual(mockPosts);
  }));

  // verifica ricerca per titolo
  it('should filter posts by title', () => {
    const mockPosts = [
      { id: 1, title: 'First Title', body: 'Test Body 1', user_id: 1 },
      { id: 2, title: 'Second Title', body: 'Test Body 2', user_id: 2 },
    ];
    component.posts = mockPosts;

    component.searchQuery = 'First';
    component.tipoRicerca = 'title';
    component.filtroPosts();

    expect(component.postsFiltrati.length).toBe(1);
    expect(component.postsFiltrati[0].title).toBe('First Title');
  });

  // verifica ricerca per body
  it('should filter posts by body', () => {
    const mockPosts = [
      { id: 1, title: 'First Title', body: 'Test Body 1', user_id: 1 },
      { id: 2, title: 'Second Title', body: 'Test Body 2', user_id: 2 },
    ];
    component.posts = mockPosts;

    component.searchQuery = 'Test Body 2';
    component.tipoRicerca = 'body';
    component.filtroPosts();

    expect(component.postsFiltrati.length).toBe(1);
    expect(component.postsFiltrati[0].title).toBe('Second Title');
  });

  // verifica caricamento commenti per post
  it('should load comments for a post', fakeAsync(() => {
    const mockComments = [
      { id: 1, name: 'Commenter', body: 'Test Comment 1' },
      { id: 2, name: 'Commenter 2', body: 'Test Comment 2' },
    ];
    (goRestService.caricaCommentiPost as jasmine.Spy).and.returnValue(of(mockComments));

    const postId = 1;
    component.caricaCommentiPost(postId);
    tick();

    expect(goRestService.caricaCommentiPost).toHaveBeenCalledWith(postId);
    expect(component.commenti[postId]).toEqual(mockComments);
  }));
});

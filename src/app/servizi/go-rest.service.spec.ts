import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GoRestService } from './go-rest.service';

describe('GoRestService', () => {
  let service: GoRestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GoRestService]
    });
    service = TestBed.inject(GoRestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // verifica del metodo per creare un nuovo utente
  it('should create a new user', () => {
    const dummyUser = {
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active'
    };

    service.creaNuovoUtente(dummyUser).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.name).toBe(dummyUser.name);
      expect(response.email).toBe(dummyUser.email);
      expect(response.status).toBe(dummyUser.status);
    });

    const req = httpMock.expectOne(`${service.base_url}users`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyUser);
  });

  // verifica del metodo per creare un nuovo post
  it('should create a new post', () => {
    const dummyPost = {
      title: 'Post Title',
      body: 'Post body content'
    };
    const url = `${service.base_url}posts`;

    service.creaNuovoPost(url, dummyPost).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.title).toBe(dummyPost.title);
      expect(response.body).toBe(dummyPost.body);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(dummyPost);
  });

  // verifica del metodo per ottenere la lista di utenti
  it('should get a list of users', () => {
    const dummyUsers = [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', status: 'inactive' }
    ];
    const page = 1;
    const per_page = 10;

    service.listaUtenti(page, per_page).subscribe(response => {
      expect(response).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne(`${service.base_url}users?page=${page}&per_page=${per_page}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });

  // verifica del metodo per ottenere tutti post di un utente
  it('should get all posts of a user', () => {
    const dummyPosts = [
      { id: 1, title: 'First Post', body: 'Post body content' },
      { id: 2, title: 'Second Post', body: 'Another post body content' }
    ];
    const userId = 1;

    service.caricaPostUtente(userId).subscribe(response => {
      expect(response).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.base_url}users/${userId}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  // verifica del metodo per ottenere tutti i commenti di un post
  it('should get all comments of a post', () => {
    const dummyComments = [
      { id: 1, body: 'First comment' },
      { id: 2, body: 'Second comment' }
    ];
    const postId = 1;

    service.caricaCommentiPost(postId).subscribe(response => {
      expect(response).toEqual(dummyComments);
    });

    const req = httpMock.expectOne(`${service.base_url}posts/${postId}/comments`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyComments);
  });

  // verifica del metodo per creare un nuovo commento
  it('should send a comment for a post', () => {
    const dummyComment = {
      body: 'New comment'
    };
    const url = `${service.base_url}posts/1/comments`;

    service.caricaCommentoUtente(url, dummyComment).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.body).toBe(dummyComment.body);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('POST');
    req.flush(dummyComment);
  });

  // verifica del metodo per ottenere la lista di post
  it('should get a list of posts', () => {
    const dummyPosts = [
      { id: 1, title: 'First Post', body: 'Post body content' },
      { id: 2, title: 'Second Post', body: 'Another post body content' }
    ];
    const page = 1;
    const per_page = 10;

    service.listaPost(page, per_page).subscribe(response => {
      expect(response).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${service.base_url}posts?page=${page}&per_page=${per_page}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  // verifica del metodo per eliminare un utente
  it('should delete a user', () => {
    const userId = 1;

    service.eliminaUtente(userId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.base_url}users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

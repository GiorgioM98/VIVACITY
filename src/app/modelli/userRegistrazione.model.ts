// modello userRegistrazione creato da registrazione nel local storage che useremo per i dati dell'utente
export class UserRegistrazione {
  constructor(
    public name: string,
    public gender: string,
    public email: string,
    public status: string,
    public auth_token: string,
    public id: number
  ) { }

}


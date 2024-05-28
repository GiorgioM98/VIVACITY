// modello user creato da login nel locale storage che useremo per l'expiraztion date
export class User {
  constructor(
    public name: string,
    public gender: string,
    public email: string,
    public status: string,
    public auth_token: string,
    public id: number,
  ) { }

}

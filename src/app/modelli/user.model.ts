// modello user creato da login nel locale storage che useremo per l'expiraztion date
export class User {
  constructor(
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date,

  ) { }
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null
    }
    return this._token
  }
}

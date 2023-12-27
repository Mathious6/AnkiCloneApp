export class User {
  private _userId!: number;
  private _mail!: string;
  private _pseudo!: string;
  private _password!: string;
  private _registrationDate!: Date;
  private _profilePicture: string;
  private _isActive!: boolean;

  constructor(
    userId: number,
    mail: string,
    pseudo: string,
    password: string,
    registrationDate: Date,
    profilePicture: string,
    isActive: boolean
  ) {
    this._userId = userId;
    this._mail = mail;
    this._pseudo = pseudo;
    this._password = password;
    this._registrationDate = registrationDate;
    this._profilePicture = profilePicture;
    this._isActive = isActive;
  }

  // Getters
  get userId(): number {
    return this._userId;
  }

  get mail(): string {
    return this._mail;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  get password(): string {
    return this._password;
  }

  get registrationDate(): Date {
    return this._registrationDate;
  }

  get profilePicture(): string {
    return this._profilePicture;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  // Setters
  set userId(userId: number) {
    this._userId = userId;
  }

  set mail(mail: string) {
    this._mail = mail;
  }

  set pseudo(pseudo: string) {
    this._pseudo = pseudo;
  }

  set password(password: string) {
    this._password = password;
  }

  set registrationDate(registrationDate: Date) {
    this._registrationDate = registrationDate;
  }

  set profilePicture(profilePicture: string) {
    this._profilePicture = profilePicture;
  }

  set isActive(isActive: boolean) {
    this._isActive = isActive;
  }
}

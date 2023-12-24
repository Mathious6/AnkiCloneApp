export class User {
  private userId!: number;
  private mail!: string;
  private pseudo!: string;
  private password!: string;
  private registrationDate!: Date;
  private profilePicture: string;
  private isActive!: boolean;

  constructor(userId: number, mail: string, pseudo: string, password: string, registrationDate: Date,
    profilePicture: string, isActive: boolean) {
    this.userId = userId;
    this.mail = mail;
    this.pseudo = pseudo;
    this.password = password;
    this.registrationDate = registrationDate;
    this.profilePicture = profilePicture;
    this.isActive = isActive;
  }

  // Getters
  getUserId(): number {
    return this.userId;
  }

  getMail(): string {
    return this.mail;
  }

  getPseudo(): string {
    return this.pseudo;
  }

  getPassword(): string {
    return this.password;
  }

  getRegistrationDate(): Date {
    return this.registrationDate;
  }

  getProfilePicture(): string {
    return this.profilePicture;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  // Setters
  setUserId(userId: number): void {
    this.userId = userId;
  }

  setMail(mail: string): void {
    this.mail = mail;
  }

  setPseudo(pseudo: string): void {
    this.pseudo = pseudo;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  setRegistrationDate(registrationDate: Date): void {
    this.registrationDate = registrationDate;
  }

  setProfilePicture(profilePicture: string): void {
    this.profilePicture = profilePicture;
  }

  setIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

}

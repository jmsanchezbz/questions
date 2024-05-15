export class Profile {
  public id: number;
  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public role: string;

  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

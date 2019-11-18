export interface UserAccount {
  id: string;
  alias: string;
  data: any;
  website: string;
}

export interface UserAccountDto {
  id: string;
  alias: string;
  website: string;
  loggedIn: boolean;
  username: string;
}
export class User {
  id!: number;
  providerUserId!: string;
  email: string;
  enabled!: boolean;
  displayName!: string;
  createdDate!: Date;
  modifiedDate!: Date;
  password!: string;
  provider!: string;
}

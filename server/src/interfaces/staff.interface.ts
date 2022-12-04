export interface NewStaff {
  name: string;
  email: string;
  password: string;
  retype_password: string;
}

export interface RegisterReturn {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  staff: {
    id: string;
    name: string;
    email: string;
    created_at: Date;
  };
}

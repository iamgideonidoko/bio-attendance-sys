export interface StaffInfo {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface State {
  // states
  count: number;
  staffInfo: StaffInfo | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  // actions
  increment: () => void;
  decrement: () => void;
  loginStaff: (data: Tokens & { staff: StaffInfo }) => void;
  logoutStaff: () => void;
}

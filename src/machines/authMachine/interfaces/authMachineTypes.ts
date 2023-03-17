import { LoginProps, RegisterProps } from '@/api/interfaces/userServiceTypes';
import { User } from '@/api/models/userModel';
import { State } from 'xstate';
import { ErrorResponse } from '@/api/interfaces/clientTypes';

export interface AuthMachineContext {
  errorResponse?: ErrorResponse;
  loginProps?: LoginProps;
  registerProps?: RegisterProps;
  user?: User | null;
}

export type AuthMachineEvent =
  | { type: 'LOGIN'; loginProps: LoginProps }
  | { type: 'REGISTER'; registerProps: RegisterProps }
  | { type: 'SET_USER'; user: User }
  | { type: 'LOGOUT' };

export type AuthMachineSchema = {
  login: {
    data: User;
  };
};

export type AuthMachineState = State<AuthMachineContext, AuthMachineEvent>;

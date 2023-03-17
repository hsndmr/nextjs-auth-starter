import { assign, createMachine } from 'xstate';
import {
  AuthMachineContext,
  AuthMachineEvent,
  AuthMachineSchema,
} from '@/machines/authMachine/interfaces/authMachineTypes';
import { LoginProps, RegisterProps } from '@/api/interfaces/userServiceTypes';
import { STORAGE_USER_KEY } from '@/machines/authMachine/constants';
import { userService } from '@/api/services/services';
import { User } from '@/api/models/userModel';
import { ErrorResponse } from '@/api/interfaces/clientTypes';

const authMachine = createMachine(
  {
    id: 'auth',
    context: {} as AuthMachineContext,
    schema: {
      events: {} as AuthMachineEvent,
      services: {} as AuthMachineSchema,
    },
    initial: 'idle',
    predictableActionArguments: true,
    tsTypes: {} as import('./auth.machine.typegen').Typegen0,
    states: {
      idle: {
        on: {
          SET_USER: [
            {
              cond: (_, event) => !!event.user,
              actions: assign((_, event) => ({
                user: event.user,
              })),
              target: 'loggedIn',
            },
            {
              target: 'loggedOut',
              actions: assign(() => ({
                user: null,
              })),
            },
          ],
        },
      },
      loggedOut: {
        on: {
          LOGIN: {
            target: 'loggingIn',
            actions: assign((_, event) => ({
              loginProps: event.loginProps,
            })),
          },
          REGISTER: {
            target: 'registering',
            actions: assign((_, event) => ({
              registerProps: event.registerProps,
            })),
          },
        },
      },
      loggingIn: {
        entry: 'clearErrorResponse',
        invoke: {
          src: (context) => userService.login(context.loginProps as LoginProps),
          onDone: {
            target: 'loggedIn',
            actions: [
              'assignUserToContext',
              'assignUserToLocalStorage',
              'loggedIn',
            ],
          },
          onError: {
            target: 'loggedOut',
            actions: 'assignErrorResponseToContext',
          },
        },
      },
      registering: {
        entry: 'clearErrorResponse',
        invoke: {
          src: (context) =>
            userService.register(context.registerProps as RegisterProps),
          onDone: {
            target: 'loggedIn',
            actions: [
              'assignUserToContext',
              'assignUserToLocalStorage',
              'loggedIn',
            ],
          },
          onError: {
            target: 'loggedOut',
            actions: 'assignErrorResponseToContext',
          },
        },
      },
      loggedIn: {
        on: {
          LOGOUT: {
            target: 'loggingOut',
          },
        },
      },
      loggingOut: {
        invoke: {
          src: () => userService.logout(),
          onDone: {
            target: 'loggedOut',
            actions: [
              'clearUserFromLocalStorage',
              'clearUserFromContext',
              'loggedOut',
            ],
          },
          onError: {
            target: 'loggedIn',
          },
        },
      },
    },
  },
  {
    actions: {
      clearUserFromLocalStorage: () => {
        window.localStorage.removeItem(STORAGE_USER_KEY);
      },
      assignUserToLocalStorage: (context) => {
        window.localStorage.setItem(
          STORAGE_USER_KEY,
          JSON.stringify(context.user),
        );
      },
      assignUserToContext: assign((_, event) => ({
        user: event.data as User,
      })),
      assignErrorResponseToContext: assign((_, event) => ({
        errorResponse: event.data as ErrorResponse,
      })),
      clearErrorResponse: assign(() => ({
        errorResponse: undefined,
      })),
      clearUserFromContext: assign(() => ({
        user: undefined,
      })),
    },
    services: {},
  },
);

export default authMachine;

// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.auth.loggingIn:invocation[0]': {
      type: 'done.invoke.auth.loggingIn:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.auth.loggingOut:invocation[0]': {
      type: 'done.invoke.auth.loggingOut:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.auth.registering:invocation[0]': {
      type: 'done.invoke.auth.registering:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.auth.loggingIn:invocation[0]': {
      type: 'error.platform.auth.loggingIn:invocation[0]';
      data: unknown;
    };
    'error.platform.auth.registering:invocation[0]': {
      type: 'error.platform.auth.registering:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: 'loggedIn' | 'loggedOut';
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    assignErrorResponseToContext:
      | 'error.platform.auth.loggingIn:invocation[0]'
      | 'error.platform.auth.registering:invocation[0]';
    assignUserToContext:
      | 'done.invoke.auth.loggingIn:invocation[0]'
      | 'done.invoke.auth.registering:invocation[0]';
    assignUserToLocalStorage:
      | 'done.invoke.auth.loggingIn:invocation[0]'
      | 'done.invoke.auth.registering:invocation[0]';
    clearErrorResponse: 'LOGIN' | 'REGISTER';
    clearUserFromContext: 'done.invoke.auth.loggingOut:invocation[0]';
    clearUserFromLocalStorage: 'done.invoke.auth.loggingOut:invocation[0]';
    loggedIn:
      | 'done.invoke.auth.loggingIn:invocation[0]'
      | 'done.invoke.auth.registering:invocation[0]';
    loggedOut: 'done.invoke.auth.loggingOut:invocation[0]';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | 'idle'
    | 'loggedIn'
    | 'loggedOut'
    | 'loggingIn'
    | 'loggingOut'
    | 'registering';
  tags: never;
}

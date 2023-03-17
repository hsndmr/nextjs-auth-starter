import React, { createContext, PropsWithChildren, useEffect } from 'react';
import { useInterpret } from '@xstate/react';
import { InterpreterFrom } from 'xstate';
import authMachine from '@/machines/authMachine/auth.machine';
import { useRouter } from 'next/router';
import { STORAGE_USER_KEY } from '@/machines/authMachine/constants';
import { Route } from '@/constants/route';

export const GlobalStateContext = createContext(
  {} as {
    authMachineService: InterpreterFrom<typeof authMachine>;
  },
);

export const GlobalStateProvider = ({ children }: PropsWithChildren) => {
  const isWindow = typeof window !== 'undefined';

  const router = useRouter();

  const authMachineService = useInterpret(authMachine, {
    actions: {
      loggedIn: () => {
        router.push(Route.DASHBOARD);
      },
      loggedOut: () => {
        router.push(Route.LOGIN);
      },
    },
  });

  useEffect(() => {
    const user =
      window.localStorage.getItem(STORAGE_USER_KEY) &&
      JSON.parse(window.localStorage.getItem(STORAGE_USER_KEY) as string);

    authMachineService.send('SET_USER', {
      user,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWindow]);

  return (
    <GlobalStateContext.Provider
      value={{
        authMachineService,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

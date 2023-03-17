import React, { useContext, useEffect, useRef } from 'react';
import { GlobalStateContext } from '@/providers/GlobalStateProvider';
import { useSelector } from '@xstate/react';
import { useRouter } from 'next/router';
import { Route } from '@/constants/route';
import { LayoutKeys } from '@/layouts/Layouts';

interface Props {
  [key: string]: any;
}

const withGuestsOnly = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const GuestComponent: React.FC<P & Props> & {
    Layout?: LayoutKeys;
  } = (props) => {
    const isInitialized = useRef(false);
    const router = useRouter();
    const { authMachineService } = useContext(GlobalStateContext);

    const user = useSelector(authMachineService, (state) => state.context.user);

    useEffect(() => {
      if (isInitialized.current) {
        return;
      }

      if (user === undefined) {
        return;
      }

      isInitialized.current = true;

      if (user !== null) {
        router.push(Route.DASHBOARD);
        return;
      }
    }, [user, router]);

    return <Component {...(props as P)} />;
  };
  return GuestComponent;
};

export default withGuestsOnly;

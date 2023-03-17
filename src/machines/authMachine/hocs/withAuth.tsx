import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef } from 'react';
import { GlobalStateContext } from '@/providers/GlobalStateProvider';
import { useSelector } from '@xstate/react';
import { LayoutKeys } from '@/layouts/Layouts';
import { Route } from '@/constants/route';
interface Props {
  [key: string]: any;
}
const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthComponent: React.FC<P & Props> & {
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

      if (user === null) {
        router.push(Route.LOGIN);
        return;
      }
    }, [user, router]);

    if (!user) {
      return null;
    }

    return <Component {...(props as P)} />;
  };

  return AuthComponent;
};

export default withAuth;

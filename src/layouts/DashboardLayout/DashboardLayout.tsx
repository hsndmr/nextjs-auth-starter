import React, { PropsWithChildren, useContext } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '@/layouts/DashboardLayout/Sidebar';
import ProfileMenu from '@/features/ProfileMenu/ProfileMenu';
import { GlobalStateContext } from '@/providers/GlobalStateProvider';
import { useSelector } from '@xstate/react';

interface Props extends PropsWithChildren {
  window?: () => Window;
}

const DRAWER_WIDTH = 300;

export default function DashboardLayout({ children }: Props) {
  const { authMachineService } = useContext(GlobalStateContext);

  const user = useSelector(authMachineService, (state) => state.context.user);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          backgroundColor: 'transparent',
          borderBottom: '1px solid #ccc',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box>
              <Typography
                color="primary.main"
                variant="h6"
                noWrap
                component="div"
              >
                NextJS Auth Starter
              </Typography>
            </Box>
            <Box>
              <ProfileMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          ['& .MuiDrawer-paper']: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
          },
        }}
      >
        <Toolbar />
        <Sidebar />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <main>{children}</main>
      </Box>
    </Box>
  );
}

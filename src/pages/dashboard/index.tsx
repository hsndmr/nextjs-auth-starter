import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import withAuth from '@/machines/authMachine/hocs/withAuth';

const Dashboard = withAuth(() => {
  return (
    <Box>
      <Typography>Dashboard</Typography>
    </Box>
  );
});

Dashboard.Layout = 'Dashboard';

export default Dashboard;

import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LoginForm from '@/features/LoginForm/LoginForm';
import withGuestsOnly from '@/machines/authMachine/hocs/withGuestsOnly';

const Home = withGuestsOnly(() => {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <LoginForm />
        </Box>
      </Container>
    </>
  );
});

export default Home;

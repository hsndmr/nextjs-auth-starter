import Head from 'next/head';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import RegisterForm from '@/features/RegisterForm/RegisterForm';
import withGuestsOnly from '@/machines/authMachine/hocs/withGuestsOnly';

const Register = withGuestsOnly(() => {
  return (
    <>
      <Head>
        <title>Register</title>
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
          <RegisterForm />
        </Box>
      </Container>
    </>
  );
});

export default Register;

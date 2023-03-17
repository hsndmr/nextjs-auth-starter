import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginFormSchema from '@/features/LoginForm/loginFormSchema';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { LoginProps } from '@/api/interfaces/userServiceTypes';
import { useContext } from 'react';
import { GlobalStateContext } from '@/providers/GlobalStateProvider';
import { useActor } from '@xstate/react';

export default function LoginForm() {
  const { authMachineService } = useContext(GlobalStateContext);

  const [state] = useActor(authMachineService);

  const { errorResponse } = state.context;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(loginFormSchema),
  });
  const onSubmit = (data: LoginProps) => {
    authMachineService.send('LOGIN', {
      loginProps: data,
    });
  };

  return (
    <Card variant="outlined" sx={{ width: '100%', py: 3, px: 1 }}>
      <CardHeader title="Sign in" />
      <Box method="post" component="form" onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Email"
            size="small"
            {...register('email')}
            error={!!errors.email}
            helperText={errors?.email?.message as string}
            margin="normal"
            autoComplete="email"
            autoFocus
          />
          <TextField
            fullWidth
            label="Password"
            size="small"
            {...register('password')}
            error={!!errors.password}
            helperText={errors?.password?.message as string}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            type="password"
          />
          <ErrorMessage
            sx={{
              mt: 2,
            }}
            errors={errorResponse?.errors}
          />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <Button
            disabled={state.matches('loggingIn')}
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

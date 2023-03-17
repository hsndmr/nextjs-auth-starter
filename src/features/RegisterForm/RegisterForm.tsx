import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import IRegisterForm from '@/features/RegisterForm/registerFormInterface';
import registerFormSchema from '@/features/RegisterForm/registerFormSchema';
import { useContext } from 'react';
import { GlobalStateContext } from '@/providers/GlobalStateProvider';
import { useActor } from '@xstate/react';

export default function RegisterForm() {
  const { authMachineService } = useContext(GlobalStateContext);

  const [state] = useActor(authMachineService);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    resolver: yupResolver(registerFormSchema),
  });
  const onSubmit = async (data: IRegisterForm) => {
    authMachineService.send('REGISTER', {
      registerProps: data,
    });
  };

  return (
    <Card variant="outlined" sx={{ width: '100%', py: 3, px: 1 }}>
      <CardHeader title="Register" />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Name"
            size="small"
            {...register('name')}
            error={!!errors.name}
            helperText={errors?.name?.message as string}
            margin="normal"
            autoFocus
          />
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            label="Lastname"
            size="small"
            {...register('lastName')}
            error={!!errors.lastName}
            helperText={errors?.lastName?.message as string}
            margin="normal"
            autoFocus
          />
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
            errors={state.context.errorResponse?.errors}
          />
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <Button
            disabled={state.matches('registering')}
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

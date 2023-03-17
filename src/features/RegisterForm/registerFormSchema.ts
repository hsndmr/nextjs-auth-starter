import * as yup from 'yup';

const registerFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  name: yup.string().required('Name is required'),
  lastName: yup.string().required('Last name is required'),
});

export default registerFormSchema;

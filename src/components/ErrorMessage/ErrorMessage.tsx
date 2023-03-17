import ErrorMessageProps from '@/components/ErrorMessage/errorMessageTypes';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box/Box';

export default function ErrorMessage({
  errors,
  ...props
}: ErrorMessageProps & BoxProps) {
  const renderError = () => {
    if (!errors) {
      return null;
    }

    if (Array.isArray(errors)) {
      return (
        <>
          {errors.map((error, index) => (
            <Alert key={index} severity="error">
              {error}
            </Alert>
          ))}
        </>
      );
    }

    return <Alert severity="error">{errors}</Alert>;
  };

  return <Box {...props}>{renderError()}</Box>;
}

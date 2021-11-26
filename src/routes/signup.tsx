import * as React from 'react';
import Box from '@mui/material/Box';
import { connect } from 'react-redux';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { AUTH, HOME } from '../urls/frontendUrl';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { registerUser } from "../actions/AuthActions";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function SignUp(props: any) {

  const [hasError, setHasError] = React.useState(false);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setHasError(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    props.registerUser({
      login: data.get('login'),
      fullName: data.get('fullname'),
      password: data.get('password'),
    }).then(() => {
      window.location.href = HOME;
    }).catch(() => {
      setHasError(true);
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <p style={{ color: 'red', textAlign: 'center', display: hasError ? 'block' : 'none' }}>
              This login is not available
            </p>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href={AUTH.LOGIN} variant="body2">
                  {"Already have an account? Sign Ip"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default connect(() => { return {} }, { registerUser })(SignUp);
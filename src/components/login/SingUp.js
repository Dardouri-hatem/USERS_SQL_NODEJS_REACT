import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { registerUser } from "../../JS/actions/usersAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const [state, setstate] = useState({
    name: "",
    family_name: "",
    password: "",
  });
  const classes = useStyles();

  // Get Input
  const handleChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };

  //Register
  const register = (e, payload) => {
    e.preventDefault();
    props.registerUser(payload);
  };

  return (
    <Container component="main" maxWidth="xs">
      {props.msg_success ? <Redirect to="/" /> : null}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {props.error.id !== "REGISTER_FAIL" ? null : (
          <Alert severity="error"> {props.error.msg}</Alert>
        )}
        <form className={classes.form} noValidate method="POST">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="family_name"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) =>
              register(e, {
                name: state.name,
                family_name: state.family_name,
                password: state.password,
              })
            }
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return { msg_success: state.users.msg_success, error: state.error };
};

export default connect(mapStateToProps, { registerUser })(SignUp);

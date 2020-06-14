import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from "../../JS/actions/usersAction"


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [state, setstate] = useState({ name: "", password: "" });

// Get Input
  const handleChange=(e)=>{
    setstate({...state,[e.target.name] : e.target.value})  
}
const login = (e,payload)=>{
    e.preventDefault()
    props.login(payload)
}

  return (
    
    <Container component="main" maxWidth="xs">
    {props.token ? <Redirect to ="/users"/>:null}
      <CssBaseline />
      <div className={classes.paper}>
      {props.msg_success ? null : <Alert severity="success"> You can now Login</Alert>}

        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form>
        {props.error.id !=="LOGIN_FAIL"? null : <Alert severity="error"> {props.error.msg}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=>login(e,{name : state.name,password :state.password})}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = state =>{
    return{token : state.users.token,
      msg_success : state.users.msg_success,
    error: state.error}
}
export default connect (mapStateToProps,{login})(SignIn);

import React, { Component } from 'react'
import { Button, LinearProgress, Grow, Snackbar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography } from '@material-ui/core'
import './App.css'
import * as firebase from 'firebase'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

class App extends Component {

  state = {
    disabled: false,
    email: '',
    pass: '',
    currentUser: false,
    error: false,
    isOpen: false,
    logged: false,
  }

  // FIREBASE FUNCTIONS
  // //login
  // const auth = firebase.auth()
  // auth.signInWithEmailAndPassword(email, pass)
  // //create user
  // auth.createUserWithEmailAndPassword(email, pass)
  // //modyfikacja
  // auth.onAuthStateChange(firebaseUser => {})

  // LOGIN
  handleLogIn = e => {
    const { email, pass, disabled, isOpen } = this.state

    this.setState ({
      [e.target.name]: e.target.value,
      disabled: !disabled,
      error: null
    })

    setTimeout(()=> {
      
      const auth = firebase.auth()
      const promise = auth.signInWithEmailAndPassword(email, pass)
      if (firebase.auth().currentUser) {
        promise.then((e) => this.setState ({
          currentUser: firebase.auth().currentUser.email,
          isOpen: !isOpen,
          disabled: false,
          logged: true
        }))
      } else {
        this.setState ({
          disabled: false,
        })
        promise.catch(e => this.setState ({
          error: e.message,
        }))
      }
    }, 3000)
  }

  // REGISTER
  handleRegister = e => {

    const { email, pass, disabled, isOpen } = this.state
    
        this.setState ({
          error: null,
          [e.target.name]: e.target.value,
          disabled: !disabled
        })
        setTimeout(()=> {

          const auth = firebase.auth()
          const promise = auth.createUserWithEmailAndPassword(email, pass)
          promise.catch(e => this.setState ({ error: e.message }))
    
          firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
              // console.log(firebaseUser)
              this.setState ({
                error: null,
                currentUser: firebase.auth().currentUser.email,
                isOpen: !isOpen,
                disabled: false,
                logged: true
              })
            } else {
              this.setState ({
                disabled: false
              })
            }
          })
        }, 2000)
        
  }

  // LOGOUT
  handleLogOut = () => {

    this.setState ({
      disabled: !this.state.disabled
    })

    setTimeout(()=> {
      this.setState ({
        currentUser: false,
        disabled: false,
        logged: false,
        email: '',
        pass: '',
        error: null
      })
      firebase.auth().signOut()
    }, 2000)
    
  }
  
  // componentDidMount() {
  //   const rootRef = firebase.database().ref().child('01')
  //   const emailRef = rootRef.child('email')
  //   const passRef = rootRef.child('pass')
  //   emailRef.on('value', snap => {
  //     this.setState ({
  //       email: snap.val()
  //     })
  //   })
  //   passRef.on('value', snap => {
  //     this.setState ({
  //       pass: snap.val()
  //     })
  //   })
    
  // }

  render() {

    const { email, pass, currentUser, error, disabled, isOpen, register, logged } = this.state

    return (
      <div className="container">

        {disabled && <div style={{position: 'absolute', width: '100%', top: 0}}><LinearProgress /></div>}

        {!currentUser ?
        // Start form section
        <React.Fragment>
        <h1>Login / Register</h1>
        <p>demo@demo.com</p>
        <p style={{marginBottom: '25px'}}>password: test1234</p>
        <ValidatorForm
        ref='form'
        onSubmit={this.handleLogIn}
        // onError={errors => console.log(errors)}
        >

          <TextValidator
          disabled={disabled}
          onChange={e=>this.setState({[e.target.name]:e.target.value})}
          name='email'
          value={email}
          variant='outlined'
          color='primary'
          label='E-mail'
          margin='normal'
          fullWidth={true}
          validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
          ></TextValidator>

          <TextValidator
          disabled={disabled}
          type='password'
          onChange={e=>this.setState({[e.target.name]:e.target.value})}
          name='pass'
          value={pass}
          variant='outlined'
          color='primary'
          label='Password'
          margin='normal'
          fullWidth={true}
          validators={['minStringLength:6', 'maxStringLength:16']}
          errorMessages={['this field is required', 'password is not valid']}
          ></TextValidator>

          <Button
          disabled={disabled}
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          fullWidth={true}
          >Sign In
          </Button>

          <Button
          disabled={disabled}
          onClick={this.handleRegister}
          variant='outlined'
          color='secondary'
          size='medium'
          fullWidth={true}
          >Register
          </Button>

        </ValidatorForm>
 
      <Grow in={!disabled}><div>{error && <p className='error'>{error}</p>}</div></Grow>
      {/* End form section */}
      </React.Fragment>
      :
      <div className='container'>
        <h2>Hi, {currentUser}</h2>
        <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Account Informations</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Product Sales / Statistics</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Settings</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel disabled>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>VIP Options</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
        <div className='footer'>© 2019 bkasperski</div>
      </div>
      
      
    }
      {/* FOOTER */}
      <Grow in={logged}>
        <div className='user'>
        {currentUser ?
        
        
        <React.Fragment>
          <span>Logged as: </span>
          {currentUser}
          <Button
          id='register'
          disabled={disabled}
          onClick={this.handleLogOut}
          variant='contained'
          color='secondary'
          size='small'
          >
            <ExitToAppIcon/>
          </Button>
        </React.Fragment> : null

        }
        </div>
      </Grow>

      <Snackbar
      open={isOpen}
      message={<span>Login successful</span>}
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      autoHideDuration={3500}
      onClose={()=> this.setState ({ isOpen: !isOpen })}
      ></Snackbar>
      <Snackbar
      open={register}
      message={<span>Register and Login successful</span>}
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      autoHideDuration={3500}
      onClose={()=> this.setState ({ register: !register })}
      ></Snackbar>

      </div>

    )
  }
}

export default App
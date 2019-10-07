import React, { Component } from 'react'
import { createMuiTheme, IconButton, Paper, InputBase, Typography, Divider, Grow, Chip, CircularProgress, Link } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import './App.css'
import Repo from './repositories.json'
import { red, green } from '@material-ui/core/colors'
import PublishIcon from '@material-ui/icons/Publish'
import CheckIcon from '@material-ui/icons/Check'

const Item = props => {
  return (
    <div className='item'>
      <Grow in>
        <Paper>
          <Link href={props.url}>
            <Typography style={{padding: 15}} variant="h5" component="h3">
            {props.name}
            </Typography>
          </Link>
          <Divider/>
          <Typography style={{padding: '8px 15px', flexWrap: 'nowrap'}} component="p">
          {props.description}
          </Typography>
          {props.tag ?
          <React.Fragment>
            <Divider/>
            <Typography style={{padding: 15}} component="div">
              <Chip size='small' label={props.tag} />
            </Typography>
          </React.Fragment> : false }
        </Paper>
      </Grow>
    </div>
  )
}

const theme = createMuiTheme ({

  palette: {
    primary: green,
    secondary: red
  },
  status: {
    danger: 'green'
  },
})

class App extends Component {

  state = {
    list: [],
    value: '',
    sorted: [],
    isLoaded: false,
    isDisabled: false,
    typingTimeout: 0
  }

  handleLoad = () => {
    if (!this.state.isLoaded) {
      this.setState ({
        isDisabled: true
      })
      setTimeout(()=> {
        this.setState ({
          list: Repo.items,
          isLoaded: true,
          isDisabled: false,
        })
      }, 2000)
    }
  }

  // componentDidMount() {

  //   fetch('./repositories.json')
  //   .then(response => response.json())
  //   .then(data => this.setState ({ list: data.items}))
  //   this.setState ({
  //     isLoaded: true
  //   })
  // }

  handleChange = e => {
    this.setState ({
      value: e.target.value,
    })    
  }

  render() {
    const { isDisabled, sorted, isLoaded } = this.state
    const list = this.state.list.map(item => 
      <Item
      key={item.id}
      name={item.name}
      description={item.description}
      tag={item.language}
      url={item.html_url}
      />)

    return (
      <div className="container">
        <ThemeProvider theme={theme}>

          <h1>Git Project Searcher</h1>
          
          <Paper>
            <IconButton onClick={this.handleLoad} disabled={isDisabled} aria-label="menu"style={{margin:'0 5px'}}>
              {isLoaded ? <CheckIcon color='primary' /> : <PublishIcon />}
              {isDisabled && <CircularProgress style={{position:'absolute'}} />}
            </IconButton>
            <InputBase
            disabled={isDisabled}
            onChange={this.handleChange}
            type='text'
            value={this.state.value}
            placeholder="Search for projects"
            />
            
          </Paper>

          {list}

        </ThemeProvider>
      </div>
    )
  }
}

export default App
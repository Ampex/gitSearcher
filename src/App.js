import React, { Component } from 'react'
import { createMuiTheme, IconButton, Paper, InputBase } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import './App.css'
import { amber, red } from '@material-ui/core/colors'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

const theme = createMuiTheme ({
  palette: {
    primary: amber,
    secondary: red
  },
  status: {
    danger: 'orange'
  },
})

class App extends Component {

  state = {
  }

  render() {

    return (
      <div className="container">
        <ThemeProvider theme={theme}>

          <Paper>
            <IconButton aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
            placeholder="Search Projects"
            inputProps={{ 'aria-label': 'Search Projects' }}
            />
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </ThemeProvider>
      </div>

    )
  }
}

export default App
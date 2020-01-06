import React, { Component } from 'react'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import './App.css'
import Repo from './repositories.json'
import { red, green } from '@material-ui/core/colors'

import Header from './components/Header'
import Results from './components/Results'
import Item from './components/Item'
import Sorted from './components/Sorted'

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        textTransform: 'lowercase'
      }
    }
  },
  palette: {
    primary: green,
    secondary: red
  }
})

class App extends Component {
  state = {
    list: [],
    value: '',
    sorted: [],
    isLoaded: false,
    isDisabled: false
  }

  handleLoad = () => {
    if (!this.state.isLoaded) {
      this.setState({
        isDisabled: true
      })
      setTimeout(() => {
        this.setState({
          list: Repo.items,
          isLoaded: true,
          isDisabled: false
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
    const { value, list } = this.state

    this.setState({
      value: e.target.value
    })
    const sorted = list.filter(item => item.name.includes(value))
    const sortedItems = sorted.map(item => (
      <Item
        key={item.id}
        name={item.name}
        description={item.description}
        tag={item.language}
        url={item.html_url}
      />
    ))

    this.setState({
      sorted: sortedItems
    })
  }

  render() {
    const { isDisabled, isLoaded, sorted, value } = this.state

    const list = this.state.list.map(item => (
      <Item
        key={item.id}
        name={item.name}
        description={item.description}
        tag={item.language}
        url={item.html_url}
      />
    ))

    return (
      <div className='container'>
        <ThemeProvider theme={theme}>
          <Header />
          <Results
            handleLoad={this.handleLoad}
            isDisabled={isDisabled}
            isLoaded={isLoaded}
            handleChange={this.handleChange}
          />
          <Sorted value={value} sorted={sorted} list={list} />
        </ThemeProvider>
      </div>
    )
  }
}

export default App

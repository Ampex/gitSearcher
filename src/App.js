import React, { Component } from 'react'
import { Button, CircularProgress, Grow } from '@material-ui/core'
import './App.css'

const Lists = props => {
  return (
    <p>{props.value}: <span className='status-idle'>{JSON.stringify(props.data)}</span></p>
  )
}

const Item = props => (
  <Grow in timeout={600}>
    <div>
      <h3>{props.name}</h3>
      <code>{props.url}</code>
      <p>{props.createdAt}</p>
    </div>
  </Grow>
)

class App extends Component {

  state = {
    variant: 'contained',
    color: 'primary',
    buttonText: 'Pobierz',
    items: [],
    isLoaded: false,
    isDisabled: false,
    loading: null
  }
  
  handleConnect = () => {

    const MongoClient = require('mongodb').MongoClient
    const uri = "mongodb+srv://blazej:BKdesign06451741@amped-tznfi.mongodb.net/test?retryWrites=true&w=majority"
    const client = new MongoClient(uri, { useNewUrlParser: true })
    client.connect(err => {
      const collection = client.db("test").collection("devices")
      // perform actions on the collection object
      client.close()
    })

  }

  handleGet = () => {

    if (this.state.isLoaded) {
      console.log('Already loaded')
    } else {

      const url = 'https://api.github.com/search/repositories?q=react&sort=stars&order=desc'

      fetch(url, this.setState ({ loading: true, isDisabled: true}))
      .then(response => response.json())
      .then(data => {
        
        this.setState ({
          items: data.items,
          isLoaded: true,
          isDisabled: false,
          loading: false
        })
      })
      .catch(error => console.log(error))
      }
  }

  render() {

    const items = this.state.items    
    const list = items.map(item => <Item key={item.id} name={item.name} url={item.html_url} createdAt={item.created_at}/>)

    return (
      <div className="container">

        <Button
        disabled={this.state.isDisabled}
        onClick={this.handleGet}
        variant={this.state.variant}
        color={this.state.color}
        >{this.state.buttonText}
        
        {this.state.loading && <CircularProgress style={{color: 'rgb(76, 175, 80)', 'position': 'absolute'}} size={24} />}

        </Button>

        <Button
        onClick={this.handleConnect}
        variant={this.state.variant}
        color='secondary'
        >Połącz
        
        </Button>

        <Lists value={'Status'} data={this.state.isLoaded}/>
        <Lists value={'Ilość obiektów'} data={this.state.items.length}/>

        <div className='list'>{list}</div>

      </div>

    )
  }
}

export default App
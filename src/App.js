import logo from './logo.svg';
import './App.css';
import {
  Component
} from 'react';
import Form from './Form'
import Result from './Result'
import Favourites from './Favourites'
import * as React from "react";
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';

const APIKey = 'efa2ef11f117f7485b2fca8e87a3a2f5'

class App extends Component {
  state = {
    value: '',
    date: '',
    city: '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false,
    editID: null,
    newFavourite: ''
  }

  favourites = ["kraków", "wrocław"]
  favouritesData = [
    { 'city': 'katowice' },
    { 'city': 'gdańsk' },
    { 'city': 'szczecin' }
  ]

  handleInputChange = event => {
    this.setState({
      value: event.target.value
    })
  }

  handleInputChangeFavourite = event => {
    this.setState({
      newFavourite: event.target.value
    })
  }

  handleCityChoice = event => {
    event.preventDefault()
    const source = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&units=metric`;

    fetch(source)
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response
        }
        throw Error("Błąd podczas pobierania danych")
      })
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString()
        this.setState(state => ({
          err: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: state.value,
        }))
      })
      .catch(err => {
        console.log(err);
        this.setState(prevState => ({
          err: true,
          city: prevState.value
        }))
      })
  }

  addFavourite = event => {
    event.preventDefault()
    this.setState(state => ({
      newFavourite: state.newFavourite
    }))
    this.favourites.push(this.state.newFavourite);
  }

  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          choice={this.handleCityChoice}
        ></Form>
        <Favourites
          value={this.state.newFavourite}
          change={this.handleInputChangeFavourite}
          choice={this.addFavourite}
        ></Favourites>
        <Result weather={this.state}></Result>
        <h1>Ulubione:</h1>
        <Grid data={this.favouritesData}>
          <Column field="city" title="Miasto" />
        </Grid>
        <Grid style={{
          height: '420px'
        }}
          data={this.favourites}
          editField="inEdit" onRowClick={this.rowClick} onItemChange={this.itemChange}>
          <GridToolbar>
            <div onClick={this.closeEdit}>
              <button title="Add new" className="k-button k-primary" onClick={this.addRecord}>
                Add new
              </button>
            </div>
          </GridToolbar>
          <Column field="ProductID" title="Miasto" width="50px" editable={false} />
          <Column field="ProductName" title="Temperatura" />
          <Column field="FirstOrderedOn" title="Wschód słońca" editor="date" format="{0:d}" />
          <Column field="UnitsInStock" title="Zachód słońca" width="150px" editor="numeric" />
          <Column field="Discontinued" title="Siła wiatru" editor="boolean" />
          <Column field="Discontinued" title="Ciśnienie" editor="boolean" />
        </Grid>
      </div>
    )
  }
}

export default App;
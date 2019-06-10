import React, { Component } from 'react';
import './PlainTheme.css';
import './NightTheme.css'
import './CoolTheme.css'
import Quote from './Quote';
import { quotes } from './quotesList'

class App extends Component {
  constructor(){
    super(); 
    this.state = {
      quotes: quotes, 
      activeQuote: null,
      activeTheme: null
    }
  }

  /*helper method to generate a random quote from a list of quotes. 
  it will not select the index of the same quote as the current quote*/
  randomNumberExcept = (except) => {
    let randomNumber = Math.floor((Math.random() * this.state.quotes.length))
    while(randomNumber === except){
      randomNumber = Math.floor((Math.random() * this.state.quotes.length))
    }
    return randomNumber
  }

  changeThemeOnClick = (event) => {
    this.setState({ activeTheme: event.currentTarget.id })
  }

  changeQuote = (event) => {
    this.setState({ activeQuote: this.state.quotes[this.randomNumberExcept(this.state.quotes.indexOf(this.state.activeQuote))] })
  }

  /*
    helper method that allows for changing themes given a certain time of day
    startingFrom - the hour which the theme should change, in military time format 0-24 hours
    endsAt - the hour which the theme should change again, in military time format 0-24 hours
    themeBetweenHours - theme to change within the bounds of startingFrom and endsAt
    themeAfterHours - theme to change outside the bounds of startingFrom and endsAt
  */
  changeThemeBetweenHours = (startingFrom, endsAt, themeBetweenHours, themeAfterHours) => {
    let time = new Date().getHours()
    console.log(time)
    console.log(themeBetweenHours)

    if(startingFrom > endsAt) {
      if (time >= startingFrom && time <= 23) { //before midnight
        this.setState({ activeTheme: themeBetweenHours })  
      } else if (time >= 0 && time <= endsAt) { //after midnight
        this.setState({ activeTheme: themeBetweenHours })
      } else {
        this.setState({ activeTheme: themeAfterHours })
      }
    } else {
      if (time >= startingFrom && time <= endsAt) {
        this.setState({ activeTheme: themeBetweenHours })
      } else {
        this.setState({ activeTheme: themeAfterHours })
      }
    }
  }

  componentDidMount(){
    this.changeQuote() //start off the app with a random quote
    this.changeThemeBetweenHours(22, 5, 'night', 'plain')  //night theme is between 10 pm to 4 am
  }

  render(){
    const { activeQuote, activeTheme } = this.state
    
    return (
      <div className={activeTheme}>
        <h1 className='title'>instant self help</h1>
        <div className='theme-change-container' >
          <div onClick={this.changeThemeOnClick} className='theme-change-button' id='plain'>
            <p>Plain</p>
          </div>

          <div onClick={this.changeThemeOnClick} className='theme-change-button' id='night'>
            <p>Night</p>
          </div>

          <div onClick={this.changeThemeOnClick} className='theme-change-button' id='cool'>
            <p>Cool</p>
          </div>
        </div>

        <Quote selectedQuote={activeQuote}/>
        
        <div onClick={this.changeQuote} className='randomize-button'>
          <p>Another one!</p>
        </div>
      </div>
    );
  }
}

export default App

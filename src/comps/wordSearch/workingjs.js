import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const WordSearch = observer(class WordSearch extends Component {

  constructor(){
    super();
    this.state = {
      words: [],
      grid: [],
    }
  }

  componentDidMount(){
    this.state.words = this.props.store.wordBank
    setTimeout(()=>this.drawBoard(),0);
    console.log(this.state.words);
  }

  drawLetters(){
    for (let i = 0; i < this.state.grid.length; i++){
      for (let j = 0; j < this.state.grid[i].length; j++){
        if (this.state.grid[i][j] === '.'){
          this.state.grid[i][j] = String.fromCharCode(Math.floor(Math.random() * ((91) - 65) + 65));
          // this.state.grid[i][j] = '.';
        } else {
          this.state.grid[i][j] = this.state.grid[i][j].toLowerCase();
        }
      }
    }
    this.print()
  }

  print(){
    const parentContainer = document.querySelector('.ArrayContainer')
    for (let i = 0; i < this.state.grid.length; i++){
      const div = document.createElement('div')
      div.className = 'Row'
      parentContainer.appendChild(div)
      for (let j = 0; j < this.state.grid[i].length; j++){
        const el = document.createElement('div')
        el.className = 'Element'
        if (this.state.grid[i][j] === this.state.grid[i][j].toLowerCase()) el.classList.add('Word')
        el.innerHTML = this.state.grid[i][j].toUpperCase()
        document.getElementsByClassName('Row')[i].appendChild(el)
      }
    }
  }

  drawBoard(){
    let arr = [];
    const longestWord = (this.state.words.length > 0) ?
                            this.state.words.sort(function (a, b) { return b.length - a.length; })[0].length :
                                10;
    for (let i = 0; i < Math.floor(longestWord*1.2); i++){
      let array2 = [];
      array2.length = (longestWord >= 10 ) ? Math.floor(longestWord*1.2) : 20;
      array2.fill('.')
      arr.push(array2)
    }
    const joined = this.state.grid.concat(arr);
    this.setState({ grid: joined })
    for (let j = 0; j < this.state.words.length; j++){
      let random = Math.floor(Math.random() * ((3) - 0) + 0)
      if (this.state.words[j].length >= 20) random = 0;
      this.switcher(this.state.words[j], random)
    }

    setTimeout(()=>this.drawLetters(), 500);
  }

  switcher(word, random) {
      switch(random){
        case 0:
          setTimeout(()=>this.horizontal(word),0)
          break;
        case 1:
          setTimeout(()=>this.vertical(word),0)
          break;
        case 2:
          setTimeout(()=>this.diagnal(word),0)
          break;
      }
  }

  diagnal(word){
    const grid = this.state.grid;
    const randoY = Math.floor(Math.random() * ((32-word.length) - 0) + 0)
    const randoX =   Math.floor(Math.random() * ((32-word.length)-0) + 0)
    let check = true;
    for (var j = 0; j < word.split('').length; j++){ // checks for overlap
      if (grid[randoY+j]){
        if (grid[randoY+j][randoX+j] !== '.'){
          check = false;
        }
      }
      else {
        check = false
      }

    }
    if (check === false){
      this.switcher(word, Math.floor(Math.random() * ((3) - 0) + 0));
    }
    else {
      for (let y = 0; y < grid.length; y++){ // columns
        for (let x = 0; x < grid[0].length; x++){ // rows
          if (x === 10 && y === 5){
            for (let i = 0; i < word.split('').length; i++){ // loops through word
              grid[randoY+i][randoX+i] = word[i]
            }
          }
        }
      }
    }
  }

  vertical(word){
    const grid = this.state.grid;
    const randoY = Math.floor(Math.random() * ((32-word.length) - 0) + 0)
    const randoX =   Math.floor(Math.random() * ((32-word.length)-0) + 0)
    let check = true;
    for (var j = 0; j < word.split('').length; j++){ // checks for overlap
      if (grid[randoY+j]){
        if (grid[randoY+j][randoX] !== '.'){
          check = false;
        }
      }
      else {
        check = false
      }

    }
    if (check === false){
      this.switcher(word, Math.floor(Math.random() * ((3) - 0) + 0));
    }
    else {
      for (let y = 0; y < grid.length; y++){ // columns
        for (let x = 0; x < grid[0].length; x++){ // rows
          if (x === 10 && y === 5){
            for (let i = 0; i < word.split('').length; i++){ // loops through word
              grid[randoY+i][randoX] = word[i]
            }
          }
        }
      }
    }
  }

  horizontal(word){
    const grid = this.state.grid;
    const randoY = Math.floor(Math.random() * ((32-word.length) - 0) + 0)
    const randoX =   Math.floor(Math.random() * ((32-word.length)-0) + 0)
    let check = true;
    for (var j = 0; j < word.split('').length; j++){ // checks for overlap
      if (grid[randoY]){
        if (grid[randoY][randoX+j] !== '.'){
          check = false
          break;
        }
      }
      else {
        check = false
      }
    }
    if (check === false){
      this.switcher(word, Math.floor(Math.random() * ((3) - 0) + 0))
    }
    else {
      for (let y = 0; y < grid.length; y++){ // columns
        for (let x = 0; x < grid[0].length; x++){ // rows
          if (x === 10 && y === 5){
            for (let i = 0; i < word.split('').length; i++){ // loops through word
              grid[randoY][randoX+i] = word[i]
            }
          }
        }
      }
    }
  }

  addToGrid(){
    // resets grid
    const parentContainer = document.querySelector('.ArrayContainer')
    parentContainer.innerHTML = ''
    this.setState({grid: []})

    //assigns word to grid
    const value = document.getElementById('input').value.toUpperCase();
    const joined = this.state.words.concat(value);
    this.setState({words: joined})
  }


  render() {
    return (
      <div>
        <div className="GridContainer">
          <div className='ArrayContainer'>
          </div>
        </div>
      </div>
    );
  }
})

export default WordSearch;

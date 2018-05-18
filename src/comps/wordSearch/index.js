
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './style.css'

const WordSearch = observer(class WordSearch extends Component {

// I had to use this print function because the double map didnt work.
// I needed to map a div inside another mapped div (row and letter)
//and you can't go that deep within jsx. -> wrong
  print(){
    const parentContainer = document.querySelector('.ArrayContainer')
    const grid = this.props.store.wordsearch
    for (let i = 0; i < grid.length; i++){
      const div = document.createElement('div')
      div.className = 'Row'
      parentContainer.appendChild(div)
      for (let j = 0; j < grid[i].length; j++){
        const el = document.createElement('div')
        el.className = 'Element'
        if (grid[i][j] === grid[i][j].toLowerCase()) el.classList.add('Word')
        el.innerHTML = grid[i][j].toUpperCase()
        document.getElementsByClassName('Row')[i].appendChild(el)
      }
    }
  }
  
  render() {
    return (
        <div className="GridContainer">
          <div className='ArrayContainer'>
          </div>
        </div>
    );
  }
})

export default WordSearch;

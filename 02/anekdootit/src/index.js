import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const SelectButton = (props) => {
  return (
    <button onClick={props.handeClick}>Show new anecdote!</button>
  )
}

const VoteButton = (props) => {
  return (
    <button onClick={props.handleVote}>Vote</button>
  )
}

const MostVotes = ({ index, anecdotes}) => {
  
    if (!isNaN(index)) {
      return (
        <p>{anecdotes[index]}</p>
      )
    } else {
      return (
        <h4>No votes yet</h4>
      )
    }
    
    
  }
  

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0: 0, 1: 0, 2:0, 3:0, 4:0, 5:0})
  const [lead, setLead] = useState('NaN')

  const pickRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  
  const vote = () => {
    const pointsCopy = { ...points}
    pointsCopy[selected] +=1 

    if (isNaN(lead)) {
      console.log("isNan lead")
      setLead(selected)
    } else if (pointsCopy[selected] > pointsCopy[lead]) {
      console.log("else")
      setLead(selected)
    }
   
    setPoints(pointsCopy)
    
  }

  return (
    <div>
      <h2>Anecdote for the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>Votes: {points[selected]}</p>
      <SelectButton handeClick={pickRandom}/>
      <VoteButton handleVote={vote}/>
      <h2>Anecdote with most votes</h2>
      <MostVotes index={lead} anecdotes={anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
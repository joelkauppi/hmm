import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad, all }) => {
  const avg = (good - bad) / all
  const positive = (good / all) * 100
  
  if(all !== 0) {
  return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={good}/>
            <StatisticsLine text="Neutral" value={neutral}/>
            <StatisticsLine text="Bad" value={bad}/>
            <StatisticsLine text="All" value={all}/>
            <StatisticsLine text="Average" value={avg}/>
            <StatisticsLine text="Positive" value={positive}/>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <h3>Nothing to show here.</h3>
    )
  }
}

const StatisticsLine = ({text, value}) => {
  if (text==="Positive") {
    return (
      <tr>
        <td>{text} :</td>
        <td>{value} %</td>
      </tr>
    )
  } else {
      return (
        <tr>
        <td>{text} :</td>
        <td>{value}</td>
      </tr>
      )
  }
  
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.triggerClick}>{props.text}</button>
    </div>
  )  
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const addGood = () => {
    setGood(good + 1)
    updateAll()
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
    updateAll()
  }
  const addBad = () => {
    setBad(bad + 1)
    updateAll()
  }
  const updateAll = () => {
    setAll(all + 1)
  }
  


  return (
    <div>
      
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}>/></Statistics>      
      <h1>Vote here:</h1>
      <Button triggerClick={() => addGood() } text="Good"/>
      <Button triggerClick={() => addNeutral() } text="Neutral"/>
      <Button triggerClick={() => addBad() } text="Bad"/>
    </div>
  )
}



ReactDOM.render(<App />, 
  document.getElementById('root')
)
import { useState } from 'react'

const FeedbackButton = ({ name, handleClick }) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Stats = ({ name, count }) => {
  return (
    <p>{name} {count}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood]       = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad]         = useState(0)

  const feedbacks = [
    { opt: 'good', count: good, setState: setGood },
    { opt: 'neutral', count: neutral, setState: setNeutral },
    { opt: 'bad', count: bad, setState: setBad },
  ];

  const handleClick = (count, setState) => () => setState(count + 1);

  return (
    <div>
      <h1>give feedback</h1>
      {feedbacks.map(feedback => (
        <FeedbackButton
          key={feedback.opt}
          name={feedback.opt}
          handleClick={handleClick(feedback.count, feedback.setState)}
        />
      ))}
      <h1>statistics</h1>
      {feedbacks.map(feedback => (
        <Stats
          key={feedback.opt}
          name={feedback.opt}
          count={feedback.count}
        />
      ))}
    </div>
  )
}

export default App
import { useState } from 'react'

const FeedbackButton = ({ name, handleClick }) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Statistics = ({ feedbacks }) => {
  const total = feedbacks.reduce((prevValue, currValue) => prevValue + currValue.count, 0);

  const netTotal = feedbacks.reduce((prevValue, currValue) => {
    if (currValue.opt === 'neutral') return prevValue;
    else if (currValue.opt === 'bad') return prevValue - currValue.count;
    else return prevValue + currValue.count;
  }, 0)

  const ave = netTotal / total;
  const onlyGoodCount = feedbacks.find(feedback => feedback.opt === 'good').count ?? 0;
  const positive = (onlyGoodCount / total) * 100;

  const additionalStats = [
    { text: 'all', value: total },
    { text: 'average', value: ave },
    { text: 'positive', value: positive },
  ]

  return (
    <>
    {total === 0 ? <p>No feedback given</p> :
      <>
      {feedbacks.map(feedback => (<StatisticLine key={feedback.opt} text={feedback.opt} value={feedback.count} />))}
      {additionalStats.map(stat => <StatisticLine key={stat.text} text={stat.text} value={stat.value} />)}
      </>
    }
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <>
    {text === 'positive' ? <p>{text} {value} %</p> : <p>{text} {value}</p>}
    </>
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
      <Statistics feedbacks={feedbacks} />
    </div>
  )
}

export default App
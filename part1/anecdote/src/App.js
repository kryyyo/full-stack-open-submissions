import { useMemo, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initAnecdoteWithVotes = anecdotes.map(anecdote => ({ anecdote, vote: 0 }))
   
  const [selected, setSelected] = useState(0)
  const [anecdoteWithVotes, setAnecdoteWithVotes] = useState(initAnecdoteWithVotes)

  const randomize = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const handleNext = () => {
    const max = anecdotes.length - 1; // prevents out of bound errors
    const randomNumber = randomize(0, max);
    setSelected(randomNumber);
  }

  const handleVote = () => {
    const newArray = [...anecdoteWithVotes]
    newArray[selected].vote += 1;
    setAnecdoteWithVotes(newArray);
  }

  const mostVotedAnecdote = useMemo(() => anecdoteWithVotes.reduce((acc, curr) => {
    if (acc.vote > curr.vote) return acc;
    else return curr;
  }), [anecdoteWithVotes])

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdoteWithVotes[selected].anecdote}<br />
      has {anecdoteWithVotes[selected].vote} votes
      <br/>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <br />
      <h1>Anecdote with the most votes</h1>
      {mostVotedAnecdote.vote === 0 ? 
      <>No votings yet</> :
      <>
      {mostVotedAnecdote.anecdote}<br />
      has {mostVotedAnecdote.vote} votes
      </>}
    </div>
  )
}

export default App
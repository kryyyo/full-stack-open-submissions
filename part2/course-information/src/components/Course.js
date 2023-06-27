const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (<Part key={part.name} part={part} />))}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ parts }) => {
  return (
    <p><b>total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</b></p>
  )
}

const Course = ({ course }) => {
  const { name, parts } = course;

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course;
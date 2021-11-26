// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initName = ''}) {
  const [name, setName] = React.useState(initName)

  function handleChange(event) {
    setName(event.target.value);
    console.log(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input defaultValue={initName} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initName='Pernis'/>
}

export default App

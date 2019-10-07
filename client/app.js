import React from 'react'
import {Header, Sidebar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="container">
      <Header />
      <Sidebar />
      <Routes />
    </div>
  )
}

export default App

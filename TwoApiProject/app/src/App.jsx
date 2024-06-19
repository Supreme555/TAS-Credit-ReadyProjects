import React, { useState, useEffect } from 'react'
import VinComp from './components/VinComp'
import GibddComp from './components/GibddComp'
import styles from './assets/App.module.css'
function App() {

  return (
    <div className={styles.main}>
      <VinComp />
      <GibddComp />
    </div>
  )
}

export default App

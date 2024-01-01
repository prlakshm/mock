import React from 'react'
import { useState } from 'react';
import '../styles/main.css';
import { MOCKHistory } from './MOCKHistory';
import { MOCKInput } from './MOCKInput';

/**
 * manages history and inputs of Mock
 * @returns HTML formated Mock webpage from input and history data
 */
export default function MOCK() {
  /*Added history as 2D list of strings or arrays to account for return 
  string messages or HTML tables. BriefBoolean keeps track of mode.*/
  const [history, setHistory] = useState<(string | string[][])[][]>([])
  const [briefBoolean, setBriefBoolean] = useState<boolean>(true)

  //passes in data into MOCKHistory and MOCKInput components to coordinate info
  return (
    <div className="mock">  
      <MOCKHistory history ={history} briefBoolean={briefBoolean}/>
      <hr></hr>
      <MOCKInput history={history} setHistory={setHistory} briefBoolean={briefBoolean} setBriefBoolean={setBriefBoolean}/>
    </div>
  );
}

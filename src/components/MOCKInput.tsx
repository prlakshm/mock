import React from 'react'
import '../styles/main.css';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';
import { mockMap, searchByColName, searchByIndex } from '../../data/MockedData';

/**
 * History keeps track of past commands and brief boolean tracks mode. Master
 * data passed in from MOCK component.
 */
interface MOCKInputProps{
  history:  (string | string[][])[][],
  setHistory: Dispatch<SetStateAction<(string | string[][])[][]>>,
  briefBoolean: boolean,
  setBriefBoolean: Dispatch<SetStateAction<boolean>>,
}
/**
 * parses user input and returns logs output in history
 * @param props 
 * @returns 
 */
export function MOCKInput(props : MOCKInputProps) {
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    // Manages the loaded csv and updated when new file loaded
    const [loadedCSV, setLoadedCSV] = useState<string[][]>([]);
    
    /**
     * helper finds appropriate output from user input
     * @param commandList user input commandString split by spaces
     * @returns output string message or csv table as string[][] 
     */
    function findCommand(commandList:string[]) : string | string[][] {

      // load file, considers parsing with and without headers
      if(commandList.length === 3 && commandList[0] === "load_file") {
        let filepathInfo = mockMap.get(commandList[1])
        if(filepathInfo !== undefined) {
          setLoadedCSV(filepathInfo)
          //output if has headers
          if(commandList[2] === "true") {
            return "loaded " + commandList[1] + " with headers"
          }
          //output if doesn't have headers
          else if(commandList[2] === "false") {
            return "loaded " + commandList[1] + " without headers"
          }
          //error message if header input invalid
          else {
            return "CSV header command is not valid (case-sensitive)"
          }
        }
        //error message if filepath input invalid
        else {
          return "load CSV filepath not valid (case-sensitive)"
        }
      }

      // view csv command returns csv table 
      else if(commandList.length === 1 && commandList[0] === "view") {
        //error message if blank csv inputted
        if (loadedCSV.length === 1 && loadedCSV[0].length === 0) {
          return "blank CSV inputted"
        }
        //output string[][] of loadedCSV if valid csv
        else if (loadedCSV.length > 0){
          return loadedCSV
        }
        //error if no csv loaded
        else {
          return "no CSV loaded"
        }
      }

      // search csv returns search results as string[][] csv rows
      else if(commandList.length === 3 && commandList[0] === "search") {
        //error if blank csv inputted
        if (loadedCSV.length === 1 && loadedCSV[0].length === 0) {
          return "blank CSV inputted"
        }
        //finds search result if valid csv
        else if(loadedCSV.length > 0){
          //get column identifier
          let searchParam = parseInt(commandList[1])

          //if searching by column name
          if(Number.isNaN(searchParam)) { 
            let results = searchByColName.get(commandString)
            if (results !== undefined) {
              return results
            }
            //if specific search query not part of mock, give no results message
            else {
              return "no results associated with the given search term or parameters"
            }
          }
          //if seraching by index
          else {
            let results = searchByIndex.get(commandString)
            if (results !== undefined) {
              return results
            }
            //if specific search query not part of mock, give no results message
            else {
              return "no results associated with the given search term or parameters"
            }
          }
        }
        //error if no csv loaded
        else {
          return "no CSV loaded"
        }   
      }
      
      //keep track of modes brief and verbose
      else if(commandList.length === 2 && commandList[0] === "mode") {
        //switch briefBoolean to true if mode brief
        if(commandList[1] === "brief") {
          props.setBriefBoolean(true)
          return "display brief history"
        }
        //switch briefBoolean to false if mode verbose
        else if(commandList[1] === "verbose") {
          props.setBriefBoolean(false)
          return "display verbose history"
        }
        //error message if mode command not proper
        else {
          return "check that command is valid (case sensitive)"
        }
      }
      /*if fist word command input isn't load_file, view, search, or mode 
      return general error message */
      else {
        return "invalid command entered exception"
      }
    }
    /**
     * This function is triggered when the button is clicked
     * @param commandString stores input command into history and finds output 
     * response from helper
     */
    function handleSubmit(commandString:string) : void{
      props.setHistory([...props.history, [commandString, findCommand(commandString.split(" "))]])
      setCommandString('')
    }

    /**
     *sets up input command box and responds to command on webpage
     */
    return (
        <div className="mock-input">
            {/*Sets us a command input box*/}
            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            {/*Button submits and pushes the contents of the input box to the history*/}
            <button onClick={() => handleSubmit(commandString)}>Submit</button>
        </div>
    );
  }
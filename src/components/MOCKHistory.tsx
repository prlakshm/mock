import React from 'react'
import '../styles/main.css';

/**
 * Master history and briefBoolean passed in from MOCK component and used for
 * props in this class.
 */
interface MOCKHistoryProps{
    history: (string | string[][])[][]
    briefBoolean: boolean
}

/**
 * renders history data
 * @param props takes in interface props
 * @returns HTML format of history log on webpage
 */
export function MOCKHistory(props : MOCKHistoryProps) {
    return (
        <div className="mock-history" aria-label={"history-element"}>
      <p> 
        {props.history.map((commandList) => ( 
          <div className="history-element">
            {/*Display command only if in verbose mode*/}
            {!props.briefBoolean && <p>Command: {commandList[0]}</p>}
            {/*If output a string, render message*/}
            {typeof commandList[1] === "string" ? (
              <p>Output: {commandList[1]}</p> 
            ) : (
              /*If output a string[], render HTML table*/
              <div>
                Output:
                <table>
                  <tbody>
                    {commandList[1].map((row) => (
                      <tr>
                        {row.map((rowElement) => (
                          <td>{rowElement}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </p>
    </div>
    );
}
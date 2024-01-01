import React from 'react'
import '../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

/**
 * sets up props for controlled input 
 */
interface ControlledInputProps {
    value: string, 
    setValue: Dispatch<SetStateAction<string>>,
    ariaLabel: string 
  }
  
  /**
   * sets up an input box to accept input commands
   * @param param0 takes in interface props 
   * @returns input box with placeholder text
   */
  export function ControlledInput({value, setValue, ariaLabel}: ControlledInputProps) {
    return (
      <input type="text" className="mock-command-box"
            value={value} 
            placeholder="Enter command here!"
            onChange={(ev) => setValue(ev.target.value)}
            aria-label={ariaLabel}>
      </input>
    );
  }
import React from 'react'
import "./PageHeading.css"

const PageHeading = ({heading , addButtonText, setIsAdding} : {heading : string , addButtonText : string, setIsAdding : (val : boolean) => void}) => {
  return (
    <div className='pageHeader'>
        <h2>{heading}</h2>
        <button  className="addButton" onClick={() => setIsAdding(true)}>{addButtonText}</button>
      </div>
  )
}

export default PageHeading
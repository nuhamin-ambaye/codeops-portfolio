import React from 'react'

const CatagoryBar = ({catagory}) => {
    
  return (
    <div>
        {catagory.map((i)=> 
        <button key={i}>{i}</button>)}
    </div>
  )
}

export default CatagoryBar
import React from 'react'

const Button = ({ name, changeDifficulty, option }) => {
  return (
    <div className='border-2 bg-green-800 px-3 py-1 rounded-md text-white' onClick={() => changeDifficulty(option)}>{name}</div>
  )
}

export default Button
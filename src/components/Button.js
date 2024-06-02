import React from 'react'

const Button = ( {name, changeDifficulty, option, id} ) => {
    return (
        <div className={`border-2 bg-green-800 px-3 py-1 rounded-md text-white
                        ${id === option && "bg-[#83ba2e]"}
        `} onClick={() => changeDifficulty(id)}>
            {name}
        </div>
    )
}

export default Button
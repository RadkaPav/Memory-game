import React from 'react'

const Button = ( {name, changeDifficulty, option, id} ) => {
    return (
        <div className={`border-2 px-3 py-1 rounded-md text-white cursor-pointer
                        ${id === option ? "bg-[#83ba2e]" : "bg-green-800"}`}
                        onClick={() => changeDifficulty(id)}>
            {name}
        </div>
    )
}

export default Button

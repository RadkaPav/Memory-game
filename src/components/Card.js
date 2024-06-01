import back from "../images-sounds/back.png"

const Card = ( {item, image, toggled, handleSelectedCard, option} ) => {
    
    return (
        <div className={`border-2 border-black cursor-pointer 
            ${option === 3 && "h-32 w-32"}  
            ${option === 6 && "h-24 w-24 md:w-32 md:h-32"}
            ${option === 12 && "h-16 w-16 sm:h-20 sm:w-20 lg:w-24 lg:h-24"}
            `}>
            <img src={image} alt="" className={toggled ? "block" : "hidden h-full"}/>
            <img src={back} alt="" className={toggled ? "hidden" : "block h-full"} onClick={() => handleSelectedCard(item)} />
        </div>
    )
}

export default Card
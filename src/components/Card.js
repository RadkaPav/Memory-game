import back from "../images-sounds/back.png"

const Card = ( {item, image, toggled, handleSelectedCard} ) => {
    
    return (
        <div className="border-2 border-black h-32 w-32 cursor-pointer">
            <img src={image} alt="" className={toggled ? "block" : "hidden h-full"}/>
            <img src={back} alt="" className={toggled ? "hidden" : "block h-full"} onClick={() => handleSelectedCard(item)} />
        </div>
    )
}

export default Card
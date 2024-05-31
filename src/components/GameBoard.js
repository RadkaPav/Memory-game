import Card from "./Card"
import data from "../data/animals-game"
import { useState, useEffect } from "react"

const GameBoard = () => {
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)
    const [dataArray, setDataArray] = useState([])
    const [count, setCount] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    const newGame = () => {
        setFirstCard(null)
        setSecondCard(null)
        setCount(0)
        setGameOver(false)
        setDataArray(data.sort(function () { return Math.random() - 0.5 }))
    }

    const handleSelectedCard = (item) => {
        const audio = new Audio(item.sound)
        audio.play()
        if (!firstCard) {
            setFirstCard(item)
        }
        else if (!secondCard) {
            setSecondCard(item)
            setCount(count + 1)
        }
    }

    useEffect(() => {
        if (firstCard && secondCard) {
            if (firstCard.name !== secondCard.name) {
                setTimeout(() => {
                    setFirstCard(null)
                    setSecondCard(null)
                }, 1500)
            }
            if (firstCard.name === secondCard.name) {
                setFirstCard(null)
                setSecondCard(null)
                return setDataArray((prevArray) => {
                    return prevArray.map(item => {
                        if (item.name === firstCard.name) {
                            return { ...item, matched: true }
                        } else {
                            return item
                        }
                    })
                })
            }
        }
        if (dataArray.every(item => item.matched)) setGameOver(true)

    })



    useEffect(() => {
        newGame()
    }, [])

    return (
        <div>
            <h1 className="text-3xl text-center mb-8">Memory game</h1>
            <p className="text-center text-xl mb-5">{count}</p>
            <div className="w-[400px] lg:w-[550px]">
                <div className="flex flex-wrap gap-1 justify-center">
                    {dataArray.map((card) => {

                        return <Card image={card.image}
                            audio={card.sound}
                            key={card.id}
                            toggled={card === firstCard || card === secondCard || card.matched === true}
                            item={card}
                            handleSelectedCard={handleSelectedCard} />
                    })}
                </div>
                    {gameOver && <button className="block mx-auto bg-green-700 px-2 py-1 rounded-md mt-2" onClick={newGame}>Nová hra</button>}
            </div>
        </div>
    )
}

export default GameBoard
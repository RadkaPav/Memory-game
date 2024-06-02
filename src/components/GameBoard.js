import Card from "./Card"
import Button from "./Button"
import data from "../data/animals-game.js"
import { useState, useEffect } from "react"

const GameBoard = () => {
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)
    const [dataArray, setDataArray] = useState([])
    const [count, setCount] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(localStorage.getItem("score6"))
    const [option, setOption] = useState(6)

    const createArray = (option) => {
        const dataArray = data.sort(function () { return Math.random() - 0.5 })
        const selectionArray = dataArray.slice(0, option)
        const duplicatedArray = [...selectionArray, ...selectionArray].sort(function () { return Math.random() - 0.5 })
        let finalArray = []
        for (let i = 0; i < duplicatedArray.length; i++) {
            finalArray.push({ ...duplicatedArray[i], id: i })
        }
        setDataArray(finalArray)
        setScore(localStorage.getItem(`score${option}`))
    }

    const changeDifficulty = (option) => {
        setOption(option)
        createArray(option)
    }

    const newGame = () => {
        setFirstCard(null)
        setSecondCard(null)
        setCount(0)
        setGameOver(false)
        createArray(6)
        setOption(6)
    }

    const handleSelectedCard = (item) => {
        const audio = new Audio(item.sound)
        audio.play()
        if (!firstCard) {
            setFirstCard(item)
        } else if (!secondCard) {
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
            } else {
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
        if (dataArray.every(item => item.matched)) {
            setGameOver(true)
            if (count !== 0 && (count < score || score === null)) {
                setScore(count)
                if (option === 3) localStorage.setItem("score3", count)
                else if (option === 6) localStorage.setItem("score6", count)
                else localStorage.setItem("score12", count)
            }
        }
    })

    useEffect(() => {
        newGame()
    }, [])

    return (
        <div>
            <div className="flex justify-evenly">
                <Button name="Easy" changeDifficulty={changeDifficulty} id={3} option={option} />
                <Button name="Medium" changeDifficulty={changeDifficulty} id={6} option={option} />
                <Button name="Hard" changeDifficulty={changeDifficulty} id={12} option={option} />
            </div>

            <h1 className="text-3xl text-center mt-4 mb-4">Memory game</h1>
            <p className="text-center text-xl mb-5">Počet tahů: {count}</p>

            <div className={`w-[300px] 
                             ${option === 3 && "sm:w-[400px] "}
                             ${option === 6 && "md:w-[550px]"}
                             ${option === 12 && "sm:w-[550px] lg:w-[800px]"} `}>
                <div className="flex flex-wrap gap-1 justify-center">
                    {dataArray.map((card) => {
                        return <Card image={card.image}
                            audio={card.sound}
                            key={card.id}
                            toggled={card === firstCard || card === secondCard || card.matched === true}
                            item={card}
                            option={option}
                            handleSelectedCard={handleSelectedCard} />
                    })}
                </div>

                <div className="text-center mt-4">
                    <p>Nejlepší skóre: {score}</p>
                </div>

                {gameOver && <button className="block mx-auto bg-green-700 px-2 py-1 rounded-md mt-2" onClick={newGame}>Nová hra</button>}
            </div>
        </div>
    )
}

export default GameBoard
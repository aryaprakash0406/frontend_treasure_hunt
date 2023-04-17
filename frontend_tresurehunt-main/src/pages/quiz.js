import React, { useEffect, useState } from 'react'
import side_profile from '../assets/side_hero_img.png'
import q1 from '../assets/q1.png'
import q2 from '../assets/q2.png'
import q3 from '../assets/q3.png'
import q4 from '../assets/q4.png'
import q5 from '../assets/q5.png'
import axios from 'axios'
import { base_url } from '../utils/apiBaseUrl'
import { Link, useNavigate } from 'react-router-dom'
const Quiz = () => {
    const [step, setStep] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const step = localStorage.getItem('step')
        if (step && parseInt(step) < 5) {
            setStep(parseInt(step))
        }
    }, [])
    const handleReset = () => {
        localStorage.removeItem('step')
        setStep(0)
        navigate('/')

    }

    return (
        <div className='bg-[#345778] min-h-screen'>
            <div >
                <h1 className='text-4xl  text-center text-white'>Treasure Hunt</h1>
            </div>
            <>
                {

                    step === 0 && <Question
                        question={`
                    The man in this picture stated I don’t afraid of ______.

                    hint:-He is very popular and was demanding for free Khalisthan.One of his supporter also stated "Deep had clearly said that talks are the (only) way but he clearly asking youths to pick up weapon,"


                    `}
                        step={step}
                        setStep={setStep}
                        img_url={q1}
                    />

                }
                {

                    step === 1 && <Question
                        question="I have blades but I’m not a knife. Want to cool down? Give me a whirl.
                        "
                        step={step}
                        isDeadEnd={true}
                        setStep={setStep}
                        img_url={q2}
                    />
                }
                {
                    step === 2 && <Question
                        question="I’m a biscuit but got married to a gold.
                      "
                        step={step}
                        setStep={setStep}
                        img_url={q3}
                    />
                }
                {
                    step === 3 && <Question
                        question="I am phenomenal.I don’t know who am I.You will get closer to treasure if you find me."
                        step={step}
                        isDeadEnd={true}
                        setStep={setStep}
                        img_url={q4}
                    />
                }
                {
                    step === 4 && <Question
                        question="Write something at the end to get your treasure."
                        step={step}
                        setStep={setStep}
                        img_url={q5}
                    />

                }
                {
                    step >= 5 && <div className='flex justify-center items-center min-h-screen'>
                        <div className='bg-white p-4 rounded-lg'>
                            <h2 className='text-2xl text-center mt'>Congratulations</h2>
                            <p className='text-center mt-4'>You have successfully completed the treasure hunt</p>

                            <button className='bg-blue-500 text-white p-2 rounded-lg px-4 ml-3 mt-6' onClick={handleReset}>Back To Home Page</button>
                            <Link to='/leaderboard'>
                                <button className='bg-blue-500 text-white p-2 rounded-lg px-4 ml-3 mt-6'>See LeaderBoard</button>
                            </Link>

                        </div
                        >
                    </div>
                }
            </>

        </div>
    )
}

export default Quiz



const Question = ({ question, img_url, selected, step, setStep, isDeadEnd }) => {
    const [answer, setAnswer] = useState('')
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer + 1)
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(`${base_url}/ans`, {
            q_no: step + 1,
            ans: answer.toLowerCase(),
            time: timer,
            email: localStorage.getItem('email')
        })
        setAnswer('')
        console.log(res.data)
        if (!res.data.data.isCorrect && isDeadEnd) {
            setStep(0)
            return
        }
        setStep(step + 1);
        localStorage.setItem('step', step + 1)
    }

    return (
        <div className='flex justify-center gap-4 min-h-screen items-center'>
            <img src={side_profile} alt="" />
            <div className='bg-white w-1/2 p-4 rounded-lg'>
                <h2 className='text-2xl text-center'>Question {step + 1}</h2>
                <img src={img_url} alt="" className='mx-auto' />
                <p className='text-center mt-2'
                >{question}
                </p>
                {
                    isDeadEnd && <p className='text-center mt-2 text-red-500'>Alert:-This is dead end state ,Your wrong answer will take you to the start of game.</p>
                }
                <div className='flex justify-center mt-2'>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            required
                            className='border-2 border-gray-300 p-2 rounded-lg'
                            value={answer}
                            autoFocus
                            onChange={(e) => setAnswer(e.target.value)}
                        />

                        <button className='bg-blue-500 text-white p-2 rounded-lg px-4 ml-3' type='submit'>
                            Submit
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}
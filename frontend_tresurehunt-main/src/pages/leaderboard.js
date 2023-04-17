import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { base_url } from '../utils/apiBaseUrl'
import { Link } from 'react-router-dom'

const LeaderBoard = () => {
    const [leaderBoard, setLeaderBoard] = useState([])
    useEffect(() => {
        const fetchLeaderBoard = async () => {
            const res = await axios(`${base_url}/leader`)
            const data = res.data.data.users
            setLeaderBoard(data)
        }
        fetchLeaderBoard()
    }, [])



    console.log("leaderBoard", leaderBoard)
    return (
        <div className='min-h-screen bg-[#345778] flex flex-col items-center '>
            <h1 className='text-white text-3xl text-center'>LeaderBoard</h1>
            {/* generate a rank tables for the player */}
            <div className="flex flex-col w-[75%] mx-auto">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rank
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Score
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">

                                    {
                                        leaderBoard && leaderBoard.map((user, index) => {
                                            return (
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{index + 1}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{user.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{user.score}</div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
            <Link to='/' className='bg-white px-4 py-2  rounded mt-5'>
                back to home
            </Link>
        </div>
    )
}

export default LeaderBoard
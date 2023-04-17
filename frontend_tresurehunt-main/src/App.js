import axios from "axios";
import { useState } from "react";
import { base_url } from "./utils/apiBaseUrl";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${base_url}/create`, {
      email
    }
    )
    localStorage.setItem('email', email)
    if (res.data.status === 'success') {
      navigate('/quiz')
    }
    console.log(email);
  };

  return (
    <div className="text-lg  min-h-screen bg-[#345778] p-4 flex justify-center items-center flex-col relative">
      <Link to='admin-login'>
        <div className="absolute top-10 text-white right-10 border-2 border-white rounded p-1 cursor-pointer">Admin Pannel</div>
      </Link>
      <h1 className="text-white text-3xl text-center">Treasure Hunt</h1>
      <div className="flex justify-center ">
        <div className="bg-white w-fit p-10 rounded-lg">
          <h2 className="text-2xl text-center">Welcome to the Treasure Hunt</h2>
          <p className="text-center">Please enter your email to start the game</p>
          <div className="flex justify-center">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-300 p-2 rounded-lg mt-3"
              />

              <button className="bg-blue-500 text-white p-2 rounded-lg px-4 ml-3">
                Start
              </button>
            </form>
          </div>
          <Link to='/leaderboard'>
            <p className="mt-3 text-blue-500 cursor-pointer">See LeaderBoard instead?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;

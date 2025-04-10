import React, { useState } from 'react'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/users/admin/login',{email,password});
            if (response.data.success) {
              setToken(response.data.token);
            } else {
              toast(response.data.message);
            }
        } catch (error) {
          console.error("Error Submitting form as Admin: "+error);
          toast.error("Error Submitting form as Admin: "+error.message);
        }
    }
  return (
    <div className="items-center min-h-screen flex justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-3 max-w-md">
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                 value={email} 
                 className='rounded w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder="johndoe@gmail.com"/>
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input
                 onChange={(e) => setPassword(e.target.value)} value={password} 
                className='rounded w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder="Enter your password"/>
            </div>
            <button type="submit" className="mt-2 w-full py-2 px-4 rounded-md bg-black text-white cursor-pointer">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login

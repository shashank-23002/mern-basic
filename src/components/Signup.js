import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const Signup=()=>
{ 
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate=useNavigate();

    useEffect(()=>
    {
        const auth=localStorage.getItem('user');
        if(auth)
        {
            navigate("/");
        }
    })

    const collectData= async ()=>
    {
        console.warn(name,email,password);
        let result= await fetch('http://localhost:5000/register',{
            method:'post',
            body: JSON.stringify({ name,email,password }),
            headers:{
                'Content-Type':'application/json'
            },
        });

        result=await result.json();
        console.warn(result);
        localStorage.setItem('user',JSON.stringify(result.result));
        localStorage.setItem('token',JSON.stringify(result.auth));

        if(result){
            navigate('/');
        }
    }

    return(
        <div className='signup-page'>
            <h1>Register</h1>
            <input className="input-box" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            <input className="input-box" type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Email"/>
            <input className="input-box" type="password" value={email} onChange={(e)=>setEmail(e.target.value)}placeholder="Password"/>
            <button onClick={collectData} className="sign-btn" type="button">Sign Up</button>
        </div>
    )
}

export default Signup;
import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';

const UpdateProduct=()=>{
    const [name,setName]=React.useState('');
    const [price,setPrice]=React.useState('');
    const [category,setCategory]=React.useState('');
    const [company,setCompany]=React.useState('');
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=async()=>{
        // console.warn(params);
        let result=await fetch(`http://localhost:5000/product/${params.id}`);
        result=await result.json();
        // console.warn(result);
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct=async ()=>{
        // console.warn(name,price,category,company);
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':"application/json"
            }

        });
        result=await result.json();
        console.warn(result);
        navigate('/');
    }

    return(
        <div className='signup-page'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter name' className='input-box' value={name} onChange={(e)=>{setName(e.target.value)}}/>
            {/* {error && !name && <span className='invalid-input'>Enter valid name</span>} */}

            <input type="text" placeholder='Enter price' className='input-box' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {/* {error && !price && <span className='invalid-input'>Enter valid price</span>} */}


            <input type="text" placeholder='Enter category' className='input-box' value={category}onChange={(e)=>setCategory(e.target.value)}/>
            {/* {error && !category && <span className='invalid-input'>Enter valid category</span>} */}


            <input type="text" placeholder='Enter company' className='input-box' value={company} onChange={(e)=>setCompany(e.target.value)}/>
            {/* {error && !company && <span className='invalid-input'>Enter valid company</span>} */}


            <button className='login-btn' onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;
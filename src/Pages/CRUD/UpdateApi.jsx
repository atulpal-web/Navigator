import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { data, redirect, useNavigate, useParams } from 'react-router-dom'

const UpdateApi = () => {
     const { register, handleSubmit, reset } = useForm()


   //// redirect 
     const redirect =   useNavigate ()

///////get id from url
const {productId} = useParams()
console.log(productId)

  ///// bget single product data 

var URL = "https://67c91cea0acf98d07088d9be.mockapi.io/Product"

const singleproduct = async () => {
    const res = await axios.get(`${URL}/${productId}`)
    console.log(res.data)
    reset(res.data)
    
}
    useEffect (() => {
        singleproduct()
    },[])

const update = async (data) => {
    
        await axios.put (`${URL}/${productId}`,data)
        .then((res)=> {
            console.log(res.data)
            alert("update")
            redirect('/getApi')
        })
    
        .catch ((err) =>console.log(err))
    }
    
    

  return (
    <>
    <form className="col-lg-4 mx-auto my-5 p-5 shadow" method="post" onSubmit={handleSubmit(update)} >
                <div className="mt-4">
                    <select className="form-select" {...register('p_category')} required>
                        <option value="">---select category---</option>
                        <option value="Cloths">Cloths</option>
                        <option value="Electronic">Electronic</option>
                        <option value="Kids">Kids</option>
                        <option value="Others">Other</option>
                    </select>
                </div>

                <div className="mt-4">
                    <input
                        type="text"
                        {...register('p_name', { required: true })}
                        className="form-control"
                        placeholder="Enter Product"
                    />
                </div>

                <div className="mt-4">
                    <input
                        type="number"
                        {...register('p_price', { required: true })}
                        className="form-control"
                        placeholder="Enter price"
                    />
                </div>

                <div className="mt-4">
                    <input
                        type="url"
                        {...register('p_url', { required: true })} 
                        className="form-control"
                        placeholder="Enter URL"
                    />
                </div>

                <div className="mt-4">
                    <button type="submit" className="btn btn-outline-warning w-25">
                        Update
                    </button>
                </div>
            </form>
    </>
  )
}

export default UpdateApi
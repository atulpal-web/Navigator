import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CreateApi = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate(); 
    const URL = 'https://67c91cea0acf98d07088d9be.mockapi.io/Product';

   
    const Product = async (data) => {
        try {
            const response = await axios.post(URL, data);
            alert("Product added successfully");
            reset(); 
            navigate('/getApi'); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <form className="col-lg-4 mx-auto my-5 p-5 shadow" method="post" onSubmit={handleSubmit(Product)}>
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
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateApi;

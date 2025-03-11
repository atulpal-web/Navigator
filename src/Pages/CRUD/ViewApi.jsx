import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const ViewApi = () => {
  const [Products, setProduct] = useState([]);
  
 
  const URL = 'https://67c91cea0acf98d07088d9be.mockapi.io/Product'; 

  const showProduct = async () => {
    try {
      const response = await axios.get(URL);
      setProduct(response.data); 
    } catch (error) {
      console.error('Error fetching the products', error);
    }
  };

  const trash = async (id) =>{
  try{
    if (window.confirm("Do you want to delete this product")) {
      await axios.delete(`${URL}/${id}`)
      .then((res) => {
        console.log(res)
        alert("Your product deleted")
        showProduct()
      })
      .catch((err) => console.log(err))
    }
  }catch (error) {
    console.log('error:',error);
  }
}
  useEffect(() => {
    showProduct();
  }, []);

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-success">
          <thead className="table-dark-hover">
            <tr>
              <th> Sr.No</th>
              <th>Category</th>
              <th>Name</th>
              <th>Price</th>
              <th>Images</th>
              <th>Delete</th>
              <th>Update</th>

            </tr>
          </thead>
          <tbody>
            {Products && Products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.p_category}</td>
                <td>{product.p_name}</td>
                <td>{product.p_price}</td>
                <td>
                  <img src={product.p_url} alt={product.p_name} width={80} height={80} />
                </td>
                <td>
                <button onClick={() => trash(product.id)} className="btn btn-danger "><FaTrash/></button>
                </td>
                <td>
                <NavLink to={`/update/${product.id}`} className="btn btn-warning"><FaPen/></NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewApi;

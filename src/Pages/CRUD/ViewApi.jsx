import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const ViewApi = () => {
  const [Products, setProduct] = useState([]);
   
  ////// search input
  const [search_cat,setSearch] = useState("")


  /////// price 
  const [getprice,setprice] = useState("")
 
  /// sorting
  const [getSort, setSort] = useState("")
 
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

 

    const filterData = Products.filter((ele) => {
    return ele.p_category.toLowerCase().includes(search_cat.toLowerCase())
  })

  .filter((ele) => {
    if (getprice === "ltThousand") {
      return ele.p_price <= 4000;  
    } else if (getprice === "gtThousand") {
      return ele.p_price > 4000; 
    } else {
      return ele;  
    }
  })
  .sort((a, b) => {
    if (getSort === "asc") {
      return a.p_name.localeCompare(b.p_name);
    } else if (getSort === "desc") {
      return b.p_name.localeCompare(a.p_name);
    }
    return 0;  
  });


  
  return (
    <>
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-4">
          <input type="search_cat" onChange={(e)=>setSearch(e.target.value)} className='form-control'  placeholder='Enter category'/>
        </div>
        <div className="col-lg-4">
          <select className='form-select'  onChange={(e)=>setprice(e.target.value)}>
            <option value="">---select price---</option>
            <option value="ltThousand">{`price < 4000`}</option>
            <option value="gtThousand">{`price > 4000`}</option>
          </select>
        </div>

        <div className="col-lg-4">
                        <select className="form-select" onChange={(e)=>setSort(e.target.value)}>
                            <option value="">--- Select Price ---</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>

      </div>
      <div className="table-responsive mt-4">
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
            {filterData && filterData.map((product, index) => (
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
      </div>
    </>
  );
};


export default ViewApi;


import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const url = "http://localhost:5000"
  const [list, setList] = useState([]);
  const currency = "₹"

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data.data)
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error("Error");
    }
  }

  const removeProduct = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='!py-2 flex flex-col gap-3 !px-2'>
      <p>All Product List</p>
      <div>
        {/* ---------List table title---------- */}
        <div className='hidden md:grid grid-cols-[1fr_4fr_1fr_1fr_1fr] items-center !py-1 !px-2 border bg-gray-300 text-sm !mb-2'>
          <b>Image</b>
          <b>Name</b>
          <b className='text-center'>Category</b>
          <b className='text-center'>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* --------------List product---------------- */}

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_4fr_1fr_1fr_1fr] items-center gap-2 !py-1 !px-2 border border-gray-300 shadow text-sm !mb-2' key={index}>
              <img className='w-15' src={`${url}/images/` + item.image} alt="img" />
              {console.log(item.image)}
              <p>{item.name}</p>
              <p className='text-center'>{item.category}</p>
              <p className='text-center'>{currency}{item.price}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List
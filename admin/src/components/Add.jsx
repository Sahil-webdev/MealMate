import React, { useEffect, useState } from "react";
import upload from "../assets/upload.png";
// import styles from "./Add.module.css";
import axios from "axios"
import { toast } from "react-toastify";


const Add = () => {

  const url = "https://mealmate-backend-fddu.onrender.com"

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Pizza"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }));
  }

  //This is only for check that is data getting update on not, so yes it is
  // useEffect(()=>{
  //   console.log(data)
  // },[data])


  const onSubmitHandler = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)

    const response = await axios.post(`${url}/api/food/add`, formData)

    if (response.data.success) {
      toast.success(response.data.message)
      setData({
        name: "",
        description: "",
        price: "",
        category: "Pizza"
      })
      setImage(false)

    } else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className="!ml-12">
      <form onSubmit={onSubmitHandler} className='flex flex-col !my-8 w-full items-start !gap-4'>
        <div className="">
          <p className="!mb-8 !font-medium text-3xl">Image Upload</p>
          <div className="flex gap-4">
            <label
              className="border border-dashed border-gray-400 py-2 px-5 cursor-pointer"
              htmlFor="image"
            >
              <img className="w-32 !px-5" src={image ? URL.createObjectURL(image) : upload} alt="" />
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
              <p className="text-gray-400 text-center">Upload</p>
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} className='w-full max-w-[500px] py-2 px-3' type="text" name="name" placeholder="Type here" />
        </div>

        <div className='w-full'>
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="3"

            placeholder="Write content here"
            className='w-full max-w-[500px] py-2 px-3'
          ></textarea>
        </div>

        <div className='flex gap-4'>
          <div className=''>
            <p className=" !pb-1">Product Category</p>
            <select  onChange={onChangeHandler} name="category">
              <option value="Pizza">Pizza</option>
              <option value="Coffee">Coffee</option>
              <option value="French Fries">French Fries</option>
              <option value="Burger">Burger</option>
              <option value="Pasta">Pasta</option>
              <option value="Cake">Cake</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Brownie">Brownie</option>
              <option value="Moctail">Moctail</option>
              <option value="Noodle">Noodle</option>
            </select>
          </div>

          <div className=''>
            <p className="!pb-1">Price</p>
            <input  onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="price" />
          </div>
        </div>
        <button type='submit' className='w-28 !py-3 mt-4 bg-black text-white active:bg-gray-700'>ADD</button>
      </form>
    </div>
  );
};

export default Add;

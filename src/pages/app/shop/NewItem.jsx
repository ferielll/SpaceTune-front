import { useState } from "react";
import axios from "axios";
import React from "react";


const NewItem = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [isUsed, setIsUsed] = useState(false);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [user,setUser] = useState('623cfed9c3940b11045465e3')


  //const history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const item = { name, type, isUsed,description,price,user };

    //startLoading();
    
    try {
      await axios
        .post("http://localhost:3000/spacetune/api/shop/create", {
          item,
        })
        .then((res) => {
          console.log(res, "res");
         /* if (!res.item.success) {
            //stopLoading();
            return;
          }*/
        });
     // stopLoading();
    } catch (err) {
      console.log(err, "error");
    }
  }

  return (
    <div className="flex w-1/2 justify-center items-center">
      <h2 className="mb-4 text-2xl font-bold text-center">Add a New Item</h2>
      <form onSubmit={handleSubmit} className="w-1/2 p-12 bg-white rounded-2xl">
        <label>Item name:</label>
        <input 
          type="text" 
          required 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Item type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option defaultValue value='guitar'>guitar</option>
          <option value='piano'>piano</option>
        </select>
        <label>Item description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Item condition:</label>
        <select
          value={isUsed}
          onChange={(e) => setIsUsed(e.target.value)}
        >
          <option defaultValue value={false}>New</option>
          <option value={true}>Used</option>
        </select>
        <label>Item price:</label>
        <input 
          type="text" 
          required 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button>Add Item</button>
      </form>
    </div>
  );
}
 
export default NewItem;
import React, {useState} from 'react';
import axios from 'axios';
import '../customer/Profilepic.css';

async function postImages({image,dishId}){
    const formData = new FormData();
    formData.append("image", image)
    formData.append("dishId", dishId)
    const result = await axios.post('http://localhost:8080/dish/images', formData, 
    { 
        headers: {'Content-Type': 'multipart/form-data'}
    })
    console.log("result", result)
    localStorage.setItem('key', result.data.key);
    return result.data;
}
const Dishpic = ({dishId}) => {
    const [file, setFile] = useState();
    const [images, setImages] = useState([])
    const submit = async (event) => {
      event.preventDefault()
      const result = postImages({image:file, dishId: dishId })
      setImages([result.image, ...images])
    }

  const fileSelected = (event) => {
    const fil = event.target.files[0]
    setFile(fil)
  }

    return (
    <div>
        <form onSubmit={submit} className="profile_chose">
            <input onChange={fileSelected} type="file" accept="image/*" className="profile_browse"></input>
            <button type="submit" className="profile_button">Submit</button>
        </form>
    </div>
    )
}


export default Dishpic;
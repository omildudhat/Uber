import React,{useState} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../customer/Profilepic.css';

async function postImages({image,resturantId}){
    const formData = new FormData();
    formData.append("image", image)
    formData.append("resturantId", resturantId)
    const result = await axios.post('http://localhost:8080/resturant/images', formData, 
    { 
        headers: {'Content-Type': 'multipart/form-data'}
    })
    console.log("result", result)
    localStorage.setItem('key', result.data.key);
    return result.data;
}
const Respic = () => {
    const [file, setFile] = useState();
    const [images, setImages] = useState([])
    const resturant = useSelector((state) => state.resturant);
    const submit = async (event) => {
      event.preventDefault()
      console.log("res", resturant.resturant.resturantId)
      const result = postImages({image:file, resturantId: resturant.resturant.resturantId })
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


export default Respic;
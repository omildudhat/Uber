import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../customer/Showprofile.css'

const Resshow = () => {
    const resturant = useSelector((state) => state.resturant);
    const [key, setKey] = useState();
    useEffect(() => {
        const getkey = async () => {
            try{
                const resId = {
                    resturantId : resturant.resturant.resturantId
                }
                const res = await axios.post("http://localhost:8080/resturant/key", resId)
                console.log("------",res)
                setKey(res.data.key)
                }catch(err){
                    console.log(err)
                }
            } 
            getkey()
        }, [])
    return (
    <div>
        <div className="showProfile">
                {key && <img src={`http://localhost:8080/images/${key}`} className="showProfile_img"/>}
            </div>
    </div>)
}



export default Resshow;
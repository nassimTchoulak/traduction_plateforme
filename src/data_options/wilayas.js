import React, {useEffect, useState} from 'react' ;
import Axios from "axios" ;


const Wilayas = (props) =>{

    const [wilaya,setWilays] = useState([]) ;



    useEffect(()=>{
        Axios.get("http://localhost/api/wilayas").then((res)=>{

            setWilays(res.data.data) ;

        }).catch(err=>console.log(err))
    },[]) ;





    return <React.Fragment>

        <option value="" disabled selected>La Wilayas </option>

        {
            wilaya.map((i,itr)=>{


                    return <option key={itr} value={i.nom}> {i.nom} </option>


            })
        }


    </React.Fragment>
}
export default Wilayas ;
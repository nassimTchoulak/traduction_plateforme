import React, {useEffect, useState} from 'react' ;
import Axios from "axios" ;


const Communes = (props) =>{

        const [communes,SetCommunes] = useState([]) ;
    const [filter,SetFilter] = useState(new RegExp("")) ;

     useEffect(()=>{
            Axios.get("http://localhost/api/communes").then((res)=>{

                SetCommunes(res.data.data) ;
                console.log("see")

            }).catch(err=>console.log(err))
        },[]) ;

    useEffect(()=>{
        SetFilter(new RegExp(props.selected))
        console.log("see")

    },[props.selected]) ;


    return <React.Fragment>

        <option value="" disabled selected>La Commune</option>

        {
            communes.map((i,otr)=>{
                if(filter.test(i.wilaya)) {

                    return <option key={otr} value={i.commune}>{i.commune}</option>
                }
                else{
                    return null ;
                }

            })
        }






    </React.Fragment>
}
export default Communes ;
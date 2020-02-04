import React, {useState} from "react";

import Axios from "axios";

const EndTraduction = (props) =>{

    const [file,setFile] = useState(null) ;
    const [name,setName] = useState(" Remettre ")

    return <tr className={"table_element" + ((() => {
        if (props.date_fin !== null) {
            return " accepted"
        }
    })())} >

        <td>{(new Date(props.date_debut)).toLocaleString('en-GB')}</td>
        <td>{props.nom_document} </td>
        <td>{props.langue_source} </td>
        <td>{props.langue_destination} </td>
        <td>{props.type_traduction} </td>
        <td> {props.email}</td>

        <td>{(()=>{

            if((props.date_fin===null)){
                return <React.Fragment> <input type={"button"} onClick={()=>{
                    document.querySelector("#file_sub"+props.id_devis).click()}
                } className={"validate_button"} value={name}/>

                    <input type={"file"} id={"file_sub"+props.id_devis} onChange={(e)=>{
                        setFile(e.target.files[0])
                        setName(e.target.files[0].name)
                    }} accept={".pdf"} />

                </React.Fragment>
            }
            else{
                if (props.prix===null){
                    return "refused" ;
                }
                return props.prix ;}})()

        }

        </td>


        <td> {((() => {
            if (props.note === null) {
                if(props.date_fin===null){
                    return <input type={"button"} className={"my_button_v16"} value={"  Envoyer "} onClick={()=>{
                        if(file===null){
                            return 0 ;
                        }

                        let data = new FormData();
                        data.append("id_devis", props.id_devis);
                        data.append("id_traducteur", localStorage.getItem('id_traducteur'));
                        data.append("document",file);
                        Axios.post('http://localhost/api/remettre_traduction',data,{
                            headers: {
                                // 'Content-Type': 'application/x-www-form-urlencoded'
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((res)=>{
                            if(res.data.status){

                            }
                        }).catch((err)=>{
                            console.log(err) ;
                        })
                    }
                    }/>
                }
                return " aucunne note "
            } else {
                return props.note
            }
        })())} </td>
    </tr>


}

export default EndTraduction ;
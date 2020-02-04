import React from "react";
import Axios from 'axios' ;
import './cardstyle.css' ;

import Signal from "./signaller";
import AdminClientPlus from "./admin/AdminClientPlus";

class ClientPresentation extends React.Component {

    constructor(props){
        super(props);
        this.state = { traducteur : { nom:"" }, loaded:false} ;
    }

    componentDidMount() {

        let info = window.location.pathname.split('/').pop() ;

        Axios.get('http://localhost/api/get_client_profile?email='+info).then((res)=>{

            if(res.data.length>0){
                this.setState({traducteur : res.data[0],
                    loaded:true,
                    src:"http://localhost/files/clients/"+info+".jpg" ,

                })
            }



        }).catch((err)=>{
            console.log(err)
        })
    }
    titleCase(str) {
        if(str===undefined){
            return ' ';
        }
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    render(){
        return <div className={"col-xs-12"}>
            {
                this.state.loaded&&<div className={"col-xs-10 col-xs-offset-1"} style={{paddingTop:"50px",paddingBottom:"50px"}}>

                    <h2 style={{fontWeight:"bolder",paddingBottom:"20px"}}>Voici le profile du traducteur Mr/Mme {this.titleCase(this.state.traducteur.nom)} </h2>


                    <div className={"col-xs-5"}>

                        <img  src={this.state.src} className={"profile_pic"} onError={()=>{
                            this.setState({src:"http://localhost/files/traducteurs/user.jpg"})
                        }}   />



                        <div className={"col-xs-12"}  style={{paddingTop:"100px"}}>

                            <Signal destination={this.state.traducteur.email} type={'client'} source={localStorage.getItem('id_traducteur')} />

                        </div>

                    </div>
                    <div className={"col-xs-5 col-xs-offset-1"}>

                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Nom : </div>
                            {this.titleCase(this.state.traducteur.nom)}</div>


                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Prenom : </div>
                            {this.titleCase(this.state.traducteur.prenom)}</div>


                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Numero : </div>
                            {this.titleCase(this.state.traducteur.tel)}</div>


                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Email : </div>
                            {this.state.traducteur.email}</div>


                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Wilaya : </div>
                            {this.titleCase(this.state.traducteur.wilaya)}</div>



                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"40px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Adress : </div>
                            {this.titleCase(this.state.traducteur.adress)}</div>











                        {(this.state.traducteur.assermente===1)&&<div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"40px"}} align={"left"}> <div style={{fontWeight:"bolder",display:"contents"}}>
                            Traducteur Assermente :  <span className={"glyphicon glyphicon-ok"} style={{color:'#1C39BB'}}> </span> </div>
                        </div>}





                    </div>

                </div>
            }

            {(localStorage.getItem('admin')!==null)&&<AdminClientPlus />}


        </div>
    }
}

export default ClientPresentation ;
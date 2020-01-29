import React from "react";
import Axios from 'axios' ;
import './cardstyle.css' ;

import Signal from "./signaller";

class TraducteurPresentation extends React.Component {

    constructor(props){
        super(props);
        this.state = { traducteur : {},loaded:false} ;
    }

    componentDidMount() {

        let info = window.location.pathname.split('/').pop() ;

        Axios.get('http://localhost/api/get_profile_traducteur?mail='+info).then((res)=>{

            if(res.data[0].moyenne===null){
                res.data[0].moyenne = 3 ;
            }

            this.setState({traducteur : res.data[0],
                loaded:true,
                src:"http://localhost/files/traducteurs/"+info+".jpg" ,

            })

        }).catch((err)=>{
            console.log(err)
        })
    }
    titleCase(str) {
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

                        <div className={"col-xs-offset-2"} align={"left"} style={{paddingTop:"40px",fontWeight:"bold",fontSize:"110%"}}>

                            <li>  Nombre de traductions: <div style={{display:"contents",color:"#1c3359"}}> {this.state.traducteur.nb_traduction} ducuments </div>   </li>

                            <li>  Note Moyenne: <div style={{display:"contents",color:"#c7bf52"}}> {this.state.traducteur.moyenne.toString().substr(0,3)+" " }
                            <span className={"glyphicon glyphicon-star"} style={{color:"#c7bf52"}}></span> </div>   </li>
                        </div>

                        <div className={"col-xs-12"}  style={{paddingTop:"100px"}}>

                            <Signal destination={this.state.traducteur.email} type={'traducteur'} source={localStorage.getItem('id_client')} />

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
                            {this.titleCase(this.state.traducteur.email)}</div>


                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Wilaya : </div>
                            {this.titleCase(this.state.traducteur.wilaya)}</div>



                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"40px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Adress : </div>
                            {this.titleCase(this.state.traducteur.adress)}</div>


                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"40px"}} align={"left"}> <div style={{fontWeight:"bolder",display:"contents"}}>Presentation : </div>
                            {this.titleCase(this.state.traducteur.presentation)}</div>



                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"40px"}} align={"left"}> <div style={{fontWeight:"bolder",display:"contents"}}>Langues d'expertise : </div>
                            {this.state.traducteur.langues.split('|').map((i)=>{
                                return <li> {i}</li>
                            })}</div>


                        <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"40px"}} align={"left"}> <div style={{fontWeight:"bolder",display:"contents"}}>Les domains de traductions métrisés : </div>
                            {this.state.traducteur.type_traduction.split('|').map((i)=>{
                                return <li> {i}</li>
                            })}</div>


                        {(this.state.traducteur.assermente===1)&&<div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"40px"}} align={"left"}> <div style={{fontWeight:"bolder",display:"contents"}}>
                            Traducteur Assermente :  <span className={"glyphicon glyphicon-ok"} style={{color:'#1C39BB'}}> </span> </div>
                            </div>}





                    </div>

                </div>
            }


        </div>
    }
}

export default TraducteurPresentation ;
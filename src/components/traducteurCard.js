import React, {useState} from "react";

import './cardstyle.css' ;
import  'bootstrap/dist/css/bootstrap.min.css';
import '../my_ui.css';

class  traducteurCard extends React.Component {

    constructor(props){
        super(props) ;

        this.nom = props.nom ;
        this.prenom = props.prenom ;
        this.langues = props.langues.split('|') ;
        this.presentation  = props.presentation.substr(0,50) +"..." ;
       /* this.presentation = "Titulaire d'un diplôme de traducteur, j'exerce depuis sept ans en tant que traducteur pour un site internet pour " +
            "qui je traduis des articles de ".substr(0,100) +"...";*/
        this.assermente = (props.assermente===1) ;
        this.note = (props.moyenne!==null)?props.moyenne:3 ;
        this.email = props.email ;
        this.types = props.type_traduction.split('|') ;
        this.nb = props.nb_traduction ;



        this.state =  {
            src : 'http://localhost/files/traducteurs/'+this.email+".jpg"
        }

        this.click_action = props.action ;
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

    render() {
        return <div className={"col-md-4  col-xs-10  zero_pad"}>
            <div className={"col-xs-offset-1 col-xs-10 external_card zero_pad"}>


                {(this.click_action!==undefined)&&<div id={"hellow"}
                    style={{position:"absolute",top:"0px","left":"0px",zIndex:"10",backgroundColor:"#ff5774",padding:"10px",color:"white"}} onClick={()=>{
                    this.click_action() ;
                }}> soliciter Devis </div>}

            <div className={"col-xs-12 zero_pad  "} onClick={()=>{


                    window.location = "/presentation/traducteur/" + this.email;

            }}>
                <img width={"100%"} height={"300px"} className={"zero_pad"}  src={this.state.src}  onError={  ()=>{
                    this.setState({src:"http://localhost/files/traducteurs/user.jpg"})} }    />
            </div>
            <div className={"card_middle col-xs-12"}>
                Mr/Mme
                <div style={{fontFamily:"QuickSand",fontWeight:"bolder"}}>  {this.titleCase(this.nom) } {this.titleCase(this.prenom)} </div>
                <div style={{fontWeight:"lighter",fontSize:"90%",paddingLeft:'20px'}}> {this.presentation} </div>
                <div className={"col-xs-7"} style={{marginTop:"10px"}}> <div> Les langues: </div> {this.langues.map((i)=>{
                    return <span style={{color:"#261326",fontWeight:"bold"}}> {this.titleCase(i)}{' '}</span>
                })}</div>

                <div className={"col-xs-5"} style={{marginTop:"10px"}}>  Traduction: {this.types.map((i)=>{
                    return <span style={{color:"#261326",fontWeight:"bold"}}> {this.titleCase(i)}{' '}</span>
                })} </div>

            </div>

            <div className={"card_end col-xs-12"}>
                <div className={"col-xs-6"}>

                    {this.assermente&&<div align={"left"}>
                        <span className={"glyphicon glyphicon-ok"} style={{color:'#1C39BB'}}> </span> <strong> Assermente </strong>

                </div>}



                </div>



                <div className={"col-xs-6"}>
                    <span className={"glyphicon glyphicon-star"} style={{color:"#c7bf52"}}></span> {this.note.toString().substr(0,3)} ({this.nb})

                </div>

            </div>


        </div>
        </div>


    }

}
export default traducteurCard ;
import React from "react";

import Axios from "axios";
import './../cardstyle.css' ;

import TraducteurCard from "../traducteurCard";

class Selection extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            displayed:true,
            candidates:[]
        }
    }


    seekTraducteur =  () =>{
        Axios.get('http://localhost/api/traducteurs_filer',{params:{ destination:this.props.who.destination|| "",
                                                            source:this.props.who.source||"",
                                                            type_traduction:this.props.who.type||"" , assermente:this.props.assermente||""
            }}).then((res)=>{
                console.log(res.data) ;

                this.setState({candidates:res.data})

        }).catch((err)=>{
            console.log(err)
        })
    }

    componentDidMount() {

        this.seekTraducteur()

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.nb!==this.props.nb) {
            this.setState({displayed: true})
            this.seekTraducteur()
        }
    }

    render() {

        return <React.Fragment>


            {this.state.displayed&&<div className={"col-xs-12 sel_login"}>



            <div className={"col-xs-12 sel_fields"}>

                <div className={"set_items col-xs-12"}>

                    <h2> Selectionnez Votre traducteur Qui  convient le plus à vos besoins :</h2>
                    <h4> voun ne pouvez demander un devis qu'une seul fois à un traducteur pour une demande de traduction </h4>

                <div id={"hello"} style={{position:"absolute",top:"0px",right:"30px",fontSize:"200%",cursor: "pointer"}}
                     onClick={()=>{
                         this.setState({displayed:false}) ;
                     }}>
                    <span className={"glyphicon glyphicon-remove"}></span></div>



                {this.state.candidates.map((i)=>{
                    return <TraducteurCard  {...i} action={()=>{
                        let f = new FormData() ;
                        f.append("id_demande",this.props.who.id_demande);
                        f.append("email_traducteur",i.email)
                            Axios.post('http://localhost/api/choose_traducteur',f, {
                                headers: {
                                    // 'Content-Type': 'application/x-www-form-urlencoded'
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then((res)=>{
                                alert("submitted devis")
                                    console.log(res.data);
                                    document.querySelector("#hello").click() ;


                            }).catch((err)=>{
                                console.log(err) ;
                            })

                    }
                    } />
                })}

                <div className={"col-xs-12 interline"}></div>

            </div>
            </div>



        </div>}
        </React.Fragment>

    }

}
export default Selection ;
import React from "react";

import Axios from "axios";

class Paiement extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            displayed:true,
            file:null
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.count!==prevProps.count){
            this.setState({displayed:true})
        }
    }

    render(){

        return <React.Fragment>


            {this.state.displayed&&<div className={"col-xs-12 sel_login"}>



                <div className={"col-xs-12 sel_fields"}>

                    <div className={"set_items col-xs-12"}>

                        <h2> Validez votre Paiement pour valider votre trasaction </h2>
                        <h4> nous vous assurons votre droit, nous vous protègerons contre tout abus </h4>

                        <div id={"hello"} style={{position:"absolute",top:"0px",right:"30px",fontSize:"200%",cursor: "pointer"}}
                             onClick={()=>{
                                 this.setState({displayed:false}) ;
                             }}>
                            <span className={"glyphicon glyphicon-remove"}></span></div>


                       <div className={"col-xs-6 col-xs-offset-3"}>
                           <div className={"col-xs-12 interline"}></div>

                           <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Recepteur : </div>
                               {this.props.traducteur}</div>
                           <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>document : </div>
                               {this.props.document}</div>
                           <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Prix : </div>
                               {this.props.prix} da </div>


                           <div className={"col-xs-12"} align={"left"}> <input type={"file"} id={"file123"}
                           onChange={(e)=>{
                               this.setState({file:e.target.files[0]})
                           }}/>
                           <input type={"button"} value={" inclure preuve "+(()=>{
                               if(this.state.file!==null){ return ' DONE '}
                               else{
                                   return " "
                               }
                           })()} className={"my_button_v16"} onClick={()=>{
                               document.querySelector("#file123").click() ;
                           }}/></div>
                           <div className={"col-xs-12"}>
                           <div className={"col-xs-4 col-xs-offset-4"}>
                               <input type={"button"} value={" valider la transaction "}

                                      onClick={()=>{

                                          let f = new FormData() ;
                                          f.append("id_devis", this.props.id_demande);
                                          f.append("mail_traducteur", this.props.traducteur);
                                          f.append("id_client", localStorage.getItem('id_client'));
                                          f.append("montant", this.props.prix);
                                          f.append("document",this.state.file) ;

                                          Axios.post('http://localhost/api/start_traduction',f,{
                                              headers: {
                                                  // 'Content-Type': 'application/x-www-form-urlencoded'
                                                  'Content-Type': 'multipart/form-data'
                                              }
                                          }).then((res)=>{
                                              console.log(res) ;
                                              if(res.data.status>0){
                                                            this.setState({displayed:false})
                                              }
                                          }).catch((err)=>{
                                              console.log(err)
                                          })
                                      }}
                                      className={" validate_button "}/>

                           </div></div>


                       </div>

                    </div>
                </div>


            </div>}
        </React.Fragment>

    }



}


export default Paiement ;
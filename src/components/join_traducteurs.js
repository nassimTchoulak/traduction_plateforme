import React from 'react' ;
import Communes from "../data_options/communes";
import Wilayas from "../data_options/wilayas";
import { BrowserRouter as Router, Route,  NavLink  } from "react-router-dom";


class Join_traducteur extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nom:"",
            prenom:"",
            email:"",
            number:"",
            wilaya:"",
            serment_file:"",
            assermente:false,
            cv_file_name:"",
            cv:null,




            display_code:true,
            code:""


        }
    }

    setWilyas = (val) =>{

        this.setState({wilaya:val})

    }


    render() {
        return <div className={"col-xs-12"}>
            {!this.state.display_code&&<div className={"col-xs-offset-1 col-xs-10 formulaire_aceuill"} style={{borderLeft:"solid 1px black",borderRight:"solid 1px black"}}>
                <h2 style={{"fontFamily":"Exo","fontWeight":"bolder"}}> Rejoignez Nous et recevez les offres de traductions
                     </h2>
                <div className={"col-xs-12"}>
                </div>

                <div className={"col-xs-12 interline "}></div>

                <h1 className={"col-xs-12 interline"} style={{ textAlign:"left"}}> <strong> > Les Informations personnels </strong></h1>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-4"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={" Votre Nom"} onChange={(e)=>{
                            this.setState({nom:e.target.value})}}/>
                    </div>
                    <div className={"col-xs-offset-1 col-xs-4"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={" Votre Prenom"} onChange={(e)=>{
                            this.setState({prenom:e.target.value})}}/>

                    </div>
                </div>


                <div className={"col-xs-12"}>
                <div className={"col-xs-offset-1 col-xs-5"}>
                    <input type={"text"} className={"my_text_box_v2"} placeholder={" Votre Email"} onChange={(e)=>{
                        this.setState({email:e.target.value})}}/>
                </div>
            </div>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-5"}>
                        <input type={"number"} className={"my_text_box_v2"} placeholder={" numero Tel"} onChange={(e)=>{
                            this.setState({number:e.target.value})}}/>
                    </div>
                </div>

                <div className={"col-xs-12 interline"}></div>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-4"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={" adress"} onChange={(e)=>{
                            this.setState({number:e.target.value})}}/>
                    </div>


                    <div className={"col-xs-offset-1 col-xs-2"}>
                        <select className={"my_text_box_v2"} id={"destination"} placeholder={"fr"} onChange={(e)=>{
                            this.setWilyas(e.target.value)
                        }}>
                            <Wilayas  />
                        </select>
                    </div>
                    <div className={"col-xs-offset-1 col-xs-2"}>
                        <select className={"my_text_box_v2"} id={"destination"} placeholder={"fr"}>
                            <Communes selected={this.state.wilaya} />
                        </select>
                    </div>
                </div>


                <h1 className={"col-xs-12 interline"} style={{ textAlign:"left"}}> <strong> > Vos compétances </strong></h1>

                <div className={"col-xs-6"}>
                    <div className={"col-xs-offset-1 col-xs-9"}>
                        <div className="checkbox">
                            <label><input type="checkbox" id={"assemente"} value="" checked={this.state.assermente} onChange={()=>{
                                this.setState({assermente:!this.state.assermente})
                            }}/>traducteur assermente</label>
                        </div>
                    </div>
                </div>
                {this.state.assermente&&<div className={"col-xs-6"}>
                    <div className={"col-xs-offset-1 col-xs-9"}>
                        <input type={"button"} className={"my_button_v16"} name={"firest"} value={(()=>{
                            if(this.state.serment_file===""){
                                return  " Inclure document" ;
                            }
                            else{
                                return this.state.serment_file;
                            }
                        })()}
                               onClick={()=>{
                                   document.querySelector("#file").click() ;
                               }}    />
                        <input type={"file"}
                               onChange={(e)=>{
                                   this.setState({serment_file:e.target.files[0].name,file:e.target.files[0]})
                               }} id={"file"} className={"col-xs-12"} name={"firest"}   accept={".pdf"} />
                    </div>
                </div>}
                <div className={"col-xs-12 interline"}></div>

                <div className={"col-xs-12"}>
                    <strong style={{marginRight:"40px"}}> Les langues : </strong>
                    <label className="checkbox-inline" style={{padding:"10px"}}><input type="checkbox" value="" id={"lang_fr"}/>Français</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"lan_ang"}/>Anglais</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"lan_ara"}/>Arabe</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"lan_esp"}/>Espagnole</label>

                </div>

                <div className={"col-xs-12 interline"}></div>

                <div className={"col-xs-12"}>
                    <strong style={{marginRight:"40px"}}> Type traduction : </strong>
                    <label className="checkbox-inline" style={{padding:"10px"}}><input type="checkbox" value="" id={"type_sci"}/>Scientifique</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"type_web"}/>Sites Web</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"type_ gen"}/>Generale</label>

                </div>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-9"}>
                        <textarea rows="6" id={"presentation"} cols="50" className={"my_text_box_v2"} placeholder={"petit Summury"} />
                    </div>
                </div>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-9"}>
                        <input type={"button"} className={"my_button_v16"} name={"firest"} value={(()=>{
                            if(this.state.cv_file_name===""){
                                return  " Inclure Votre CV " ;
                            }
                            else{
                                return this.state.cv_file_name;
                            }
                        })()}
                               onClick={()=>{
                                   document.querySelector("#file").click() ;
                               }}    />
                        <input type={"file"}
                               onChange={(e)=>{
                                   this.setState({cv_file_name:e.target.files[0].name,cv:e.target.files[0]})
                               }} id={"file"} className={"col-xs-12"} name={"firest"}   accept={".pdf"} />
                    </div>
                </div>





            </div>}

            {
                this.state.display_code&&<div className={"col-xs-12"} style={{height:"100vh"}}>


                    <h1 style={{"fontFamily":"Exo","fontWeight":"bolder"}}> Votre demande a été noté
                    </h1>
                    <div className={"col-xs-12 interline"}></div>

                    <h2 style={{"fontFamily":"Exo","fontWeight":"bolder"}}>  nous vous prions de vérifier l'activation de votre Compte Régulièrement avec votre code
                    </h2>

                    <div className={"col-xs-12 interline"}></div>

                    <h2 style={{"fontFamily":"Exo","fontWeight":"bolder",textAlign:"left",padding:"30px"}}> > Votre code de vérification : {this.state.code}
                    </h2>

                    <div className={"col-xs-12 interline "}></div>

                    <NavLink to={"/traducteur/login"} style={{marginTop:"200px"}} className={"my_button_v8"}> Vérifier Maintenant votre compte </NavLink>

                </div>
            }


        </div>
    }


}
export default Join_traducteur ;
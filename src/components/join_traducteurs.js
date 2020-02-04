import React from 'react' ;
import Communes from "../data_options/communes";
import Wilayas from "../data_options/wilayas";
import { BrowserRouter as Router, Route,  NavLink  } from "react-router-dom";
import Axios from 'axios' ;


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
            file_ser:null,
            assermente:false,
            cv_file_name:"",
            cv:null,
            password:"",
            password2:"",




            display_code:false,
            code:""


        }
    }

    setWilyas = (val) =>{

        this.setState({wilaya:val})

    }

    send_my_submission = () =>{



        if((this.state.password===this.state.password2)&&(this.state.cv!==null)&&(this.state.email!=="")){
            let form = new FormData();

            let langues = "" ;

            if(document.querySelector("#lan_ara").checked){
                langues += "arabe |" ;
            }
            if(document.querySelector("#lan_fr").checked){
                langues += "français |" ;
            }
            if(document.querySelector("#lan_eng").checked){
                langues += " englais |" ;
            }
            if(document.querySelector("#lan_esp").checked){
                langues += "espagnole |" ;
            }
            let type_traduction ="" ;

            if(document.querySelector("#type_gen")){
                type_traduction += " génerale |" ;
            }
            if(document.querySelector("#type_sci")){
                type_traduction += " scientifique |" ;
            }
            if(document.querySelector("#type_web")){
                type_traduction += " sites Web |" ;
            }

            type_traduction = type_traduction.replace(' ','').split('|').join('|') ;



            form.append("nom", this.state.nom);
            form.append("prenom", this.state.prenom);
            form.append("tel", this.state.number);
            form.append("adress",  document.querySelector("#adress").value);
            form.append("wilaya", this.state.wilaya);
            form.append("commune", document.querySelector("#commune").value);
            form.append("assermente",  (this.state.assermente)?"1":"0" );
            form.append("email", this.state.email);
            form.append("cv", this.state.cv);
            form.append("password", this.state.password);
            form.append("presentation",document.querySelector("#presentation").value) ;
            form.append("langues",langues) ;
            form.append("type_traduction",type_traduction) ;


                form.append("assermentation", this.state.file_ser);


            Axios.post('http://localhost:80/api/create_traducteur', form, {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                localStorage.setItem("tmp_traducteur",res.data.token) ;
                console.log(res.data) ;

                this.setState({display_code:true,code:res.data.token}) ;
            }).catch((err0)=>{
                alert(" duplicated email ") ;
                console.log(err0)
            })
        }
    }


    render() {
        return <div className={"col-xs-12"} style={{padding:'2%',backgroundColor:"#ebebeb"}}>

            {!this.state.display_code&&<div className={"col-xs-offset-1 col-xs-10 formulaire_aceuill"}
                                            style={{border:"solid 1px #d4d4d4",borderRadius:"5px 5px",backgroundColor:"white"}}>
                <h2 style={{"fontFamily":"Exo","fontWeight":"bolder",paddingTop:"20px"}}> Rejoignez Nous
                     </h2>
                <h2 style={{"fontFamily":"Exo","fontWeight":"bolder"}}> Recevez les offres de traductions
                </h2>
                <div className={"col-xs-12"}>
                </div>

                <div className={"col-xs-12 interline "}></div>

                <h1 className={"col-xs-12 interline"} style={{ textAlign:"left"}}> <strong> > Les Informations personnels </strong></h1>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-4"}>
                        <input type={"text"} className={"my_text_box_v2"} required={true} placeholder={" Votre Nom"} onChange={(e)=>{
                            this.setState({nom:e.target.value})}}/>
                    </div>
                    <div className={"col-xs-offset-1 col-xs-4"}>
                        <input type={"text"} className={"my_text_box_v2"} required={true} placeholder={" Votre Prenom"} onChange={(e)=>{
                            this.setState({prenom:e.target.value})}}/>

                    </div>
                </div>


                <div className={"col-xs-12"}>
                <div className={"col-xs-offset-1 col-xs-5"}>
                    <input type={"text"} className={"my_text_box_v2"} required={true} placeholder={" Votre Email"} onChange={(e)=>{
                        this.setState({email:e.target.value})}}/>
                </div>
            </div>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-5"}>
                        <input type={"number"} className={"my_text_box_v2"} required={true} placeholder={" numero Tel"} onChange={(e)=>{
                            this.setState({number:e.target.value})}}/>
                    </div>
                </div>

                <div className={"col-xs-12 interline"}></div>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-4"}>
                        <input type={"text"} required={true} className={"my_text_box_v2"} id={"adress"} placeholder={" adress"} onChange={(e)=>{
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
                        <select className={"my_text_box_v2"} id={"destination"} id={"commune"} placeholder={"fr"}>
                            <Communes selected={this.state.wilaya} />
                        </select>
                    </div>
                </div>


                <h1 className={"col-xs-12 interline"} style={{ textAlign:"left"}}> <strong> > Vos compétances </strong></h1>

                <div className={"col-xs-6"}>
                    <div className={"col-xs-offset-1 col-xs-9"}>
                        <div className="checkbox">
                            <label><input required={true} type="checkbox" id={"assemente"} value="" checked={this.state.assermente} onChange={()=>{
                                this.setState({assermente:!this.state.assermente})
                            }}/>traducteur assermente</label>
                        </div>
                    </div>
                </div>
                {this.state.assermente&&<div className={"col-xs-6"}>
                    <div className={"col-xs-offset-1 col-xs-9"}>
                        <input type={"button"}  className={"my_button_v16"}  value={(()=>{
                            if(this.state.serment_file===""){
                                return  " Inclure document" ;
                            }
                            else{
                                return this.state.serment_file;
                            }
                        })()}
                               onClick={()=>{
                                   document.querySelector("#file159").click() ;
                               }}    />
                        <input type={"file"}
                               onChange={(e)=>{
                                   this.setState({serment_file:e.target.files[0].name,file_ser:e.target.files[0]})
                               }} id={"file159"} className={"col-xs-12"}   accept={".pdf"} />
                    </div>
                </div>}
                <div className={"col-xs-12 interline"}></div>

                <div className={"col-xs-12"}>
                    <strong style={{marginRight:"40px"}}> Les langues : </strong>
                    <label className="checkbox-inline" style={{padding:"10px"}}><input type="checkbox" value="" id={"lan_fr"}/>Français</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"lan_eng"}/>Anglais</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"lan_ara"}/>Arabe</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"lan_esp"}/>Espagnole</label>

                </div>

                <div className={"col-xs-12 interline"}></div>

                <div className={"col-xs-12"}>
                    <strong style={{marginRight:"40px"}}> Type traduction : </strong>
                    <label className="checkbox-inline" style={{padding:"10px"}}><input type="checkbox" value="" id={"type_sci"}/>Scientifique</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"type_web"}/>Sites Web</label>
                    <label className="checkbox-inline" style={{padding:"10px"}} ><input type="checkbox" value="" id={"type_gen"}/>Generale</label>

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

                <div className={"col-xs-12 interline"}></div>

                    <div className={"col-xs-12"}>
                        <div className={"col-xs-offset-1 col-xs-4"}>
                            <input type={"password"} required={true} className={"my_text_box_v2"} placeholder={" password "} value={this.state.password} onChange={(e)=>{
                                this.setState({password:e.target.value})}}/>
                        </div>
                        <div className={"col-xs-offset-1 col-xs-4"}>
                            <input type={"password"} required={true} className={"my_text_box_v2"} value={this.state.password2} placeholder={" password "} onChange={(e)=>{
                                this.setState({password2:e.target.value})}}/>
                        </div>
                </div>

                <div className={"col-xs-12 interline"}></div>
                <div className={"col-xs-9 col-xs-offset-1"}>
                    <input type={"button"} className={"validate_button"} value={" soumettre ma candidature "} onClick={this.send_my_submission} />
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
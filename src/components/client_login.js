import React from 'react' ;
import Axios from 'axios';
import querystr from "querystring";
import  'bootstrap/dist/css/bootstrap.min.css';
import Communes from "../data_options/communes";
import Wilayas from "../data_options/wilayas";

class client_login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            displayed:true,
            login_error:false,
            wilaya:"",
            display_inscription:false ,
            invalid_inscription:false

        }
    }

    login_attempt = () =>{

        let form = new FormData();
        form.append("email",this.state.email);
        form.append("password", this.state.password);

        Axios.post('http://localhost/api/client_login', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res)=>{
            if(res.data.token!==null){
                console.log(res.data) ;
                localStorage.setItem("id_client",res.data.token.id_client);
                localStorage.setItem("mail_client",this.state.email) ;
                this.setState({displayed:true})

            }
            else{

                this.setState({login_error:true})
            }
        }).catch((err)=>{
            console.log(err);
            this.setState({login_error:true})
        }) ;


    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.count!==prevProps.count){
            if(localStorage.getItem("id_client")===null) {
                this.setState({displayed: true})
            }
        }
    }
    setWilyas = (val) =>{

        this.setState({wilaya:val})

    }

    render(){
        if(localStorage.getItem("id_client")!==null){
                return null ;
        }
        else{

        return   <React.Fragment>

            { this.state.displayed&&<div className={"col-xs-12 client_login"}>


                <div className={"col-xs-10 col-xs-offset-1 client_fields"}>
                    <div style={{position:"absolute",top:"0px",right:"0px",cursor: "pointer"}}
                    onClick={()=>{
                        this.setState({displayed:false}) ;
                    }}>
                        <span className={"glyphicon glyphicon-remove"}></span></div>

                    <h2 className={"col-xs-12"}> <strong>
                        Connectez-vous  à notre Application </strong>
                    </h2>

                    <h3 className={"col-xs-12"}>
                        Traduisez vos documents  maintenant
                    </h3>


                    {  <div className={"col-xs-6"} style={{fontSize:"80%"}} >

                    <div className={"interline col-xs-12"}> si vous possedez un Compte </div>
                    <div className={"col-xs-12"}>
                        <div className={"col-xs-8 col-xs-offset-2"}>

                       <input type={"text"} className={"my_text_box_v2"} placeholder={" Votre email"} onChange={(e)=>{
                           this.setState({email:e.target.value})}}/>
                        </div>

                    </div>
                    <div className={"interline col-xs-12"}></div>

                    <div className={"col-xs-12"} >

                        <div className={"col-xs-8 col-xs-offset-2"}>


                        <input type={"password"} placeholder={"votre mot de pass"} className={"my_text_box_v2"} onChange={(e)=>{
                            this.setState({password:e.target.value})}}/>

                        </div>
                    </div>
                    <div className={"interline col-xs-12"}></div>

                    <div className={"col-xs-12 "}>
                            <div  className={"interline"}>
                        <input type={"button"} className={"my_button_v16"} value={"     Connexion      "} onClick={this.login_attempt}/>

                            </div>



                    </div>
                    <div className={"interline col-xs-12"}></div>
                    {this.state.login_error&&<div className={"col-xs-12"} style={{"color":"#a12000"}}>
                            Votre Mot de pass est incorrect

                    </div>}
                    <div className={"interline col-xs-12"}></div>

                    </div>}

                    {
                        <div className={"col-xs-6"} style={{fontSize:"80%",borderLeft:"solid 1px #261326"}} >

                            <div className={"interline col-xs-12"}> Inscrivez vous Maintenant</div>

                            <div className={"col-xs-12"}>
                                <div className={"col-xs-8 col-xs-offset-2"}>
                                    <input type={"text"} id={"email"} autocomplete="off" className={"my_text_box_v2"} placeholder={"  email"} />
                                </div>
                            </div>




                            <div className={"col-xs-12"}>
                                <div className={"col-xs-6"}>
                                    <input type={"text"} className={"my_text_box_v2"} id={"prenom"}  placeholder={"  prenom"} />
                                </div>
                                <div className={"col-xs-6"}>
                                    <input type={"text"} className={"my_text_box_v2"} id={"nom"}  placeholder={"  nom "}/>
                                </div>
                            </div>


                            <div className={"col-xs-12"}>
                                <div className={"col-xs-8 col-xs-offset-2"}>
                                    <input type={"number"} className={"my_text_box_v2"} id={"tel"}  placeholder={"  telephone"} />
                                </div>
                            </div>





                            <div className={"col-xs-12"}>
                                <div className={"col-xs-8 col-xs-offset-2"}>
                                    <input type={"text"} className={"my_text_box_v2"} id={"adress"}  placeholder={"  adress"}/>
                                </div>
                            </div>

                            <div className={"col-xs-12"}>
                                <div className={"col-xs-6"}>
                                    <select className={"my_text_box_v2"} id={"destination"} placeholder={"fr"} onChange={(e)=>{
                                        this.setWilyas(e.target.value)
                                    }}>
                                        <Wilayas  />
                                    </select>

                                </div>
                                <div className={"col-xs-6"}>
                                    <select className={"my_text_box_v2"}  id={"commune"} placeholder={"fr"}>
                                        <Communes selected={this.state.wilaya} />
                                    </select>
                                </div>
                            </div>

                            <div className={"col-xs-12"} >
                                <div className={"col-xs-8 col-xs-offset-2"}>
                                    <input type={"password"} id={"password"}  placeholder={" mot de pass"} className={"my_text_box_v2"}/>
                                </div>
                            </div>


                            <div className={"col-xs-12 "}>
                                <div  className={"interline"}>
                                    <input type={"button"} className={"my_button_v16"} value={"     Inscription      "} onClick={()=>{

                                        let mail = document.querySelector("#email").value ;
                                        let adress = document.querySelector("#adress").value ;
                                        let tel = document.querySelector("#tel").value ;
                                        let password = document.querySelector("#password").value ;
                                        let commune = document.querySelector("#commune").value ;
                                        let prenom = document.querySelector("#prenom").value ;
                                        let nom = document.querySelector("#nom").value ;

                                        if((mail==="")||(password==="")||(nom==="")||(commune==="")){
                                            this.setState({invalid_inscription:true})
                                            return 0 ;
                                        }

                                        let form = new FormData()
                                        form.append("nom", nom);
                                        form.append("prenom", prenom);
                                        form.append("tel", tel);
                                        form.append("adress", adress);
                                        form.append("wilaya", this.state.wilaya);
                                        form.append("commune", commune);
                                        form.append("email", mail);
                                        form.append("password", password);

                                        Axios.post('http://localhost/api/sign_in_client',form,{
                                            headers: {
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        }).then((res)=>{
                                            if(res.data.token!==null){
                                                localStorage.setItem('id_client',res.data.token) ;
                                                localStorage.setItem("mail_client",mail) ;
                                            }

                                        }).catch((err)=>{
                                                console.log(err)
                                            this.setState({invalid_inscription:true})
                                        })

                                    }} />

                                    {this.state.invalid_inscription&&<div className={"col-xs-12"} style={{"color":"#a12000"}}>
                                        vos parametres sont pas valide ou vous avez un compte

                                    </div>}

                                </div>



                            </div>
                            <div className={"interline col-xs-12"}></div>
                            {this.state.login_error&&<div className={"col-xs-12"} style={{"color":"#a12000"}}>
                                Votre Mot de pass est incorrect

                            </div>}
                            <div className={"interline col-xs-12"}></div>

                        </div>



                    }







                </div>



            </div>} </React.Fragment>
    }



    }

}

export default client_login ;
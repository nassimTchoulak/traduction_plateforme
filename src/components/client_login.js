import React from 'react' ;
import Axios from 'axios';
import querystr from "querystring";
import  'bootstrap/dist/css/bootstrap.min.css';

class client_login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            displayed:true,
            login_error:false
        }
    }

    login_attempt = () =>{
        Axios.post('http://localhost/api/client_login', querystr.stringify({
            email:this.state.email,
            password:this.state.password

        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            if(res.data.token!==null){

                localStorage.setItem("id_client",res.data.token.id_client);
                this.setState({displayed:true})

            }
            else{
                this.setState({login_error:true})
            }
        }).catch((err)=>{
            console.log(err)
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

                    <div className={"interline col-xs-12"}> si vous possedez un Compte </div>
                    <div className={"col-xs-12"}>
                        <div className={"col-xs-4 col-xs-offset-4"}>

                       <input type={"text"} className={"my_text_box_v2"} placeholder={" Votre email"} onChange={(e)=>{
                           this.setState({email:e.target.value})}}/>
                        </div>

                    </div>
                    <div className={"interline col-xs-12"}></div>

                    <div className={"col-xs-12"} >

                        <div className={"col-xs-4 col-xs-offset-4"}>


                        <input type={"password"} placeholder={"votre mot de pass"} className={"my_text_box_v2"} onChange={(e)=>{
                            this.setState({password:e.target.value})}}/>

                        </div>
                    </div>
                    <div className={"interline col-xs-12"}></div>

                    <div className={"col-xs-12 "}>
                            <div >
                        <input type={"button"} className={"my_button_v16"} value={" Connexion "} onClick={this.login_attempt}/>
                            -ou-
                                <input type={"button"} className={"my_button_v16"} value={" Inscription "}
                                       onClick={()=>{
                                           window.location = "/inscription_client"
                                       }}/>
                            </div>



                    </div>
                    <div className={"interline col-xs-12"}></div>
                    {this.state.login_error&&<div className={"col-xs-12"} style={{"color":"#a12000"}}>
                            Votre Mot de pass est incorrect

                    </div>}
                    <div className={"interline col-xs-12"}></div>







                </div>



            </div>} </React.Fragment>
    }



    }

}

export default client_login ;
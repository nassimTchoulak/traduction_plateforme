import React from 'react' ;
import Axios from 'axios' ;


class TraducteurLogin extends React.Component{

    constructor(props){
        super(props) ;
        this.state = {
            email:"",
            password:""
        }
    }

    render(){
        if(localStorage.getItem('id_traducteur')!==null){
            window.location = '/traducteur/' ;
        }


        return <React.Fragment>

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
                    Trouvez les offres de traductions
                </h3>

                <div className={"interline col-xs-12"}> si votre compte est active </div>
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
                        <input type={"button"} className={"my_button_v16"} value={"    Connexion   Traducteur    "} onClick={()=>{
                            alert("hello")

                            let f = new FormData() ;
                            f.append("email",this.state.email);
                            f.append("password",this.state.password) ;

                            Axios.post("http://localhost/api/connect_traducteur",f,{
                                headers: {
                                    // 'Content-Type': 'application/x-www-form-urlencoded'
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then((res)=>{
                                    if(res.data.token!==null){
                                        console.log(res)
                                        localStorage.clear() ;
                                        localStorage.setItem("id_traducteur",res.data.token.id_traducteur) ;
                                        localStorage.setItem('email_traducteur',this.state.email) ;

                                            window.location = '/traducteur/login' ;

                                        //redirection

                                    }
                            }).catch((er0=>{
                                console.log(er0)
                            }))

                        }}/>

                    </div>



                </div>
               <div className={"interline col-xs-12"}></div>
            </div>
        </React.Fragment>
    }

}

export default TraducteurLogin ;
import React from "react";
import Axios from "axios";

class LoginAdmin extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            name:"",
            password:""
        }
        if(localStorage.getItem('admin')!==null){
            window.location.pathname = '/admin/traducteurs'
        }
    }


    render() {




        return <div className={"col-xs-10 col-xs-offset-1"}>

            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
               Connexion Administrateur </h1>
            <div className={"interline_more"}> Connectez vous pour acceder au volet d'administration de l'application </div>

            <div className={"col-xs-12 interline liner "} style={{paddingBottom:"100px"}}></div>

            <div className={"col-xs-12"} style={{paddingTop:"50px"}}>
                <div className={"col-xs-offset-3 col-xs-4"} align={"left"}>
                    Nom :
                <input type={"text"} className={"my_text_box_v2"} value={this.state.name} onChange={(e)=>{
                    this.setState({name:e.target.value})
                }} />
                </div>
            </div>


            <div className={"col-xs-12"} style={{paddingTop:"50px"}}>
                <div className={"col-xs-offset-3 col-xs-4"} align={"left"}>
                    Password :
                    <input type={"password"} className={"my_text_box_v2"} value={this.state.password} onChange={(e)=>{
                        this.setState({password:e.target.value})
                    }} />
                </div>
            </div>


            <div className={"col-xs-12"} style={{paddingTop:"50px"}}>
                <div className={"col-xs-offset-3 col-xs-4"} align={"left"}>

                    <input type={"button"}  className={"validate_button col-xs-12"} value={"  Connexion   "} onClick={()=>{
                        let form = new FormData();
                        form.append("name", this.state.name) ;
                        form.append("password", this.state.password);

                        Axios.post('http://localhost/api/login_admin',form,{
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((res)=>{
                                if((res.data.token!==null)&&(res.data.token!==undefined)) {
                                    localStorage.setItem('admin', res.data.token)

                                    window.location.pathname = '/admin/traducteurs'
                                }

                        }).catch((err)=>{
                            console.log(err)
                        })

                    }} />
                </div>
            </div>




        </div>
    }

}
export default LoginAdmin ;
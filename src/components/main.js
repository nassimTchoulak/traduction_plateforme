import React from'react' ;

import ArticlWrapper from "./articles_wrapper";
import Client_login from'./client_login'
import querystr from "querystring";
import Axios from 'axios' ;

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            login_in:false,
            count:0 ,  // useful to summon the login window each click,
            bad_request:false,
            name:"",
            file:null

        }
    }

    render(){

        return <React.Fragment >
            {this.state.login_in&&<Client_login count={this.state.count}/>}


         <div className={"col-xs-4 "}>
             <h2> <strong>Nos Articles</strong> </h2>
            <div>
                    <ArticlWrapper/>



            </div>
         </div>

            <div className={"col-xs-8 zero_pad"}>

                <div className={"col-xs-12 formulaire_aceuill"} onClick={()=>{
                    if(localStorage.getItem("id_client")===null) {
                        this.setState({count: this.state.count + 1,login_in:true})
                        console.log("count update")
                    }
                }}>
                    <h2 style={{"fontFamily":"Exo","fontWeight":"bolder"}}> Traduisez Votre document maintenant </h2>
                    <div className={"col-xs-12 interline "}></div>


                    <h1 className={"col-xs-12 interline"} style={{ textAlign:"left"}}> <strong> > Les Langues </strong></h1>

                    <div className={"col-xs-12"}>
                        <div className={"col-xs-offset-1 col-xs-4"}>
                            <select className={"my_text_box_v2"} id={"source"} placeholder={"fr"}>
                                <option value="" disabled selected>La langue destination</option>
                                <option value="français">Français</option>
                                <option value="arabe">Arabe</option>
                                <option value="englais">Englais</option>
                                <option value="espagnole">Espagnole</option>
                            </select>
                        </div>
                        <div className={"col-xs-offset-1 col-xs-4"}>
                            <select className={"my_text_box_v2"} id={"destination"} placeholder={"fr"}>
                                <option value="" disabled selected>La langue destination</option>
                                <option value="français">Français</option>
                                <option value="arabe">Arabe</option>
                                <option value="englais">Englais</option>
                                <option value="espagnole">Espagnole</option>
                            </select>
                        </div>
                    </div>
                    <h1 className={"col-xs-12 interline"} style={{ textAlign:"left"}}> <strong> > Les Exigences </strong></h1>
                    <div className={"col-xs-12"}>
                        <div className={"col-xs-offset-1 col-xs-6"}>
                            <select className={"my_text_box_v2"}  id={"type"}>
                                <option value="" disabled selected> type traduction </option>
                                <option value="generale">generale</option>
                                <option value="scientifique">scientifique</option>
                                <option value="sites web">sites web</option>

                            </select>
                        </div>
                    </div>

                    <div className={"col-xs-12"}>
                        <div className={"col-xs-offset-1 col-xs-9"}>
                            <textarea rows="6" id={"demandes"} cols="50" className={"my_text_box_v2"} placeholder={"demandes spécifiques"} />
                        </div>
                    </div>
                    <h1 className={"col-xs-12 interline"} style={{ textAlign:"left"}}> <strong> > Le traducteur </strong></h1>

                    <div className={"col-xs-12"}>
                        <div className={"col-xs-offset-1 col-xs-9"}>
                            <div className="checkbox">
                                <label><input type="checkbox" id={"assemente"} value=""/>traducteur assermente</label>
                            </div>
                        </div>
                    </div>

                    <h1 className={"col-xs-12 interline"} style={{ textAlign:"left"}}> <strong> > Le document à traduire</strong></h1>


                    <div className={"col-xs-12"}>
                        <div className={"col-xs-offset-1 col-xs-9"}>
                            <input type={"button"} className={"my_button_v16"} name={"firest"} value={(()=>{
                                if(this.state.name===""){
                                    return  " Inclure document" ;
                                }
                                else{
                                    return this.state.name;
                                }
                            })()}
                                onClick={()=>{
                                    document.querySelector("#file").click() ;
                                }}    />
                            <input type={"file"}
                                   onChange={(e)=>{
                                       this.setState({name:e.target.files[0].name,file:e.target.files[0]})
                                   }} id={"file"} className={"col-xs-12"} name={"firest"}   accept={".pdf"} />
                        </div>
                    </div>

                    <div className={"col-xs-12 interline "}></div>
                    <div className={"col-xs-12 interline "}></div>
                    <div className={"col-xs-9 col-xs-offset-1"} style={{textAlign:"center"}}>

                        <input type={"button"} className={"validate_button"} value={" Envoyer la demande de traduction "}
                               onClick={()=>{
                                   let src = document.querySelector("#source").value ;
                                   let dest = document.querySelector("#destination").value ;
                                   let type = document.querySelector("#type").value ;
                                   let assermente   = document.querySelector("#assemente").checked ;

                                   let file = this.state.file ;

                                    if((src!=="")&&(file!==null)&&(localStorage.getItem("id_client")!==null)){

                                        let params = {
                                            id_client:localStorage.getItem("id_client"),
                                            langue_source: src,
                                            langue_destination: dest,
                                            nom_docuement: this.state.name,
                                            demandes: document.querySelector("#demandes").value || " ",
                                            type_traduction: type,
                                            assermente:   (assermente)?"1":"0"   ,
                                            document: this.state.file


                                        }
                                        let form = new FormData();

                                        form.append("id_client", localStorage.getItem("id_client"));
                                        form.append("langue_source", src);
                                        form.append("langue_destination", dest);
                                        form.append("nom_docuement",  this.state.name);
                                        form.append("demandes", document.querySelector("#demandes").value || " ");
                                        form.append("type_traduction", type);
                                        form.append("assermente",  (assermente)?"1":"0" );
                                        form.append("document", this.state.file);

                                        console.log(params)
                                        Axios.post('http://localhost:80/api/submit_demande_traduction', form, {
                                            headers: {
                                               // 'Content-Type': 'application/x-www-form-urlencoded'
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        }).then((res)=>{

                                            if(res.data.status){
                                                window.location = "/done "
                                            }
                                        }).catch((err)=>{
                                                console.log(err) ;
                                        })

                                    }



                               }} />
                    </div>
                    {this.state.bad_request&&<div className={"col-xs-12"}> des paramètres sont invalides</div>}

                </div>
                <div className={"col-xs-12 interline "}></div>

            </div>




             </React.Fragment>
    }


}

export default Main ;
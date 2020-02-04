import React from 'react' ;
import Client_login from "./client_login";
import Axios from "axios";
import ImageHandler from "./ImageHandler";
import './profile.css'
import  'bootstrap/dist/css/bootstrap.min.css';
import Selection from "./clientPure/selectionDevis";
import NewDocument from "./clientPure/NewDocument";
import Paiement from './clientPure/Paiement' ;



const input = (props)=>{

}


class Profile_client extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            demandes:[] ,
            devis:[],
            traductions:[],
            me:{},
            display_demandes:true,
            show_documents:false ,
            show_paiment:false ,
            show_traducteurs:false,


            who:{},
            nb:0,
            ducument_count:0,
            paiement_counter:0,
            pay:{}

        }
        this.end =0 ;
    }

    synchall = () =>{
        Axios.get('http://localhost:80/api/get_demandes_client?id_client='+localStorage.getItem("id_client"))
            .then((res)=>{
                this.setState({demandes:res.data}) ;
               // console.log(res.data)
            }).catch((err)=>{
            console.log(err);
        }) ;
        Axios.get('http://localhost:80/api/get_traductions_client?id_client='+localStorage.getItem("id_client"))
            .then((res)=>{
                this.setState({traductions:res.data}) ;
              //  console.log(res.data)
            }).catch((err)=>{
            console.log(err);
        })
        Axios.get('http://localhost:80/api/get_devis_client?id_client='+localStorage.getItem("id_client"))
            .then((res)=>{
                this.setState({devis:res.data}) ;
            //    console.log(res)
            }).catch((err)=>{
            console.log(err);
        })
    }


    componentDidMount() {

        this.synchall() ;
        this.end = setInterval(this.synchall,1000) ;

        Axios.get('http://localhost/api/get_client_profile?email='+localStorage.getItem("mail_client")).then((res)=>{
                this.setState({me:res.data[0]})
        }).catch((er)=>{
            console.log(er) ;
        })
    }
    componentWillUnmount() {
        clearInterval(this.end) ;
    }

    render(){

        if(localStorage.getItem('id_client')===null){
            window.location.pathname = '/login'
        }

        return <div className={"col-xs-12 zero_pad"} style={{paddingTop:"50px"}}>


            {this.state.show_traducteurs&&<Selection nb={this.state.nb} who={this.state.who} />}
            {(this.state.ducument_count!==0)&&<NewDocument newer={this.state.ducument_count} />}
            {(this.state.paiement_counter!==0)&&<Paiement {...this.state.pay} count={this.state.paiement_counter} />}


            {/* eslint-disable-next-line react/jsx-pascal-case */}
                <Client_login />

            <div className={"col-xs-4"} style={{padding:"5%"}}>
                <h2>Mes Informations :</h2>
                <div>

                    <ImageHandler person={'clients'} token={localStorage.getItem('id_client')} email={localStorage.getItem("mail_client")} />

                </div>

                <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Nom : </div>
                    {this.state.me.nom}</div>


                <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Prenom : </div>
                    {this.state.me.prenom}</div>


                <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Email : </div>
                    {this.state.me.email}</div>


                <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Tel : </div>
                    {this.state.me.tel}</div>

                <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Wilaya : </div>
                    {this.state.me.wilaya}</div>
                <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Adress : </div>
                    {this.state.me.adress}</div>



            </div>

            <div className={"col-xs-8"} >


                <h2> Mes Traductions :</h2>



                    <div className={"col-xs-12 title_head"}> Mes demandes de Traductions </div>

                    <div className={"col-xs-12 interline"}></div>

                    <table className=" col-xs-12 zero_pad" style={{paddingTop:"10px"}}>
                        <tbody>
                        <tr className={" table_head"}>
                                <td>Date Demande </td>
                            <td>Document</td>
                            <td>langue source </td>
                            <td>Langue destination </td>
                            <td>Type traduction </td>
                            <td> Assermente</td>
                            <td> Status </td>
                        </tr>

                        {this.state.demandes.map( (i)=>{
                            return <tr className={"table_element"+((()=>{
                                if(i.accepte===1){
                                    return " accepted"
                                }
                            })())}  key={i.id_demande+"263"}>

                                <td>{ (new Date(i.date_demande)).toLocaleString('en-GB')}</td>
                                <td>{i.nom_document}</td>
                                <td>{i.langue_source} </td>
                                <td>{i.langue_destination} </td>
                                <td>{i.type_traduction} </td>
                                <td> {i.assermente}</td>

                                <td> {((()=>{
                                    if(i.accepte===1){
                                        return <input type={"button"} value={" Demander Devis "} className={"validate_button"} onClick={()=>{
                                        this.setState({who:{source:i.langue_source,destination:i.langue_destination,assermente:i.assermente,type:i.type_traduction,id_demande:i.id_demande}

                                                        ,show_traducteurs:true ,nb:this.state.nb+1   })}
                                        }/>
                                    }
                                    else{
                                       return  "En attente"
                                    }
                                })())} </td>
                            </tr>
                        })}

                        {(this.state.demandes.length===0)&&<td colspan="5" className={"col-xs-12"}> Nothing available </td>}
                        </tbody>
                    </table>

                <div className={"col-xs-12 "} style={{paddingTop:"20px",paddingBottom:"20px"}}>
                    <input type={"button"} value={" Nouveau Document à traduire "} className={"validate_button "} onClick={()=>{
                        this.setState({ducument_count:this.state.ducument_count+1})
                    }}/>
                </div>










                <div className={"col-xs-12 title_head"}> Mes Devis </div>

                <div className={"col-xs-12 interline"}></div>

                <table className=" col-xs-12 zero_pad" style={{paddingTop:"10px"}}>
                    <tbody>
                    <tr className={" table_head"}>
                        <td>Date Demande </td>
                        <td>Document</td>
                        <td>langue destination </td>
                        <td>Traducteur</td>
                        <td>Prix </td>
                        <td> Duree</td>
                        <td> Status </td>
                    </tr>

                    {this.state.devis.map( (i)=>{
                        return <tr className={"table_element"+((()=>{
                            if(i.duree!==null){
                                return " accepted"
                            }
                        })())}  key={i.id_demande+"uygyu"+i.traducteur}>

                            <td>{ (new Date(i.date_demande)).toLocaleString('en-GB')}</td>
                            <td>{i.nom_document}</td>
                            <td>{i.langue_destination} </td>
                            <td> {i.traducteur} </td>
                            <td>{i.prix} DA </td>
                            <td> {i.duree}</td>

                            <td> {((()=>{
                                if(i.duree!==null) {

                                    if (i.payed === 1) {
                                        return <div style={{display:'contents',color:'#261326'}}>Paiment effectué</div>

                                    } else {
                                        return <input type={"button"} value={" Valider & Payer"} onClick={() => {

                                            this.setState({
                                                pay: {
                                                    document: i.nom_document,
                                                    prix: i.prix,
                                                    traducteur: i.traducteur,
                                                    id_demande: i.id_demande
                                                }
                                            })
                                            this.setState({paiement_counter: this.state.paiement_counter + 1})

                                        }
                                        } className={"validate_button"}/>
                                    }
                                }
                                else{
                                    return  "En attente"
                                }
                            })())} </td>
                        </tr>
                    })}
                    {(this.state.devis.length===0)&&<td colspan="5" className={"col-xs-12"}> Nothing available </td>}
                    </tbody>
                </table>






                <div className={"col-xs-12 title_head"}> Mes Traductions </div>

                <div className={"col-xs-12 interline"}></div>

                <table className=" col-xs-12 zero_pad" style={{paddingTop:"10px"}}>
                    <tbody>
                    <tr className={" table_head"}>
                        <td>Date debut </td>
                        <td>Document</td>
                        <td>langue destination </td>
                        <td>Traducteur</td>
                        <td> date Fin </td>
                        <td> Note </td>
                        <td> Action </td>
                    </tr>

                    {this.state.traductions.map( (i)=>{
                        return <tr className={"table_element"+((()=>{
                            if(i.date_fin!==null){
                                return " accepted"
                            }
                        })())}  key={i.id_demande+"artyhbuj"+i.traducteur}>

                            <td>{ (new Date(i.date_debut)).toLocaleString('en-GB')}</td>
                            <td>

                                {(i.date_fin!==null)&&<a href={'http://localhost/files/translated_pdf/'+i.id_demande+".pdf"} download={true} > {i.nom_document} </a>}
                                {(i.date_fin===null)&&<React.Fragment> {i.nom_document}</React.Fragment>}

                            </td>
                            <td>{i.langue_destination} </td>
                            <td> {i.traducteur} </td>
                            <td>{i.date_fin} </td>

                            <td>

                                {(()=>{
                                    if((i.date_fin!==null)&&(i.note===null)){
                                        return <input type={"text"} min={1} max={5} id={"noting_"+i.id_demande} maxlength="1" className={"my_text_box_v2"}/>
                                    }
                                    else{
                                        return i.note ;
                                    }
                                })()}
                            </td>

                            <td> {((()=>{
                                if(i.date_fin===null){
                                    return "Traduction en court "
                                }
                                else{
                                    if(i.note===null){
                                        return <input type={"button"} value={" Noter "} className={"validate_button"} onClick={()=>{
                                        let val = document.querySelector("#noting_"+i.id_demande).value ;
                                        if(Number(val)!==NaN){
                                            let v = Number(val) ;
                                            if(6>v){

                                                let data = new FormData();
                                                data.append("id_devis", i.id_demande);
                                                data.append("mail_traducteur", i.traducteur);
                                                data.append("note", val);

                                                Axios.post('http://localhost/api/noter_traduction',data,{
                                                    headers: {
                                                        // 'Content-Type': 'application/x-www-form-urlencoded'
                                                        'Content-Type': 'multipart/form-data'
                                                    }
                                                }).then((res)=>{
                                                    if(res.data.status){

                                                    }

                                                }).catch((er)=>{
                                                    console.log(er) ;
                                                })


                                            }

                                        }}


                                        }/>
                                    }
                                    else{
                                       return  " traduction terminé"
                                    }
                                }
                            })())} </td>
                        </tr>
                    })}
                    {(this.state.traductions.length===0)&&<td colSpan="5" className={"col-xs-12"}> Nothing available </td>}
                    </tbody>
                </table>


                <div className={"col-xs-12 interline "}></div>


            </div>







        </div>
    }



}
export default Profile_client ;
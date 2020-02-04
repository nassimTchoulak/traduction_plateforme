import React from "react";
import Axios from "axios";
import {getConfirmation} from "history/DOMUtils";

class AdminClientPlus extends React.Component{

    constructor(props){
        super(props);
        this.mail = window.location.pathname.split('/').pop() ;

        this.state = {
            signals: [],
            traductions: [],
            devis: [],
            bloque: 0 ,
            display_signal:true,
            display_traductions:true,
            display_devis:true

        }
    }

    componentDidMount() {
        Axios.get('http://localhost/api/admin_client?email='+this.mail).then((res)=>{

            this.setState({devis:res.data.devis,traductions:res.data.traductions,signals:res.data.signals,bloque:res.data.bloque})

            console.log(res.data)

        }).catch((err)=>{
            console.log(err)
        })
    }


    render() {
        return <div className={"col-xs-12"}>

            <h2 style={{fontWeight:"bolder",paddingBottom:"10px"}}>Informations d'Administration  </h2>


            <div className={"col-xs-12"}>

                <div className={"col-xs-12 title_head"} style={{paddingBottom:"10px"}} onClick={()=>{
                    this.setState({display_signal:!this.state.display_signal})
                }}> Les signals </div>


                {this.state.display_signal&&<div className={"col-xs-12"} align={"left"}>

                    <table className=" col-xs-12 zero_pad" style={{marginTop: "20px"}}>
                        <tr className={" table_head"}>
                            <td  >Emetteur</td>
                            <td >date </td>
                            <td >Justification </td>


                        </tr>
                        {this.state.signals.map((i,itr) => {

                            return <tr className={"table_element"} key={itr}>
                                <td><a href={"/admin/presentation/client/" + i.email}> {i.email} </a></td>
                                <td> {i.date_time}</td>
                                <td> {i.cause}   </td>
                            </tr>

                        })}
                        {(this.state.signals.length === 0) &&
                        <td colSpan="3" className={"col-xs-12"}> Nothing available </td>}
                    </table>
                </div>}




                <div className={"col-xs-12 title_head"} style={{paddingBottom:"10px"}} onClick={()=>{
                    this.setState({display_devis:!this.state.display_devis})
                }}> Les Devis envoyés </div>


                {this.state.display_devis&&<div className={"col-xs-12"} align={"left"}>

                    <table className=" col-xs-12 zero_pad" style={{marginTop: "20px"}}>
                        <tr className={" table_head"}>
                            <td  >date_demande</td>
                            <td > nom document  </td>
                            <td  >langue destination</td>
                            <td >traducteur </td>
                            <td >consulté </td>
                            <td >prix </td>


                        </tr>
                        {this.state.devis.map((i,itr) => {

                            return <tr className={"table_element"} key={itr}>
                                <td> {(new Date(i.date_demande)).toLocaleString('en-GB')}</td>
                                <td> <a href={"http://localhost/files/raw_pdf/"+i.id_demande+".pdf"} download={true} target="_blank">  {i.nom_document} </a></td>
                                <td> {i.langue_destination}   </td>

                                <td><a href={"/admin/presentation/traducteur/" + i.traducteur}> {i.traducteur} </a></td>

                                <td> {i.consulte}   </td>
                                <td> {i.prix}   </td>
                            </tr>

                        })}
                        {(this.state.devis.length === 0) &&
                        <td colSpan="7" className={"col-xs-12"}> Nothing available </td>}
                    </table>
                </div>}







                <div className={"col-xs-12 title_head"} style={{paddingBottom:"10px"}} onClick={()=>{
                    this.setState({display_traductions:!this.state.display_traductions})
                }}> Les Traductions effectuées </div>


                {this.state.display_traductions&&<div className={"col-xs-12"} align={"left"}>

                    <table className=" col-xs-12 zero_pad" style={{marginTop: "20px"}}>
                        <tr className={" table_head"}>
                            <td  >date_demande</td>
                            <td > nom document  </td>
                            <td  >langue destination</td>

                            <td >traducteur </td>
                            <td >livrable reçu</td>
                            <td >date remise </td>
                            <td >note donnée</td>


                        </tr>
                        {this.state.traductions.map((i,itr) => {

                            return <tr className={"table_element"} key={itr}>
                                <td> {(new Date(i.date_debut)).toLocaleString('en-GB')}</td>
                                <td> <a href={"http://localhost/files/raw_pdf/"+i.id_demande+".pdf"} download={true} target="_blank">  {i.nom_document} </a></td>
                                <td> {i.langue_destination}   </td>


                                <td><a href={"/admin/presentation/client/" + i.traducteur}> {i.traducteur} </a></td>

                                <td> <a href={"http://localhost/files/translated_pdf/"+i.id_demande+".pdf"} download={true} target="_blank">  {i.nom_document} </a></td>

                                <td> {(i.date_fin!==null)?i.date_fin:"non remis"}   </td>
                                <td> {(i.note!==null)?i.note:"non noté"}   </td>
                            </tr>

                        })}
                        {(this.state.traductions.length === 0) &&
                        <td colSpan="7" className={"col-xs-12"}> Nothing available </td>}
                    </table>
                </div>}
        </div>




            <div className={"col-xs-12"}>
                <h2> cet utilisateur est: {(this.state.bloque===1)?"bloqué":" active "}</h2>
                <h4><input type={"button"}
                           style={{backgroundColor:"white",color:"#22313f",fontSize:"115%",borderRadius:"5px 5px",padding:"5px",outline:"none",border:"solid 1px #22313f"}}
                           value={(this.state.bloque===1)?"activer ":" bloquer "} onClick={()=>{
                    getConfirmation(" etes vous sur de voulie modifier le status de l'utilisateur",(e)=>{
                        if(e){
                            alert("utilisateur "+(this.state.bloque===1)?"activé ":" bloqué ") ;

                            if(this.state.bloque===1){
                                let form = new FormData();
                                form.append("token", localStorage.getItem('admin'));
                                form.append("email", this.mail);
                                form.append("type", "client");
                                Axios.post('http://localhost/api/activate_account',form,{
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                }).then((res)=>{
                                    console.log(res.data);
                                    if(res.data.status){
                                        window.location.reload() ;
                                    }
                                }).catch((err)=>console.log(err))

                            }
                            else{

                                let form = new FormData();
                                form.append("token", localStorage.getItem('admin'));
                                form.append("email", this.mail);
                                form.append("type", "client");
                                Axios.post('http://localhost/api/disable_account',form,{
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                }).then((res)=>{
                                    console.log(res.data);
                                    if(res.data.status){
                                        window.location.reload() ;
                                    }
                                }).catch((err)=>console.log(err))

                            }
                        }
                    })

                }
                } /></h4>
            </div>



        </div>
    }
}

export default AdminClientPlus ;
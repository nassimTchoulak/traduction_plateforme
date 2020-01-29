import React from "react";
import Axios from "axios";
import ImageHandler from "./ImageHandler";
import './profile.css'
import  'bootstrap/dist/css/bootstrap.min.css';
import EndTraduction from "./Endtraduction";

class MainTraducteur extends React.Component {
    constructor(props){
        super(props) ;

        this.state = {
            devis:[],
            traductions:[],
            me:{}
        }

        this.end = 0 ;
    }

    componentDidMount() {
        this.synchalldata() ;
        this.end = setInterval(this.synchalldata,2000)

        Axios.get('http://localhost/api/get_profile_traducteur?mail='+localStorage.getItem('email_traducteur')).then((res)=>{
            this.setState({me:res.data[0]})
        }).catch((err)=>{
            console.log(err)
        })

    }


    componentWillUnmount() {
        clearInterval(this.end)
    }


    synchalldata =  () =>{
        Axios.get('http://localhost/api/get_devis_traducteur?id_traducteur='+localStorage.getItem('id_traducteur')).then((res)=>{
            this.setState({devis:res.data})
        }).catch((err)=>{
            console.log(err)
        })

        Axios.get('http://localhost/api/get_traduction_traducteur?id_traducteur='+localStorage.getItem('id_traducteur')).then((res)=>{
            this.setState({traductions:res.data})
        }).catch((err)=>{
            console.log(err)
        })


    }


    render() {

        if(localStorage.getItem('id_traducteur')===null){
            window.location = '/traducteur/login' ;
        }

        return <div className={"col-xs-12"} >


            <div className={"col-xs-3"} style={{padding:"5%"}}>
                <h2>Mes Informations :</h2>
                <div>

                    <ImageHandler person={'traducteurs'} token={localStorage.getItem('id_traducteur')} email={localStorage.getItem("email_traducteur")} />

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

                <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Langues : </div>
                    {(this.state.me.langues!==undefined)?this.state.me.langues.split('|').join(' '):" "}</div>

                <div className={"col-xs-12 "} style={{fontSize:"120%",paddingBottom:"10px"}} align={"left"}> <div style={{fontWeight:"bold",display:"contents"}}>Type traductions : </div>
                    {(this.state.me.type_traduction!==undefined)?this.state.me.type_traduction.split('|').join(' '):" "}</div>



            </div>

            <div className={"col-xs-9"} style={{marginTop:"20px"}} >


                <h2> Mes Traductions :</h2>


                <div className={"col-xs-12 title_head"}> Mes demandes de devis</div>

                <div className={"col-xs-12 interline"}></div>

                <table className=" col-xs-12 zero_pad" style={{paddingTop: "10px"}}>
                    <tr className={" table_head"}>
                        <td>Date Demande</td>
                        <td>Document</td>
                        <td>langue source</td>
                        <td>Langue destination</td>
                        <td>Type traduction</td>
                        <td> Client </td>
                        <td> devis Prix </td>
                        <td> Action </td>
                    </tr>

                    {this.state.devis.map((i) => {
                        return <tr className={"table_element" + ((() => {
                            if (i.consulte === 1) {
                                return " accepted"
                            }
                        })())} key={i.id_demande+i.email}>

                            <td>{(new Date(i.date_demande)).toLocaleString('en-GB')}</td>
                            <td> <a href={'http://localhost/files/raw_pdf/'+i.id_devis+".pdf"} download={true} > {i.nom_document} </a> </td>
                            <td>{i.langue_source} </td>
                            <td>{i.langue_destination} </td>
                            <td>{i.type_traduction} </td>
                            <td> <a href={"/presentation/client/"+i.email}> {i.email} </a> </td>

                            <td>{(()=>{

                                if((i.consulte===0)){
                                return <input type={"number"} id={"price"+i.id_devis.toString()} placeholder={"prix DA"} className={"my_text_box_v2"}/>
                            }
                                else{
                                if (i.prix===null){
                                return "refused" ;
                            }
                                return i.prix ;}})()

                            }

                            </td>


                            <td> {((() => {
                                if (i.consulte === 0) {
                                    return <input type={"button"} value={"répondre"}
                                                  className={"validate_button"} onClick={() => {

                                        let data = new FormData();
                                        data.append("id_demande", i.id_devis);
                                        data.append("id_traducteur", localStorage.getItem('id_traducteur'));
                                        data.append("prix", document.querySelector("#price"+i.id_devis.toString()).value || "0");
                                        data.append("duree", "15");


                                        Axios.post('http://localhost/api/repondre_devis',data,{
                                            headers: {
                                                // 'Content-Type': 'application/x-www-form-urlencoded'
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        }).then((res)=>{
                                            if(res.data.status){
                                                this.synchalldata() ;
                                            }
                                        }).catch((err)=>{
                                            console.log(err)
                                        })
                                    }
                                    }/>
                                } else {
                                    return " devis livré "
                                }
                            })())} </td>
                        </tr>
                    })}

                    {(this.state.devis.length === 0) &&
                    <td colSpan="5" className={"col-xs-12"}> Nothing available </td>}
                </table>











                <div className={"col-xs-12 title_head"}> Mes Traductions acceptés</div>

                <div className={"col-xs-12 interline"}></div>

                <table className=" col-xs-12 zero_pad" style={{paddingTop: "10px"}}>
                    <tr className={" table_head"}>
                        <td>Date Demande</td>
                        <td>nom document</td>
                        <td>langue source</td>
                        <td>Langue destination</td>
                        <td>Type traduction</td>
                        <td> Client </td>
                        <td> Action </td>

                        <td> note </td>

                    </tr>

                    {this.state.traductions.map((i) => {
                        return <EndTraduction key={i.id_demande+i.email} {...i} />
                    })}

                    {(this.state.devis.length === 0) &&
                    <td colSpan="5" className={"col-xs-12"}> Nothing available </td>}
                </table>




            </div>
        </div>
    }
}
export default MainTraducteur ;
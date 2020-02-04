import React from "react";
import Axios from "axios";
import {getConfirmation} from "history/DOMUtils";

class DocumentAdmin extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            docs:[],
            sort:{
                "nom_document":true,
                "date_demande":true,


            },
            nom:/./,
            traducteur:/./,
            client:/./,
        }
    }

    synchAll = () =>{
        Axios.get('http://localhost/api/all_docs_info').then((res)=>{

            let tmp = res.data ;
            let last = 0 ;
            let next = [] ;
            let more = null;

            tmp.forEach((i)=>{
                console.log("**"+i.id_demande)
                if(last!==i.id_demande){
                    next.push(i);
                    last =  i.id_demande ;
                    more = i.id_traducteur ;
                    console.log(i.id_demande,i.id_traducteur)
                }
                else{
                    if((more===null)&&(i.id_traducteur!==null)){
                        more = i.id_traducteur ;
                        next.pop() ;
                        next.push(i)

                }


            }})


            this.setState({docs:next})
        }).catch((err)=>{
            console.log(err)
        })

    }

    componentDidMount() {
        this.synchAll()
    }

    onSort(event, sortKey){
        /*
        assuming your data is something like
        [
          {accountname:'foo', negotiatedcontractvalue:'bar'},
          {accountname:'monkey', negotiatedcontractvalue:'spank'},
          {accountname:'chicken', negotiatedcontractvalue:'dance'},
        ]
        */
        let docs = [...this.state.docs];

        docs.sort((a,b) => a[sortKey].localeCompare(b[sortKey])   ) ;


        if(JSON.stringify(docs)===JSON.stringify(this.state.docs)){
            docs = docs.reverse() ;
        }

        this.setState({docs}) ;
    }


    render() {
        return <div className={"col-xs-12"}>
            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
                La gestion des documents </h1>
            <div className={"interline_more"}> gérez tout les documents du de l'application depuis cet onglets </div>

            <div className={"col-xs-12 interline liner "}></div>

            <div className={"col-xs-12"} align={"left"}>
                Les filtres :
                <div className={"col-xs-12"}>

                    <div className={"col-xs-3"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={"nom"} onChange={(e)=>{
                            this.setState({nom:new RegExp(e.target.value)})
                        }} />
                    </div>

                    <div className={"col-xs-3 "}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={"client"} onChange={(e)=>{
                            this.setState({client:new RegExp(e.target.value)})
                        }} />
                    </div>
                    <div className={"col-xs-3"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={"traducteur"} onChange={(e)=>{
                            this.setState({traducteur:new RegExp(e.target.value)})
                        }} />
                    </div>

                </div>

            </div>

            <div className={"col-xs-12"}>

                <div className={"col-xs-12"} align={"left"}> Les documents :</div>
                <div className={"col-xs-12 interline"}></div>


                <table className=" col-xs-12 zero_pad" style={{paddingTop: "10px"}}>
                    <tr className={" table_head"}>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'nom_document')}>Nom document</td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'date_demande')} >date Demande</td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'type_traduction')} >type traduction</td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'email_client')} >client</td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'email')} >traducteur </td>
                        <td> devis/traduction  </td>
                        <td> supprimer  </td>

                    </tr>

                    {this.state.docs.map((i,itr) => {

                        if(this.state.nom.test(i.nom_document)&&this.state.client.test(i.email_client)&&this.state.traducteur.test(i.email)){
                        return <tr className={"table_element"} key={itr}>

                            <td> <a href={"http://localhost/files/raw_pdf/"+i.id_demande+".pdf"} download={true} target="_blank">  {i.nom_document} </a> </td>
                            <td>{(new Date(i.date_demande)).toLocaleString('en-GB')}</td>

                            <td>{i.type_traduction} </td>
                            <td> <a href={"/presentation/client/"+i.email_client}> {i.email_client} </a> </td>
                            <td>  <a href={"/presentation/traducteur/"+i.email}> {i.email} </a>  </td>

                            <td> {(()=>{
                                if(i.date_debut!==null){
                                    return "traduction"
                                }
                                else {return "devis seulement"}
                            })()} </td>

                            <td>

                                 <input type={"button"}  value={" delete  "} className={"validate_button"} onClick={()=>{
                                     getConfirmation(" vous etes sur de vouloir supprimer ce documents définitivement "+i.nom_document+" id:"+i.id_demande,(e)=>{ if(e){


                                         let form = new FormData();
                                         form.append("token", localStorage.getItem('admin'));
                                         form.append("id_demande", i.id_demande);
                                         Axios.post('http://localhost/api/delete_doc',form,{
                                             headers: {
                                                 // 'Content-Type': 'application/x-www-form-urlencoded'
                                                 'Content-Type': 'multipart/form-data'
                                             }
                                         }).then((res)=>{
                                             if(res.data.status){
                                                 alert("document supprimé ");
                                                 this.synchAll() ;
                                             }
                                         }).catch((err)=>{
                                             console.log(err)
                                         })


                                     }})

                                 }}/>


                            </td>



                        </tr> }
                    })}

                    {(this.state.docs.length === 0) &&
                    <td colSpan="5" className={"col-xs-12"}> Nothing available </td>}
                </table>


            </div>



        </div>
    }

}
export default DocumentAdmin ;
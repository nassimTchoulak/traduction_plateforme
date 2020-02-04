import React from "react";
import Axios from "axios";

class PaimentAdmin extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            paiements:[]
        }
        this.end = 0 ;
    }

    componentDidMount() {
       this.synchalldata() ;
       this.end = setInterval(()=>{
           this.synchalldata()
       },1000)
    }
    componentWillUnmount() {
        clearInterval(this.end)
    }

    synchalldata = ()=>{
        Axios.get('http://localhost/api/get_paiements?token='+localStorage.getItem('admin')).then((res)=>{

            let v1 = [...this.state.paiements] ;
            v1.sort((a,b) => a["date_time"].localeCompare(b["date_time"])   ) ;

            let v2 = [...res.data] ;
            v2.sort((a,b) => a["date_time"].localeCompare(b["date_time"])   ) ;

            if(JSON.stringify(v1)!==JSON.stringify(v2)){
                this.setState({paiements:res.data});
                console.log(res.data)

            }


        }).catch((r)=>{
            console.log(r)
        })
    };


    onSort(event, sortKey){

        let paiements = [...this.state.paiements];
        paiements.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey].toString())    ) ;
        if(JSON.stringify(paiements)===JSON.stringify(this.state.paiements)){
            paiements = paiements.reverse() ;
        }

        this.setState({paiements}) ;
    }


    render() {
        return <div className={"col-xs-12"}>
            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
                La gestion des paiements </h1>
            <div className={"interline_more"}> validez les transactions et paiement entre les traducteurs et les clients </div>

            <div className={"col-xs-12 interline liner "}></div>

            <div className={"col-xs-12 interline"}></div>
            <div className={"col-xs-12 "} align={"left"}>
                Les paiements :
            </div>
            <div className={"col-xs-12 interline"}></div>

            <div className={"col-xs-12"}>

                <table className=" col-xs-12 zero_pad" style={{paddingTop: "10px"}}>
                    <tr className={" table_head"}>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'date_time')}>Date Demande</td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'id_client')}>id_client</td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'id_traducteur')}>id_traducteur</td>
                        <td>id_devis</td>
                        <td>montant</td>
                        <td> preuve </td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'valide')}> etat </td>
                    </tr>

                    {this.state.paiements.map((i) => {
                        return <tr className={"table_element" + ((() => {
                            if (i.valide === 1) {
                                return " accepted"
                            }
                        })())} key={i.id_paiement}>

                            <td>{(new Date(i.date_time)).toLocaleString('en-GB')}</td>

                            <td>{i.id_client} </td>
                            <td>{i.id_traducteur} </td>
                            <td>{i.id_devis} </td>
                            <td>{i.montant} </td>
                            <td> <a href={"http://localhost/files/paiement/"+i.id_paiment+".jpg"}> paiement </a> </td>




                            <td> {((() => {
                                if (i.valide === 0) {
                                    return <input type={"button"} value={" valider "}
                                                  className={"validate_button"} onClick={() => {


                                        let form = new FormData();
                                        form.append("token", localStorage.getItem('admin'));
                                        form.append("id_paiment", i.id_paiment);


                                        Axios.post('http://localhost/api/accept_paiement',form,{
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
                                    return " Paiement validé "
                                }
                            })())} </td>
                        </tr>
                    })}

                    {(this.state.paiements.length === 0) &&
                    <td colSpan="6" className={"col-xs-12"}> Nothing available </td>}
                </table>



            </div>


        </div>
    }

}

export default PaimentAdmin ;
import React from "react";
import Axios from "axios";

class AllClients extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clients : [],
            email:/./,
            wilaya:/./,
            nom:/./,
        }
    }


    componentDidMount() {
        Axios.get('http://localhost/api/admin_all_clients').then((res)=>{

            this.setState({clients:res.data})

        }).catch((err)=>console.log(err))
    }

    onSort(event, sortKey){

        let clients = [...this.state.clients];
        clients.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey].toString())   ) ;
        if(JSON.stringify(clients)===JSON.stringify(this.state.clients)){
            clients = clients.reverse() ;
        }
        this.setState({clients}) ;
    }


    render(){
        return <div className={"col-xs-12"}>
            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
                La gestion des clients </h1>
            <div className={"interline_more"}>  trouvez tout les clients sur la plateforme pour pouvoir gérer </div>

            <div className={"col-xs-12 interline liner "}></div>

            <div className={"col-xs-12 interline"}></div>
            <div className={"col-xs-12"} align={"left"}>
                Les filtres :
                <div className={"col-xs-12"}>

                    <div className={"col-xs-3"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={"nom"} onChange={(e)=>{
                            this.setState({nom:new RegExp(e.target.value)})
                        }} />
                    </div>

                    <div className={"col-xs-3 "}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={"email"} onChange={(e)=>{
                            this.setState({email:new RegExp(e.target.value)})
                        }} />
                    </div>
                    <div className={"col-xs-3"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={"wilaya"} onChange={(e)=>{
                            this.setState({wilaya:new RegExp(e.target.value)})
                        }} />
                    </div>

                </div>
            </div>

            <div className={"col-xs-12 interline"}></div>
            <h4 align={"left"} >Les Clients </h4>
            <div className={"col-xs-12 interline"}> click sur 1 client pour plus de details</div>
            <div className={"col-xs-12 interline"}></div>
            <div className={"col-xs-12"}>


                <table className=" col-xs-12 zero_pad" style={{paddingTop: "10px"}}>
                    <tr className={" table_head"}>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'email')} >email</td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'nom')}>nom</td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'prenom')}>prenom</td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'wilaya')}> wilaya </td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'commune')}> commune </td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'tel')}> tel </td>
                        <td className={"sortable"} onClick={e => this.onSort(e, 'bloque')}> bloqué </td>
                    </tr>

                    {this.state.clients.map((i) => {

                        if(this.state.nom.test(i.nom)&&this.state.email.test(i.email)&&this.state.wilaya.test(i.wilaya)) {


                            return <tr className={"table_elementN"} key={i.email}
                            >

                                <td><a href={"/admin/presentation/clients/" + i.email}> {i.email} </a></td>
                                <td> {i.nom} </td>
                                <td>{i.prenom} </td>

                                <td> {i.wilaya}</td>
                                <td> {i.commune}</td>
                                <td> {i.tel}</td>
                                <td> {i.bloque}</td>
                            </tr>
                        }
                    })}

                    {(this.state.clients.length === 0) &&
                    <td colSpan="5" className={"col-xs-12"}> Nothing available </td>}
                </table>


            </div>






        </div>
    }

}


export default AllClients ;
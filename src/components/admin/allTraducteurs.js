import React from "react";
import Axios from "axios";
import Table from "./Table";

class Alltraducteurs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            traducteurs:[],
            nom:/./,
            type:/./,
            langues:/./,
            selected:false,
            detail:{}

        };

        if(localStorage.getItem('admin')==null){
            window.location.pathname = '/admin/login'
        }

    }
    componentDidMount() {
        Axios.get('http://localhost/api/all_traducteurs').then((res)=>{


            let temp = [];
            res.data.forEach((i)=>{
                if(i.moyenne===null){
                    i.moyenne = 2.5;
                    temp.push(i)
                }else{
                    temp.push(i)
                }
            });


            this.setState({traducteurs:temp})
        }).catch((err)=>{
            console.log(err) ;
        })
    }

    onSort(event, sortKey){

        let traducteurs = [...this.state.traducteurs];
        traducteurs.sort((a,b) => a[sortKey].toString().localeCompare(b[sortKey].toString())   ) ;
        if(JSON.stringify(traducteurs)===JSON.stringify(this.state.traducteurs)){
            traducteurs = traducteurs.reverse() ;
        }
        this.setState({traducteurs}) ;
    }

    detail_traducteur(email){
       Axios.get('http://localhost/api/admin_traducteur?email='+email).then((res)=>{



           this.setState({detail:res.data,selected:true})
       }).catch((err)=>{
           console.log(err)
       })
    }

    render() {
        return <div className={"col-xs-12"}>  <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
           La gestion des traducteurs </h1>
            <div className={"interline_more"}> trouvez tout les traducteurs sur la plateforme pour pouvoir gérer </div>

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
                        <input type={"text"} className={"my_text_box_v2"} placeholder={"type_traduction"} onChange={(e)=>{
                            this.setState({type:new RegExp(e.target.value)})
                        }} />
                    </div>
                    <div className={"col-xs-3"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={"langues"} onChange={(e)=>{
                            this.setState({langues:new RegExp(e.target.value)})
                        }} />
                    </div>

                </div>

            </div>
            <div className={"col-xs-12 interline"}></div>
            <h4 align={"left"} >Les traducteurs </h4>
            <div className={"col-xs-12 interline"}> click sur 1 traducteur pour plus de details</div>
            <div className={"col-xs-12 interline"}></div>

        <div className={"col-xs-12"}>


            <table className=" col-xs-12 zero_pad" style={{paddingTop: "10px"}}>
                <tr className={" table_head"}>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'email')} >email</td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'nom')}>nom</td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'prenom')}>prenom</td>

                    <td className={"sortable"} onClick={e => this.onSort(e, 'type_traduction')}> type traduction </td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'langues')}> langues </td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'nb_traduction')}> nb traduction  </td>
                    <td className={"sortable"} onClick={e => this.onSort(e, 'moyenne')}> moyenne </td>
                </tr>

                {this.state.traducteurs.map((i) => {

                    if(this.state.nom.test(i.nom)&&this.state.type.test(i.type_traduction)&&this.state.langues.test(i.langues)) {


                        return <tr className={"table_elementN"} key={i.email}
                               /* onClick={()=>{this.detail_traducteur(i.email) ;
                                    window.location.href = "#";
                                    window.location.href = "#sk"; }}*/

                        >

                            <td><a href={"/admin/presentation/traducteur/" + i.email}> {i.email} </a></td>
                            <td> {i.nom} </td>
                            <td>{i.prenom} </td>
                            <td>{i.type_traduction.replace(/\|/g, ' ')} </td>
                            <td>{i.langues.replace(/\|/g, ' ')} </td>
                            <td> {i.nb_traduction}</td>
                            <td> {i.moyenne}

                            </td>
                        </tr>
                    }
                })}

                {(this.state.traducteurs.length === 0) &&
                <td colSpan="5" className={"col-xs-12"}> Nothing available </td>}
            </table>


        </div>







        </div>
    }


}
export default Alltraducteurs ;
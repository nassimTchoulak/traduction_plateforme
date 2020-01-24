import React from 'react' ;
import Client_login from "./client_login";
import Axios from "axios";


class Profile_client extends React.Component{
    constructor(props){
        super(props);

        this.state= {
            demandes:[] ,
            devis:[],
            traductions:[]
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:80/api/get_demandes_client?id_client='+localStorage.getItem("id_client"))
            .then((res)=>{
                this.setState({demandes:res.data}) ;
                   console.log(res.data)
            }).catch((err)=>{
                console.log(err);
        }) ;
        Axios.get('http://localhost:80/api/get_traductions_client?id_client='+localStorage.getItem("id_client"))
            .then((res)=>{
                this.setState({traductions:res.data}) ;
                console.log(res.data)
            }).catch((err)=>{
            console.log(err);
        })
        Axios.get('http://localhost:80/api/get_devis_client?id_client='+localStorage.getItem("id_client"))
            .then((res)=>{
                this.setState({devis:res.data}) ;
                console.log(res)
            }).catch((err)=>{
            console.log(err);
        })
    }

    render(){
        return <div className={"col-xs-12 zero_pad"}
        >
                <Client_login />
            <div className={"col-xs-12"}></div>

            {this.state.demandes.map( (i)=>{
                return <div className={"col-xs-12"} key={i.id_demande}>
                    {i.id_demande}
                </div>
            })}
            real


        </div>
    }



}
export default Profile_client ;
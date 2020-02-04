import React from "react";
import Axios from "axios";
import { Bar } from 'react-chartjs-2'

class Stats extends React.Component{

    constructor(props){
        super(props);

        this.state = {


                traducteur_debut:"",
            traducteur_fin:"",
            traducteur_email:/./,
            traducteur_data:[] ,


                client_debut:"",
            client_fin:"",
            client_email:/./,
            client_data:[]

        }
        this.data_client = [] ;
        this.data_traducteur = [] ;

    }

    componentDidMount() {
        this.gettraducteurStats() ;
        this.getClientsStats();
    }

    ExtractData = (tab,ColumnName) =>{
        let tmp=[];
        tab.forEach((i)=>{
            tmp.push(i[ColumnName])
        })
        return tmp ;
    };




    gettraducteurStats(){

        let str="?" ;
        if(this.state.traducteur_debut!==""){
            str += "debut="+this.state.traducteur_debut+"&" ;
        }
        if(this.state.traducteur_fin!==""){
            str += "fin="+this.state.traducteur_fin ;
        }
        Axios.get("http://localhost/api/stats/traducteurs"+str).then((res)=>{
            this.data_traducteur = res.data ;
            console.log(res.data)
            this.setState({
                traducteur_data:res.data

            } );
            console.log(res.data)
        }).catch((err)=>console.log(err))

    }



    getClientsStats(){

        let str="?" ;
        if(this.state.client_debut!==""){
            str += "debut="+this.state.client_debut+"&" ;
        }
        if(this.state.client_fin!==""){
            str += "fin="+this.state.client_fin ;
        }
        Axios.get("http://localhost/api/stats/clients"+str).then((res)=>{
            this.data_client = res.data ;
            console.log(res.data)
            this.setState({
                client_data:res.data

            } );
            console.log(res.data)
        }).catch((err)=>console.log(err))

    }


    render() {
        return <div className={"col-xs-12"}>

            <h1 className={"col-xs-12"} style={{paddingTop:"20px"}}>
                Les statiques du l'aplication </h1>
            <div className={"interline_more"}> trouver tout les statistiques concernant les clients et traducteurs du site  </div>

            <div className={"col-xs-12 interline liner "}></div>
            <div className={"col-xs-12"}>

                <div className={"col-xs-12"}>

                <h3 align={"left"}> Les statistiques traducteurs : </h3>

                <div className={"col-xs-12"} style={{paddingBottom:"20px"}} align={"left"}>
                    Les filtres :
                    <div className={"col-xs-12"}>

                        <div className={"col-xs-3"}>
                            <input type={"text"} className={"my_text_box_v2"} placeholder={"email traducteur"} onChange={(e)=>{
                                          //  this.setState({traducteurs:{email:new RegExp(e.target.value)}})
                                            let p = new RegExp(e.target.value) ;
                                            let temp  = [] ;
                                            this.data_traducteur.forEach((i)=>{
                                                if(p.test(i.traducteur1)){
                                                    temp.push(i)
                                                }
                                            })
                                            this.setState({traducteur_data:temp})

                            }} />
                        </div>

                        <div className={"col-xs-3 "}>
                            de : <input type={"date"} className={"my_text_box_v2"} placeholder={"debut"} onChange={(e)=>{
                                        this.setState({traducteur_debut:e.target.value})
                            }} />
                        </div>
                        <div className={"col-xs-3"}>
                            au : <input type={"date"} className={"my_text_box_v2"} placeholder={"fin"} onChange={(e)=>{
                            this.setState({traducteur_fin:e.target.value})
                            }} />
                        </div>
                        <div className={"col-xs-3"}>
                            <input type={"button"} className={"validate_button"} value={" update "} onClick={(e)=>{
                                this.gettraducteurStats() ;
                        }} />
                        </div>


                    </div>

                </div>

                    <div className={"col-xs-6"}>

                        <Bar data={ {
                            labels:this.ExtractData(this.state.traducteur_data,'traducteur1'),
                            datasets:[{
                                label:" le nombre de traductions ",
                                barThickness: 1,
                                maxBarThickness: 1,
                                borderColor:"black",
                                borderWidth:"1",
                                backgroundColor:"#5d82b3",
                                data:this.ExtractData(this.state.traducteur_data,'nb_traduction'),
                              //  lineTension:0

                            }]
                        } }  options={{animation:{easing:"easeInOutBack",duration: 1} , scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        callback: function (value) { if (Number.isInteger(value)) { return value; } },
                                        stepSize: 1
                                    }
                                }]
                            }

                        }} />

                    </div>
                    <div className={"col-xs-6"}>
                        <Bar data={ {
                            labels:this.ExtractData(this.state.traducteur_data,'traducteur1'),
                            datasets:[{
                                label:" le nombre de devis ",
                                barThickness: 1,
                                maxBarThickness: 1,
                                borderColor:"black",
                                borderWidth:"1",
                                backgroundColor:"#5da3b3",
                                data:this.ExtractData(this.state.traducteur_data,'nb_devis'),
                                //  lineTension:0

                            }]
                        } }  options={{animation:{easing:"easeInOutBack",duration: 1}, scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        callback: function (value) { if (Number.isInteger(value)) { return value; } },
                                        stepSize: 1
                                    }
                                }]
                            }

                        }} />
                    </div>
                </div>
            </div>













                <div className={"col-xs-12"} style={{paddingTop:'100px'}}>

                    <h3 align={"left"}> Les statistiques clients : </h3>

                    <div className={"col-xs-12"} style={{paddingBottom:"20px"}} align={"left"}>
                        Les filtres :
                        <div className={"col-xs-12"}>

                            <div className={"col-xs-3"}>
                                <input type={"text"} className={"my_text_box_v2"} placeholder={"email client"} onChange={(e)=>{
                                    //  this.setState({traducteurs:{email:new RegExp(e.target.value)}})
                                    let p = new RegExp(e.target.value) ;
                                    let temp  = [] ;
                                    this.data_client.forEach((i)=>{
                                        if(p.test(i.client)){
                                            temp.push(i)
                                        }
                                    })
                                    this.setState({client_data:temp})

                                }} />
                            </div>

                            <div className={"col-xs-3 "}>
                                de : <input type={"date"} className={"my_text_box_v2"} placeholder={"debut"} onChange={(e)=>{
                                this.setState({client_debut:e.target.value})
                            }} />
                            </div>
                            <div className={"col-xs-3"}>
                                au : <input type={"date"} className={"my_text_box_v2"} placeholder={"fin"} onChange={(e)=>{
                                this.setState({client_fin:e.target.value})
                            }} />
                            </div>
                            <div className={"col-xs-3"}>
                                <input type={"button"} className={"validate_button"} value={" update "} onClick={(e)=>{
                                    this.getClientsStats() ;
                                }} />
                            </div>


                        </div>

                    </div>

                    <div className={"col-xs-6"}>

                        <Bar data={ {
                            labels:this.ExtractData(this.state.client_data,'client'),
                            datasets:[{
                                label:" le nombre de traductions ",
                                barThickness: 1,
                                maxBarThickness: 1,
                                borderColor:"black",
                                borderWidth:"1",
                                backgroundColor:"#5d82b3",
                                data:this.ExtractData(this.state.client_data,'nb_traduction'),
                                //  lineTension:0

                            }]
                        } }  options={{animation:{easing:"easeInOutBack",duration: 1} , scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        callback: function (value) { if (Number.isInteger(value)) { return value; } },
                                        stepSize: 1
                                    }
                                }]
                            }

                        }} />

                    </div>
                    <div className={"col-xs-6"}>
                        <Bar data={ {
                            labels:this.ExtractData(this.state.client_data,'client'),
                            datasets:[{
                                label:" le nombre de devis ",
                                barThickness: 1,
                                maxBarThickness: 1,
                                borderColor:"black",
                                borderWidth:"1",
                                backgroundColor:"#5da3b3",
                                data:this.ExtractData(this.state.client_data,'nb_devis'),
                                //  lineTension:0

                            }]
                        } }  options={{animation:{easing:"easeInOutBack",duration: 1}, scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        callback: function (value) { if (Number.isInteger(value)) { return value; } },
                                        stepSize: 1
                                    }
                                }]
                            }

                        }} />
                    </div>
                </div>
            </div>










    }

}
export default Stats ;
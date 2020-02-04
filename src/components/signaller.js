import React from "react";

import Axios from 'axios' ;

class Signal extends React.Component{

    constructor(props){
        super(props);

        this.type  = props.type ;
        this.source = props.source ;

        this.state = {
            display:false,
            done:false
        }



    }
    send = () =>{
        if(this.type==="traducteur"){// signaler traducteur
                let destination = this.props.destination ;
                let f = new FormData() ;
                f.append("destination",destination) ;
                f.append("source",this.source) ;
                f.append("cause",document.querySelector("#cause").value)
            f.append("type",'traducteur');


                Axios.post('http://localhost/api/signal',f,{

                }).then((res)=>{
                    console.log(res)
                }).catch((err)=>{
                    console.log(err);
                })

        }
        else{// client signal
            let destination = this.props.destination ;
            let f = new FormData() ;
            f.append("destination",destination) ;
            f.append("source",this.source) ;
            f.append("cause",document.querySelector("#cause").value);
            f.append("type",'client');


            Axios.post('http://localhost/api/signal',f,{
                headers: {

                    'Content-Type': 'multipart/form-data'
                }
            }).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err);
            })

        }
    }

    render(){
        return <div className={"col-xs-12 "}>


            {!this.state.done&&<div>

                <input type={"button"} style={{backgroundColor:"white",color:"#22313f",fontSize:"115%",borderRadius:"5px 5px",padding:"5px",outline:"none",border:"solid 1px #22313f"}} value={"    signaler    "} onClick={()=>{
            this.setState({display:true})}
            } />


            </div>}


            {this.state.display&&!this.state.done&&<div>

                <div className={"col-xs-12 interline"}> </div>

                <textarea placeholder={"descrivez votre cause"} id={"cause"} className={"textarea"} nrows={"10"} />



            <div> <input type={"button"} className={"validate_button"} value={"  valider "} onClick={()=>{
                this.setState({done:true})
                this.send() ;
            }} /> </div>

            </div>}

            {this.state.done&&<div>Votre signale à été soumis Merci </div>}

        </div>
    }


}
export default Signal ;
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



        }
        else{// client signal

        }
    }

    render(){
        return <div className={"col-xs-12 "}>


            {!this.state.done&&<div>

                <input type={"button"} style={{color:"white",backgroundColor:"#eb8954",fontSize:"110%",borderRadius:"10px 10px",padding:"5px",outline:"none"}} value={"    signaler    "} onClick={()=>{
            this.setState({display:true})}
            } />


            </div>}


            {this.state.display&&!this.state.done&&<div>

                <div className={"col-xs-12 interline"}> </div>

                <textarea placeholder={"descrivez votre cause"} className={"textarea"} nrows={"10"} />



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
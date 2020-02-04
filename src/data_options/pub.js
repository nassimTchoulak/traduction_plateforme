import React from "react";


export default class Pub extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            nb:1
        }//animation: mymove 5s infinite;

        setInterval(()=>{

            if(this.state.nb===3){
                this.setState({nb:1})
            }
            else{
                this.setState({nb:(this.state.nb)+1})

            }

        },4000)
    }
    render() {
        return <React.Fragment>

            <img className={"mover"} alt={"pub"} src={"http://localhost/files/pub"+this.state.nb+".jpg"} />
            <img className={"mover"}  alt={"pub"} src={"http://localhost/files/pub"+((this.state.nb+1)%3+1)+".jpg"} />
        </React.Fragment>
    }

}
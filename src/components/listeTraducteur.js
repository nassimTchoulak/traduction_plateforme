import React from "react";
import Axios from "axios";
import Card from './traducteurCard'

class ListTraducteurs extends React.Component {
    constructor(props){
        super(props) ;
        this.state = {
            traducteurs :[]
        }
    }

    componentDidMount() {
        Axios.get('http://localhost/api/all_traducteurs').then((res)=>{
            this.setState({traducteurs:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    render(){
        return <div className={"col-md-12 col-sm-12 zero-pad"}>
            {
                this.state.traducteurs.map((i)=>{
                   return  <Card {...i} />
                })
            }

        </div>
    }
}

export default ListTraducteurs ;
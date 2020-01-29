import React from 'react';

class Article extends React.Component{
    constructor(props){
        super(props);
        this.data =  props.data ;
        this.title = props.titre ;
        this.extend = props.extend ;
        console.log(this.data) ;
        this.state = {
            all:this.extend,

        }

    }


    render(){

        return <div className={"col-xs-12 interline"}>
            <h3>{ this.title}</h3>
            {this.state.all&&<div>{this.data}</div>}
            {!this.state.all&&<div>{this.data.substring(0,100)}</div>}

            <input type={"button"} value={(()=>{
                if(this.state.all){
                    return "reduire"
                }
                else{
                    return "developper"
                }

            })()} className={"mini_button"}  onClick={()=>{
                this.setState({all:!this.state.all})
            }}/>
        </div>
    }



}

export default Article ;
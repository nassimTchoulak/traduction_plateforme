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

        return <div className={"col-xs-12 interline"}
                    style={{border:'solid 1px black',borderRadius:"5px 5px",paddingBottom:"20px",marginBottom:'10px'}}>
            <h3 align={"left"}>{ this.title}</h3>
            {this.state.all&&<div align={"left"}>{this.data}</div>}
            {!this.state.all&&<div align={"left"}>{this.data.substring(0,200)}</div>}

            <div align={"right"}>
            <input align={"right"} type={"button"} value={(()=>{
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
        </div>
    }



}

export default Article ;
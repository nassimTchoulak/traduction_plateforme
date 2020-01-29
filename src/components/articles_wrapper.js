import React from 'react';
import Axios from 'axios';
import Article from "./article";

class ArticlWrapper extends  React.Component{

    constructor(props){
        super(props);
        this.extend = props.extend ;
        if(this.extend===undefined){
            this.extend = false;
        }
        else{
            this.extend = true ;
        }

        this.state = {
            articles:[]
        }
    }
    componentDidMount() {
        Axios.get("http://localhost/api/article").then((res)=>{
            this.setState({articles:res.data})
        }).catch((err)=>{
            console.log(err);
        })
    }

    render() {
        return <React.Fragment>
            {this.state.articles.map((i,itr)=>{
                return <Article key={itr} extend={this.extend} data={i.info} titre ={i.titre} />
            })}
        </React.Fragment>
    }
}
export default ArticlWrapper ;
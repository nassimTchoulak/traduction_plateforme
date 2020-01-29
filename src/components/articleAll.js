import React from "react";
import ArticlWrapper from "./articles_wrapper";

class ArticleAll extends React.Component {
    constructor(props){
        super(props);
    }

    render(){


        return <div className={"col-xs-10 col-xs-offset-1"}>

            <h2> Nos dernières révelations , news et articles</h2>
            <ArticlWrapper extend={true} />

        </div>
    }

}

export default ArticleAll ;
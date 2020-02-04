import React from 'react';

export default class Table extends React.Component {

    constructor(props){
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }

    getKeys = function(){
        return Object.keys(this.props.data[0]);
    }

    getHeader = function(){
        let keys = this.getKeys();
        return keys.map((key, index)=>{
            return <th key={key}>{key.replace(/_/g,' ')+''.substr(0,15)}</th>
        })
    }

    getRowsData = function(){
        let items = this.props.data;
        let keys = this.getKeys();
        return items.map((row, index)=>{
            return <tr style={{display:'flex', justifyContent:'space-between'}} className={'table_element zero_pad col-xs-12'} key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    render() {
        return (
            <div className={"col-xs-12 zero_pad"} align={"center"}>
                <table>
                    <thead>
                    <tr align={'center'} style={{display:'flex', justifyContent:'space-between'}}  className={"table_head zero_pad col-xs-12"}>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                    {this.getRowsData()}
                    </tbody>
                </table>
            </div>

        );
    }
}

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
        return <td  key={props.data[key]}>{props.data[key]+''.substr(0,10)}</td>
    })
}
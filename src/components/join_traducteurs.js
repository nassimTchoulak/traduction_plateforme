import React from 'react' ;
import Communes from "../data_options/communes";


class Join_traducteur extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nom:"",
            prenom:"",
            email:"",
            number:""
        }
    }

    render() {
        return <div className={"col-xs-12"}>
            <div className={"col-xs-offset-1 col-xs-10 formulaire_aceuill"} style={{borderLeft:"solid 1px black",borderRight:"solid 1px black"}}>
                <h2 style={{"fontFamily":"Exo","fontWeight":"bolder"}}> Rejoignez Nous et recevez les offres de traductions
                     </h2>
                <div className={"col-xs-12"}>
                </div>

                <div className={"col-xs-12 interline "}></div>

                <h1 className={"col-xs-12 interline"} style={{ textAlign:"left"}}> <strong> > Les Informations personnels </strong></h1>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-4"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={" Votre Nom"} onChange={(e)=>{
                            this.setState({nom:e.target.value})}}/>
                    </div>
                    <div className={"col-xs-offset-1 col-xs-4"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={" Votre Prenom"} onChange={(e)=>{
                            this.setState({prenom:e.target.value})}}/>

                    </div>
                </div>


                <div className={"col-xs-12"}>
                <div className={"col-xs-offset-1 col-xs-5"}>
                    <input type={"text"} className={"my_text_box_v2"} placeholder={" Votre Email"} onChange={(e)=>{
                        this.setState({email:e.target.value})}}/>
                </div>
            </div>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-5"}>
                        <input type={"number"} className={"my_text_box_v2"} placeholder={" numero Tel"} onChange={(e)=>{
                            this.setState({number:e.target.value})}}/>
                    </div>
                </div>

                <div className={"col-xs-12 interline"}></div>

                <div className={"col-xs-12"}>
                    <div className={"col-xs-offset-1 col-xs-4"}>
                        <input type={"text"} className={"my_text_box_v2"} placeholder={" adress"} onChange={(e)=>{
                            this.setState({number:e.target.value})}}/>
                    </div>
                    <div className={"col-xs-offset-1 col-xs-2"}>
                        <select className={"my_text_box_v2"} id={"destination"} placeholder={"fr"}>
                            <Communes />
                        </select>
                    </div>
                    <div className={"col-xs-offset-1 col-xs-2"}>
                        <select className={"my_text_box_v2"} id={"destination"} placeholder={"fr"}>
                            <option value="" disabled selected>La Commune </option>
                            <option value="français">Français</option>
                            <option value="arabe">Arabe</option>
                            <option value="englais">Englais</option>
                            <option value="espagnole">Espagnole</option>
                        </select>
                    </div>
                </div>



            </div>


        </div>
    }


}
export default Join_traducteur ;
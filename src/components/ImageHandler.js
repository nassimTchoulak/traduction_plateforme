import React from "react";

import Axios from "axios";

class ImageHandler extends React.Component {
    constructor(props) {
        super(props);

        this.person = props.person;
        this.email = props.email;
        this.token = props.token ;

        this.state = {
            src: "http://localhost/files/" + this.person + "/" + this.email + ".jpg?tmp=" + Math.floor(Math.random() * 100),
            file: ""
        }
    }


    render() {
        return <React.Fragment>

            <img src={this.state.src} className={"profile_pic"} onError={() => {
                this.setState({src: "http://localhost/files/traducteurs/user.jpg"})
            }}/>

            <div><input type={"button"} style={{paddingTop: "10px"}} value={"  Modifier Photo  "} onClick={() => {
                document.querySelector("#file").click();
            }} className={"validate_button "}/></div>

            <input type={'file'} id={"file"} style={{display: "none"}} accept={"image/png, image/jpeg , image/jpg"}
                   onChange={(e) => {
                       let f = new FormData();
                       f.append("token", this.props.token);
                       f.append("email", this.props.email);
                       f.append("image", e.target.files[0]);

                       let url = "";


                       if (this.person === "clients") {
                           url = 'http://localhost/api/set_photo_client'
                       } else {
                           url = 'http://localhost/api/set_image_traducteur'
                       }

                       Axios.post(url, f, {
                           headers: {
                               'Content-Type': 'multipart/form-data'
                           }
                       }).then((res) => {

                           console.log(f)

                           if (res.data.status) {

                               setTimeout(() => {
                                   this.setState({src: "http://localhost/files/" + this.person + "/" + this.email + ".jpg?tmp=" + Math.floor(Math.random() * 100)})
                               }, 1000);

                           }

                       }).catch((err) => {
                           console.log(err)
                       })

                   }}/>


        </React.Fragment>
    }

}
export default ImageHandler ;
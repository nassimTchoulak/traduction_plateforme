import React, {useLayoutEffect, useState} from 'react';
//import {Route ,Switch} from 'react-router';


//import { NavLink ,Link, BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Route,  NavLink  } from "react-router-dom";
import  'bootstrap/dist/css/bootstrap.min.css';
import './my_ui.css';

import Main from './components/main';
import Profile_client from "./components/profile_client";
import Join_traducteur from "./components/join_traducteurs";
import TraducteurLogin from "./components/traducteurLogin";
import MainTraducteur from './components/MainTraducteur' ;
import ListTraducteurs from "./components/listeTraducteur";
import TraducteurPresentation from './components/TraducteurPresentation' ;
import ClientPresentation from "./components/ClientPresentation";
import ArticleAll from "./components/articleAll";


//import Background from "./back_img_v1.jpg";

// import { Route, Redirect } from 'react-router'

const style = {
    width: "100%",
    //  backgroundSize :"cover",
    // backgroundClip: 'none',
    // backgroundImage: `url(${Background})`,
    backgroundPosition: 'center',
   // height: "100%",
    //backgroundColor : '#261326',
   // backgroundImage:"linear-gradient(to bottom right, ##f0f0f0, ##f0f0f0)",
    //   backgroundRepeat: 'repeat',
    position: 'static',

    // backgroundImage: "linear-gradient(to top,#261326,#261326)",
    // bottom:"1000px",

};
const style2 = style ;







function App_head({ routes }) {



    return (
        <div className={"col-xs-12 zero_pad"} >

            <div className={"col-xs-12 zero_pad upper_panel"}>
                <div className={"col-xs-2"}>LOGO</div>
                <div className={"col-xs-offset-4 col-xs-4"}> social media links </div>

            </div>

            {(localStorage.getItem("id_traducteur")!==null)&& <div className={"col-xs-12 zero_pad menu_upper"} >


                    <NavLink to={"/"}
                             className={"col-xs-3  my_button_v8"} > Acceuill   </NavLink>

                    <NavLink to={"/traducteur/login"}
                             className={"col-xs-3  my_button_v8"}> Mes traductions </NavLink>

                <NavLink to={"/all_traducteur"}
                         className={"col-xs-3  my_button_v8"}> Nos Traducteurs </NavLink>




                <NavLink to={"/"}
                         className={"col-xs-3  my_button_v8"} > Blog   </NavLink>

                <NavLink to={"/articles"}
                         className={"col-xs-3  my_button_v8"}> Articles  </NavLink>

                <NavLink to={"/"}
                         className={"col-xs-3  my_button_v8"}> A propos </NavLink>

                <div style={{color:"white"}}
                         className={"col-xs-3  my_button_v8"}  onClick={()=>{localStorage.clear();
                    window.location.reload()}}> Deconnexion </div>


            </div>}

            {((localStorage.getItem('id_traducteur')===null)&&(localStorage.getItem("id_client")===null))&&<div className={"col-xs-12 zero_pad menu_upper"}>
                <NavLink to={"/"}
                         className={"col-xs-3  my_button_v8"} > Acceuill   </NavLink>
                <NavLink to={"/all_traducteur"}
                         className={"col-xs-3  my_button_v8"}> Nos Traducteurs </NavLink>

                <NavLink to={"/recrutement"}
                         className={"col-xs-3  my_button_v8"}> Recrutement </NavLink>

                <NavLink to={'/'} className={"col-xs-3  my_button_v8"}> A propos </NavLink>

                <NavLink to={"/traducteur/login"}
                         className={"col-xs-3  my_button_v8"}> Connexion Traducteur </NavLink>

                <NavLink to={"/client/profile"}
                         className={"col-xs-3  my_button_v8"}> Connexion Client </NavLink>


                <NavLink to={"/"}
                         className={"col-xs-3  my_button_v8"} > Blog   </NavLink>

                <NavLink to={"/articles"}
                         className={"col-xs-3  my_button_v8"}> Articles  </NavLink>




            </div>}

            {(localStorage.getItem("id_client")!==null)&&<div className={"col-xs-12 zero_pad menu_upper"}>
                <NavLink to={"/"}
                         className={"col-xs-2  my_button_v8"} > Acceuill </NavLink>


                <NavLink to={"/traducteur/login"}
                         className={"col-xs-3  my_button_v8"}> Mes demandes traduction  </NavLink>

                <NavLink to={"/all_traducteur"}
                         className={"col-xs-3  my_button_v8"}> Nos traducteurs </NavLink>
                <NavLink to={"/articles"}
                         className={"col-xs-2  my_button_v8"}> Articles  </NavLink>

                <div  style={{color:"white"}}
                    className={"col-xs-2  my_button_v8"} onClick={()=>{localStorage.clear();
                    window.location.reload() ;

                    }}> Deconnexion </div>

                </div>
            }

            <div className={"col-xs-12 pub_panel zero_pad"}>
                <div className={"pub_holder"}> la pub </div>
            </div>

            <div className={"col-xs-12 "} style={{"backgroundColor":"#eff2ff"}}>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
            </div>

        </div>
    );
}

function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            exact={route.exact}

            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}


const routes = [
    {
    path: '/',
    component: App_head,
    exact: true,
    routes: [
        {
            path: '/',//   / means sandwich
            component: Main,
            exact: true
        }
    ]

    },
    {
        path: '/login',
        component: App_head,
        exact: true,
        routes: [
            {
                path: '/login',//   / means sandwich
                component: Main,
                exact: true
            }
        ]

    },
    {
        path: "/client/profile",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/client/profile",//   / means sandwich
                component: Profile_client,
                exact: true

            }

        ]

    },
    {
        path: "/recrutement",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/recrutement",//   / means sandwich
                component: Join_traducteur,
                exact: true

            }

        ]

    },
    {
        path: "/traducteur/login",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/traducteur/login",//   / means sandwich
                component: TraducteurLogin,
                exact: true

            }

        ]

    },
    {
        path: "/traducteur/",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/traducteur/",//   / means sandwich
                component: MainTraducteur,
                exact: true

            }

        ]

    },

    {
        path: "/all_traducteur/",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/all_traducteur/",//   / means sandwich
                component: ListTraducteurs,
                exact: true

            }

        ]

    },
    {
        path: "/presentation/traducteur/:mail",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/presentation/traducteur/:mail",//   / means sandwich
                component: TraducteurPresentation,
                exact: true

            }

        ]

    },
    {
        path: "/presentation/client/:mail",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/presentation/client/:mail",//   / means sandwich
                component: ClientPresentation,
                exact: true

            }

        ]

    },
    {
        path: "/articles",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/articles",//   / means sandwich
                component: ArticleAll,
                exact: true

            }

        ]

    },
];





class core extends React.Component{


    render(){
        return (
            <Router>
                <div className={"col-xs-12 zero_pad_v2"} style={style}>


                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </div>
            </Router>
        );
    }
};

export default core ;

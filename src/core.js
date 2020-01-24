import React, {useLayoutEffect, useState} from 'react';
//import {Route ,Switch} from 'react-router';


//import { NavLink ,Link, BrowserRouter as Router } from 'react-router-dom';
import { BrowserRouter as Router, Route,  NavLink  } from "react-router-dom";
import  'bootstrap/dist/css/bootstrap.min.css';
import './my_ui.css';

import Main from './components/main';
import Profile_client from "./components/profile_client";
import Join_traducteur from "./components/join_traducteurs";


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

            <div className={"col-xs-12 zero_pad menu_upper"} >


                    <NavLink to={"/"} activeClassName={"active_my_button_v8"}
                             className={"col-xs-3  my_button_v8"} > Aceuill   </NavLink>

                    <NavLink to={"/"} activeClassName={"active_my_button_v8"}
                             className={"col-xs-3  my_button_v8"}> Nos traduction </NavLink>
                <NavLink to={"/"} activeClassName={"active_my_button_v8"}
                         className={"col-xs-3  my_button_v8"}> Mes objets </NavLink>
                <NavLink to={"/"} activeClassName={"active_my_button_v8"}
                         className={"col-xs-3  my_button_v8"}> Nos Traducteurs </NavLink>

                <NavLink to={"/"} activeClassName={"active_my_button_v8"}
                         className={"col-xs-3  my_button_v8"} > Blog   </NavLink>

                <NavLink to={"/"} activeClassName={"active_my_button_v8"}
                         className={"col-xs-3  my_button_v8"}> Articles  </NavLink>
                <NavLink to={"/recrutement"} activeClassName={"active_my_button_v8"}
                         className={"col-xs-3  my_button_v8"}> Recrutement </NavLink>
                <NavLink to={"/"} activeClassName={"active_my_button_v8"}
                         className={"col-xs-3  my_button_v8"}> A propos </NavLink>


            </div>

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
    path: "/",
    component: App_head,
    exact: true,
    routes: [
        {
            path: "/",//   / means sandwich
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

    }
];

/*
const routes = [
    {
        path: "/",
        component: App_head,
        exact: true,
        routes: [
            {
                path: "/",//   / means sandwich
                component: Object_mine,
                exact: true
            }]
    },

    {
        path:"/add_alarme/:var",
        component:App_head,
        exact:true ,
        routes:[
            {
                path:"/add_alarme/:val",
                component:add_alarme,
                exact:true
            }
        ]}
]; */





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

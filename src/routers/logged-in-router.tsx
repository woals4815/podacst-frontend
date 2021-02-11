import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { Podcasts } from '../pages/podcasts';
import { UserRole } from '../__generated__/globalTypes';

const commomRoutes = [
    {
        path: "/",
        component: <Podcasts />
    }
]

const HostRoutes = [
    {
        path: "/",
        component: <Podcasts />
    },
    // {
    //     path: '/add-podcast',
    //     //component:
    // }
]

export const LoggedInRouter = () => {
    const {data,error, loading} = useMe();
    if (!data || error || loading) {
        return (
            <div className=" h-screen flex flex-col justify-center pb-24">
                <span className="font-medium text-xl text-center">Loading...</span>
            </div>
        )
    }
    return (
        <Router>
            <Switch>
                {data.me.role === UserRole.Host && 
                    HostRoutes.map(route => (
                        <Route exact key={route.path} path={route.path}>
                            {route.component}
                        </Route>
                    ))
                }
                <Route path="/" exact>
                    {commomRoutes.map(route => (
                        <Route key={route.path} path={route.path}>
                            {route.component}
                        </Route>
                    ))}
                </Route>
            </Switch>
        </Router>
    )
}
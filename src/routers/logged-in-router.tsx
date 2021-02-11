import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { Podcasts } from '../pages/podcasts';

const commomRoutes = [
    {
        path: "/",
        component: <Podcasts />
    }
]

export const LoggedInRouter = () => {
    const {data,error, loading} = useMe();
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Podcasts />
                </Route>
            </Switch>
        </Router>
    )
}
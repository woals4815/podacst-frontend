import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { AddEpisode } from '../pages/add-episode';
import { AddPodcast } from '../pages/add-podcast';
import { Podcast } from '../pages/podcast';
import { Podcasts } from '../pages/podcasts';
import { Search } from '../pages/search';
import { User } from '../pages/user';
import { UserRole } from '../__generated__/globalTypes';

const commomRoutes = [
    {
        path: "/",
        component: <Podcasts />
    },
    {
        path: "/podcasts/:id",
        component: <Podcast />
    },{
        path: "/search",
        component: <Search />
    },
    {
        path:'/users/:id',
        component: <User />
    }
]

const HostRoutes = [
    {
        path: "/",
        component: <Podcasts />
    },
    {
        path: "/podcasts/:id",
        component: <Podcast />
    },
    {
        path: '/add-podcast',
        component: <AddPodcast />
    },
    {
        path: "/podcasts/:id/add-episode",
        component: <AddEpisode />
    },
    {
        path: "/search",
        component: <Search />
    },
    {
        path: '/user/:id',
        component: <User />
    }
]

export const LoggedInRouter = () => {
    const {data, error, loading} = useMe();
    if (!data || error || loading) {
        return (
            <div className=" h-screen flex flex-col justify-center pb-24">
                <span className="font-medium text-xl text-center">Loading...</span>
            </div>
        )
    }
    return (
        <Router>
            <Header />
            <Switch>
                {data.me.role === UserRole.Host && 
                    HostRoutes.map(route => (
                        <Route exact key={route.path} path={route.path}>
                            {route.component}
                        </Route>
                    ))}
                {commomRoutes.map(route => (
                    <Route exact key={route.path} path={route.path}>
                        {route.component}
                    </Route>
                ))}
            </Switch>
        </Router>
    )
}
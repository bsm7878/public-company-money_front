import React, { useEffect } from 'react';
import ReactGA from "react-ga"; 
import AppLayOut from '../components/applayout/AppLayOut';
import Main from '../components/main/Main'

const IndexPage = () => {

    const getGA = () => {

        const pathName = window.location.pathname;
        ReactGA.initialize("UA-203105090-1");
        ReactGA.set({ page: pathName });
        ReactGA.pageview(pathName);
        
    };

    useEffect(() => {
        getGA();
    }, []);

    return (
        <AppLayOut>
            <Main/>
        </AppLayOut>
    );
};

export default IndexPage;
import React, { useEffect } from 'react';
import ReactGA from "react-ga"; 
import {useParams} from "react-router-dom";
import AppLayOut from '../components/applayout/AppLayOut';
import Rank from '../components/rank/Rank';

const RankPage = ({match}) => {
    
    const getGA = () => {

        const pathName = window.location.pathname;
        ReactGA.initialize("UA-203105090-1");
        ReactGA.set({ page: pathName });
        ReactGA.pageview(pathName);
        
    };

    useEffect(() => {
        getGA();
    }, []);

    const { uniq_num } = useParams();

    return (
        <AppLayOut>
            <Rank uniq_num={uniq_num} />
        </AppLayOut>
    );
};

export default RankPage;
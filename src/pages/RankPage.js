import React from 'react';
import {useParams} from "react-router-dom";
import AppLayOut from '../components/applayout/AppLayOut';
import Rank from '../components/rank/Rank';

const RankPage = ({match}) => {
    
    const { uniq_num } = useParams();

    return (
        <AppLayOut>
            <Rank uniq_num={uniq_num} />
        </AppLayOut>
    );
};

export default RankPage;
import React from 'react';
import Info from './info/Info';
import Ranking from './ranking/Ranking';
import Speach from './speach/Speach';
import TableList from './table_list/TableList';
import './Rank.scss';


const Rank = ({uniq_num}) => {

    return (
        <>
            <Info uniq_num={uniq_num}/>
            <Ranking uniq_num={uniq_num}/>
            <Speach uniq_num={uniq_num}/>
            <TableList uniq_num={uniq_num}/>
        </>
    );
};

export default Rank;
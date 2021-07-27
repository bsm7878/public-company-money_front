import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../../api';
import {Col, Row, Badge, Descriptions, Tag} from 'antd';


const FirstRank = ({uniq_num}) => {
    const firstRankUrl = `/api/first_rank/${uniq_num}`

    const [rank, setRank] = useState({})
    const [rankInfo, setRankInfo] = useState({})

    // 기준 선택 상태
    const [companyInfo, setCompanyInfo] = useState("전체")
    const [companyNumber, setCompanyNumber] = useState(0)
    const [all, setAll] = useState("processing")
    const [location, setLocation] = useState("default")
    const [superCompany, setSuperCompany] = useState("default")
    const [category, setCategory] = useState("default")
    
    useEffect(() => {
        axiosInstance.get(firstRankUrl)
            .then(response => {
                const {data} = response;
                setRank({"all" : data.all, "location" : data.location, "authority" : data.authority, 'type' : data.type})
                setRankInfo(data.all)
                setCompanyNumber(data.all.company_number)

            })
    }, [firstRankUrl])
    



    const changeAll = () =>{
        if(all === "default"){
            setAll("processing")
            setLocation("default")
            setSuperCompany("default")
            setCategory("default")

            setRankInfo(rank.all)

            setCompanyInfo(rank.all.company_info)
            setCompanyNumber(rank.all.company_number)
        }
    }
    const changeLocation = () =>{
        if(location === "default"){
            setAll("default")
            setLocation("processing")
            setSuperCompany("default")
            setCategory("default")

            setRankInfo(rank.location)

            setCompanyInfo(rank.location.company_info)
            setCompanyNumber(rank.location.company_number)
        }
    }
    const changeSuperCompany = () =>{
        if(superCompany === "default"){
            setAll("default")
            setLocation("default")
            setSuperCompany("processing")
            setCategory("default")

            setRankInfo(rank.authority)

            setCompanyInfo(rank.authority.company_info)
            setCompanyNumber(rank.authority.company_number)
        }
    }

    const changeCategory = () =>{
        if(category === "default"){
            setAll("default")
            setLocation("default")
            setSuperCompany("default")
            setCategory("processing")

            setRankInfo(rank.type)

            setCompanyInfo(rank.type.company_info)
            setCompanyNumber(rank.type.company_number)
        }
    }

    function moneyToUnit(money) {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    return (
        <>
        <Row>
            <Col span={24}>
                <div className="choice">
                    <Badge status={all} onClick={changeAll} text="전체"/>
                    <Badge status={location} onClick={changeLocation} text="소재지"/>
                    <Badge status={superCompany} onClick={changeSuperCompany} text="주무부처"/>
                    <Badge status={category} onClick={changeCategory} text="기관유형"/>
                </div>
            </Col>
        </Row>

        <Row>
            <Col className="ranking" span={24}>
                <div className='rank_wrapper'>
                    <span>{rankInfo && rankInfo.rank}</span> <span>등</span>
                </div>
                <div className='tag_wrapper'>
                    <Tag color="#108ee9">{companyInfo}</Tag>
                    <Tag color="#2db7f5">{companyNumber}개</Tag>
                    <Tag color="#87d068">상위 {Math.round(rankInfo.rank / companyNumber * 100)}%</Tag>
                </div>
            </Col>

            <Col  className="money_summary" xs={{span: 24}} sm={{ span: 14, offset: 5 }}>
                <Descriptions 
                    bordered  
                    layout="vertical"
                    column={{ xxl: 8, xl: 4, lg: 4, md: 4, sm: 4, xs: 4 }}
                >
                    <Descriptions.Item label="최고" span={2}>
                        <div className="money_section">{rankInfo.top && moneyToUnit(rankInfo.top.money)}</div>
                        <div className="company_section">{rankInfo.top && rankInfo.top.name}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="최저" span={2}>
                        <div className="money_section">{rankInfo.bottom && moneyToUnit(rankInfo.bottom.money)}</div> 
                        <div className="company_section">{rankInfo.bottom && rankInfo.bottom.name}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="중위값" span={2}>
                        <div className="money_section">{rankInfo.center && moneyToUnit(rankInfo.center.money)}</div>
                        <div className="company_section">{rankInfo.center && rankInfo.center.name}</div>
                    </Descriptions.Item>
                    <Descriptions.Item label="평균" span={2}>
                        <div className="money_section">{rankInfo.middle && moneyToUnit(rankInfo.middle.money) }</div>
                    </Descriptions.Item>
                </Descriptions>
            </Col>
            <Col className="source"xs={{span: 24}} sm={{ span: 14, offset: 5 }}>
                단위 : 천 원
                <br/>
                출처 : 알리오('21년)
            </Col>
        </Row>        
        </>
    );
};

export default FirstRank;
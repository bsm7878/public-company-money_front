import React, { useEffect, useState } from 'react';
import { Descriptions, Row, Col,Collapse, Image } from 'antd';
import { axiosInstance } from '../../../api';
import './Info.scss';

const Info = ({uniq_num}) => {

    const { Panel } = Collapse;

    const firstMoneyUrl = `/api/first_money/${uniq_num}`
    const aveMoneyUrl = `/api/ave_money/${uniq_num}`

    const [firstTotal, setFirstTotal] = useState('')
    const [aveTotal, setAVeTotal] = useState('')

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [img, setImg] = useState('')
    const [authority, setAuthority] = useState('')
    const [type, setType] = useState('')
    const [purpose, setPurpose] = useState('')
    const [setting, setSetting] = useState('')

    useEffect(() => {
        
        axiosInstance.get(firstMoneyUrl)
            .then(response => {
                const {data} = response;
                setName(data.name)
                setLocation(data.company.location)
                setImg(data.company.img_url)
                setAuthority(data.company.authority)
                setType(data.company.type)
                setPurpose(data.company.purpose)
                setSetting(data.company.function)

                setFirstTotal(data.total)
            })
            .catch(error => {
                window.history.back();
            })

            axiosInstance.get(aveMoneyUrl)
                .then(response => {
                    const {data} = response;
                    setAVeTotal(data.total)
                })
                .catch(error => {
                    setAVeTotal("-")
            })
            
    }, [])


    function moneyToUnit(money) {
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }    


    return (
        <Row className="info_wrapper">
            <Col xs={{span: 24}} sm={{ span: 14, offset: 5 }}>
                <a href = "https://www.naver.com" target="_blank">
                    <Image width={200} src={img} alt={name} preview={false}/>
                </a>
                <Descriptions  size='small' bordered>
                    <Descriptions.Item label="초봉" span={2}>{moneyToUnit(firstTotal)} 천원</Descriptions.Item>
                    <Descriptions.Item label="평균연봉" span={2}>{moneyToUnit(aveTotal)} 천원</Descriptions.Item>
                    <Descriptions.Item label="위치">{location}</Descriptions.Item>
                    <Descriptions.Item label="주무기관">{authority}</Descriptions.Item>
                    <Descriptions.Item label="기관유형">{type}</Descriptions.Item>
                </Descriptions>

                <Collapse expandIconPosition='right'>
                <Panel  header="설립목적" key="1">
                {
                purpose.split('\n').map( line => {
                    return (
                    <span>{line}<br/></span>
                    )
                })
                }
                </Panel>
                <Panel  header="주요 기능" key="2">
                {
                setting.split('\n').map( line => {
                    return (
                    <span>{line}<br/></span>
                    )
                })
                }
                </Panel>
                </Collapse>
            </Col>
            <Col className="source"xs={{span: 24}} sm={{ span: 14, offset: 5 }}>
                출처: 알리오('21년)
            </Col>
      </Row>
    );
};

export default Info;
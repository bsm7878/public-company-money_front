import React from 'react';
import { useHistory } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { Row, Col, Layout, Select } from 'antd';
import { useAxios } from '../../api';
import Message from '../../images/message.png';
import profits from '../../images/profits.png';
import rank from '../../images/rank.png';
import './Main.scss';

const Main = () => {
    let history = useHistory();

    const { Content } = Layout;
    const { Option } = Select;

    function handleOption(value, option){
        history.push('/rank/' + option.key);
    };


    const [{ data: companyList, loading, error }] = useAxios({
        url : '/api/company/'
    })

    return (
        <>
        <Content className='content'>
        <Row className='title-section'>
            <Col span={24}>
                <h1>
                    알리오 불편해서 만듬
                    <br/>
                    공기업, 연봉 비교 끝판왕!
                </h1>    
            </Col>        
        </Row>


        <Row className='search-section'>
            <Col xs={{span: 22, offset: 1}} sm={{ span: 8, offset: 8 }}>
                <FcSearch className='search-icon'/>
                <Select
                    className='search-button'
                    bordered={false}
                    autoFocus={true}
                    allowClear={true}
                    size="large"
                    showSearch
                    placeholder="공기업을 입력해 주세요."
                    onSelect = {handleOption}
                >
                    {!loading && !error && companyList && companyList.map(company => {
                        const {name, uniq_num} = company;
                        return (
                            <Option key={uniq_num} value={name}>
                                {name}
                            </Option>
                        );
                    })}
                </Select>

            </Col>
        </Row>
    </Content>

    <Content className='intro'>
        <Row className='intro-title-section'>
            <Col xs={{span: 22, offset: 1}} sm={{ span: 6, offset: 9 }}>
                <h2>이 사이트 뭐람</h2>
                <p>알리오가 불편해서 만들었어요😢</p>
            </Col>
        </Row>

        <Row className='intro-detail-section'>
            <Col xs={{span: 24 }} sm={{ span: 6, offset: 3 }}>
                <img src={profits} alt='profits' />
                <h3>연봉 확인</h3>
                <p>
                    초봉, 평균연봉, 중위값 등
                    <br/>
                    모든 공기업의 연봉을 확인해 보세요
                </p>
            </Col>
            <Col xs={{span: 24 }} sm={{ span: 6 }}>
                <img src={rank} alt='rank' />
                <h3>등수 확인</h3>
                <p>
                    전체, 지역, 유형, 주무부처 안에서
                    <br/>
                    해당 공기업의 연봉 위치를 확인해 보세요
                </p>
            </Col>
            <Col xs={{span: 24 }} sm={{ span: 6}}>
                <img src={Message} alt='message' />
                <h3>정보 확인</h3>
                <p>
                    해당 공기업에 대한 의견이 있으면
                    <br/>
                    자유롭게 나눠 주세요
                </p>
            </Col>
        </Row>
        </Content>
        </>
    );
};

export default Main;
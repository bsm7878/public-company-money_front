import React from 'react';
import { Row, Col, Layout } from 'antd';
import Logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import './AppLayOut.scss';

const AppLayOut = ({children}) => {

    const { Header, Footer, Content } = Layout;

    
    return (
        <Layout>
            <Header className='header'>
                <Row>
                    <Col xs={{span: 24}} sm={{ span: 22, offset: 2 }}>
                        <h1>
                            <Link to="/">
                                <img className = "logo" src={Logo}  alt='공기업 연봉 순위'/>
                            </Link>
                        </h1>
                    </Col>
                    {/* <Col span={10} className='user-button' style = {{textAlign: 'right'}}>
                    </Col> */}
                </Row>
            </Header>
            
            <Content className='main'>
                {children}
            </Content>

            <Footer className='footer'>
                <Row className='footer-section'>
                    <Col span={24}>
                        <p>위 사이트는 공공기관 경영정보 공개시스템 '알리오'에 공시된 자료를 기반으로 만들어졌습니다.</p>
                        <p>© Octopus</p>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
};

export default AppLayOut;
import React from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import { MoneyCollectOutlined, DollarOutlined } from '@ant-design/icons';
import { FcTodoList } from "react-icons/fc";
import './TableList.scss';
import FirstTable from './tab/FirstTable';
import AveTable from './tab/AveTable';





const TableList = ({uniq_num}) => {
    const { TabPane } = Tabs;

    

    return (
        <Row className="card_section">
            <Col xs={{span: 24}} sm={{ span: 14, offset: 5 }}>
                <Card 
                  title={
                    <span>
                        <div className='title_logo'><FcTodoList/></div> 
                        <div className='title_content'>전체</div>
                    </span>
                  } 
                  style={{ width: "100%" }}
                >
                <Tabs defaultActiveKey="1">
                  <TabPane
                    tab={
                      <span>
                        <MoneyCollectOutlined />
                        신입 초봉
                      </span>
                    }
                    key="1"
                  >

                  <FirstTable uniq_num={uniq_num}/>  
                    
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <DollarOutlined />
                        평균 연봉
                      </span>
                    }
                    key="2"
                  >
                    <AveTable uniq_num={uniq_num}/>

                  </TabPane>
                </Tabs>    
                

                </Card>
            </Col>
        </Row>
    );
};

export default TableList;
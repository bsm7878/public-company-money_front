import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../api';
import { Col, Row, Table, Badge, Spin} from 'antd';

const FirstTable = ({uniq_num}) => {
      const columns = [
           { title: '순위', dataIndex: 'rank', key: '1' },
           { title: '기업', width: 215, dataIndex: 'name', key: '2'},
           { title: '기본급', dataIndex: 'nomal', key: '3', sorter: {compare: (a, b) => a.nomal - b.nomal} },
           { title: '고정수당', dataIndex: 'fixed', key: '4', sorter: {compare: (a, b) => a.fixed - b.fixed} },
           { title: '실적수당', dataIndex: 'performance', key: '5', sorter: {compare: (a, b) => a.performance - b.performance} },
           { title: '복리후생비', dataIndex: 'benefit', key: '6', sorter: {compare: (a, b) => a.benefit - b.benefit} },
           { title: '성과 상여금', dataIndex: 'person_bonus', key: '7', sorter: {compare: (a, b) => a.person_bonus - b.person_bonus} },
           { title: '경평 성과급', dataIndex: 'company_bonus', key: '8', sorter: {compare: (a, b) => a.company_bonus - b.company_bonus} },
           { title: '기타', dataIndex: 'etc', key: '9', sorter: {compare: (a, b) => a.etc - b.etc}},
           {
              title: '총 연봉',
              key: 'operation',
              fixed: 'right',
              width: 100,
              dataIndex: 'total',
              sorter: {compare: (a, b) => a.total - b.total,multiple: 1},
            },
        ];
  
         
      const [all, setAll] = useState("processing");
      const [location, setLocation] = useState("default");
      const [superCompany, setSuperCompany] = useState("default");
      const [category, setCategory] = useState("default");
  
      const [allMoney, setAllMoney] = useState();
      

      const [url, setUrl] = useState(`/api/first_money/${uniq_num}/all`)
      
      useEffect(() => {
          axiosInstance.get(url)
              .then(response => {
                  const {data} = response;
                  setAllMoney(data);
                  setAllData(data);
              })      
      }, [])
  
  
      const [allData, setAllData] = useState();
      const changeAll = () =>{
        if(all === "default"){
            setAll("processing")
            setLocation("default")
            setSuperCompany("default")
            setCategory("default")
        }

        setAllMoney(allData);
      }
      
      const [locationData, setLocationData] = useState()
      const changeLocation = () =>{
          if(location === "default"){
                setAll("default")
                setLocation("processing")
                setSuperCompany("default")
                setCategory("default")
 
                if(!locationData){
                    setAllMoney();
                    axiosInstance.get(`/api/first_money/${uniq_num}/location`)
                        .then(response => {
                            const {data} = response;
                            setLocationData(data);
                            setAllMoney(data);
                        })   
                }else{
                    setAllMoney(locationData)
                }            
          }
      }

      const [authorityData, setAuthorityData] = useState()
      const changeSuperCompany = () =>{
          if(superCompany === "default"){
              setAll("default")
              setLocation("default")
              setSuperCompany("processing")
              setCategory("default")

              if(!authorityData){
                setAllMoney();
                axiosInstance.get(`/api/first_money/${uniq_num}/authority`)
                    .then(response => {
                        const {data} = response;
                        setAuthorityData(data);
                        
                        setAllMoney(data)
                    })   
                }else{
                    setAllMoney(authorityData)
                }
          }
      }
  
      const [typeData, setTypeData] = useState()
      const changeCategory = () =>{
          if(category === "default"){
              setAll("default")
              setLocation("default")
              setSuperCompany("default")
              setCategory("processing")
              
                if(!typeData){
                    setAllMoney();
                    axiosInstance.get(`/api/first_money/${uniq_num}/type`)
                    .then(response => {
                        const {data} = response;
                        setTypeData(data);
                        setAllMoney(data)
                    })   
                }else{
                    setAllMoney(typeData)
                }
          }
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

        <Row className="table_wrapper">
            <Col className="table-colum" xs={{span: 24}} sm={{ span: 24}}>
            
            {allMoney ? <Table 
            columns={columns} 
            dataSource={allMoney} 
            scroll={{ x: 1200 }}
            pagination={{hideOnSinglePage: false}} 
            /> :  <Spin size="large"/>
            }
            </Col>

            <Col className="source"xs={{span: 24}} sm={{ span: 24 }}>
                단위 : 천 원
                <br/>
                출처 : 알리오('21년)
            </Col>
        </Row>    
        </>
    );
};

export default FirstTable;
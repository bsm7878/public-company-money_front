import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Axios from 'axios';
import useLocalStorage from '../../../utils/useLocalStorage'
import  '../signin/SignIn.scss';




const SignIn = () => {
    const history = useHistory();
    const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");


    const onFinish = values => {
        const {email, password} = values;


        const data = {email, password}
        Axios.post("http://localhost:8000/accounts/token/", data)
            .then(response => {
                const {data : {token : jwtToken}} = response
                setJwtToken(jwtToken);
                notification.open({
                    message: '로그인 완료',
                    icon: <SmileOutlined style={{color: '#108ee9'}}/>
                })

                history.push('/')
            })
            .catch(error => {
                console.log(error.response)
            })
        
    }
    return (
        <>
          <Row >
              <Col sm={{ span: 8, offset: 8 }}>
                <Form
                className="form"
                name="basic"
                size={"large"}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                >
                <h2>로그인</h2>
                <hr/>
                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[
                        { required: true, message: "이메일을 입력해 주세요 :)" },
                        { message: "이메일을 입력해 주dd세요 :)" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    rules={[
                        { required: true, message: "비밀번호를 입력해 주세요 :)" },
                        { min: 8, message: "최소 8글자를 입력해주세요 :)" },
                        { max: 20, message: "최대 20글자를 입력해주세요 :)" },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 10, span: 4 }}>
                    <Button type="primary" htmlType="submit" style={{width:'100%'}}>
                    로그인
                    </Button>
                </Form.Item>
                </Form>
              </Col>
          </Row>
        </>
    );
};

export default SignIn;
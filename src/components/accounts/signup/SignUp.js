import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Input, Button, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Axios from 'axios';
import  '../signup/SignUp.scss';

const SignUp = () => {
    const history = useHistory();
    const [emailError, setEmailError] = useState([]);
    const [usernameError, setUsernameError] = useState([]);

    const onFinish = values => {
        const {email, username, password} = values;

        setEmailError([]);

        const data = {email, username, password}
        Axios.post("http://localhost:8000/accounts/signup/", data)
            .then(response => {
                notification.open({
                    message: '회원가입 완료',
                    description: '로그인 페이지로 이동합니다 :)',
                    icon: <SmileOutlined style={{color: '#108ee9'}}/>
                })

                history.push('/accounts/sign_in')
            })
            .catch(error => {
                if(error.response){
                    const errorMessages = error.response.data
                    setEmailError(errorMessages.email)
                    setUsernameError(errorMessages.username)
                }
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
                <h2>회원가입</h2>
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
                <p style={{color: '#ff4d4f'}}>
                    {emailError}
                </p>
                <Form.Item
                    label="닉네임"
                    name="username"
                    rules={[
                        { required: true, message: "닉네임을 입력해 주세요 :)" },
                        { min: 3, message: "최소 3글자를 입력해주세요 :)" },
                        { max: 10, message: "최대 10글자까지 입력할 수 있습니다 :)" }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <p style={{color: '#ff4d4f'}}>
                    {usernameError}
                </p>
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
                    Submit
                    </Button>
                </Form.Item>
                </Form>
              </Col>
          </Row>
        </>
    );
};

export default SignUp;
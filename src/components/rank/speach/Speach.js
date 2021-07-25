import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Card, Col, Row, Modal, Button, Comment, List, Input, Form, notification } from 'antd';
import { EditOutlined,UserOutlined, KeyOutlined, SmileOutlined } from '@ant-design/icons';
import { FcCollaboration } from "react-icons/fc";
import { axiosInstance } from '../../../api';
import '../speach/Speach.scss';




const Speach = ({uniq_num}) => {
    const { TextArea } = Input;

    const commentUrl = `/api/comment/${uniq_num}`;

    const [comment, setComment] = useState([])
    useEffect(() => {
      axiosInstance.get(commentUrl)
        .then(response => {
          const {data} = response;
          setComment(data);
        })
        .catch(error => {
          // console.log(error)
        })
    }, [])




    const [modalVisible, setModalVisible] = useState(false);

    const modal = (value) => {
      setModalVisible(value)
    } 

    const onFinish = (values) => {
      const {company, username, password, content} = values;
      const data = {company, username, password, content}

      axiosInstance.post("/api/comment/", data)
        .then(response => {
            notification.open({
              message: '작성 완료',
              icon: <SmileOutlined style={{color: '#108ee9'}}/>
            })

            modal(false)

            setComment([
              ...comment,
              response.data
            ])
        })
        .catch(error => {
          notification.open({
            message: '작성이 완료되지 않았습니다 :(',
            icon: <SmileOutlined style={{color: '#108ee9'}}/>
          })
        })

      
    };


    const [commentModal, setCommentModal] = useState(false)
    const [commentId, setCommentId] = useState(0)
    const handleRemove = (id) => {
      setCommentId(id)
      setCommentModal(true)
    }

    const checkPassword = (values) => {
      const {password} = values

      const deleteUrl = `/api/comment/delete/${commentId}`;
      axiosInstance.post(deleteUrl, values)
        .then(response => {

          setComment(comment.filter(comment => comment.id !== commentId))
          setCommentModal(false)

          notification.open({
            message: '댓글 삭제 완료',
            icon: <SmileOutlined style={{color: '#ff0000'}}/>
          })
        })
        .catch(error => {
          notification.open({
            message: '댓글 삭제가 되지 않았습니다 :(',
            icon: <SmileOutlined style={{color: '#ff0000'}}/>
          })
        })
    }

    return (
        <Row className="card_section">
            <Col xs={{span: 24}} sm={{ span: 14, offset: 5 }}>
                <Card 
                  title={
                    <span>
                        <div className='title_logo'><FcCollaboration/></div> 
                        <div className='title_content'>의견</div>
                    </span>
                  } 
                  style={{ width: "100%" }}
                >
                
                <Row className='replies_write'>
                  <Col span={12}>
                    {`${comment.length} replies`}
                  </Col>
                  <Col span={12}>
                    <Button size="small" type="primary" onClick={() => modal(true)}>
                      <EditOutlined/> 글쓰기
                    </Button>
                  </Col>
                </Row>
                
                <Modal
                  title="여러분들의 의견을 적어주세요 :)"
                  centered
                  visible={modalVisible}
                  onCancel={() => modal(false)}
                  width={1000}
                  okText={'게시'}
                  cancelText={'취소'}
                >
                  <Form onFinish={onFinish}>
                  <div>
                  <Row>
                    <Col xs={{span: 24}} sm={{ span: 11 }}>    
                    <Form.Item
                        name="company"
                        hidden={true}
                        initialValue={uniq_num}
                      >
                        <Input/>
                      </Form.Item>
                      <Form.Item
                        name="username"
                        rules={[
                          { required: true, message: '닉네임을 입력해주세요' },
                          { min: 3, message: '3글자 이상 입력해 주세요 :D' },
                          { max: 10, message: '최대 10글자까지 입력할 수 있어요 :D' }
                        ]}
                      >
                        <Input size="large" prefix={<UserOutlined/>} placeholder="* 닉네임(3글자-10글자)" maxLength={10}/>
                      </Form.Item>
                    
                    </Col>
                    <Col xs={{span: 24}} sm={{ span: 11, offset: 2 }}>
                      <Form.Item
                        name="password"
                        rules={[
                          { required: true, message: '비밀번호를 입력해 주세요 :D' },
                          { min: 4, message: '4자를 입력해 주세요 :D' },
                          { max: 4, message: '4자를 입력해 주세요 :D' }
                        ]}
                      >
                        <Input.Password size="large" prefix={<KeyOutlined/>} placeholder="* 비밀번호(4자리)" maxLength={4}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  </div>
                  <div>
                  <Form.Item
                        name="content"
                        
                        rules={[
                          { required: true, message: '내용을 입력해 주세요 :D' },
                          { min: 3, message: '3글자 이상 입력해 주세요 :D' },
                          { max: 500, message: '최대 500글자까지 입력할 수 있어요 :D' }
                        ]}
                  >
                    <TextArea  
                      placeholder="내용을 입력해주세요 :)"
                      autoSize={{ minRows: 6, maxRows: 10 }}
                      showCount maxLength={500} 
                    />
                  </Form.Item>  
                  </div>
                  <hr className="modal-hr"/>
                  <Form.Item className='post-button'>
                    <Button type="primary" htmlType="submit">
                      게시
                    </Button>
                  </Form.Item>

                  </Form>
                </Modal>
                <List
                  itemLayout="horizontal"
                  dataSource={comment}
                  renderItem={(comment) => (
                    <li id={comment.id}>
                      <Comment
                        actions={[<span onClick={() => handleRemove(comment.id)}>삭제</span>]}
                        author={comment.username}
                        avatar= 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                        content={comment.content}
                        datetime={
                          moment(comment.created_at.split('.')[0],  'YYYY.MM.DD.HH.mm.ss ').fromNow()
                        }
                      />


                    </li>
                  )}
                />

                <Modal
                  title="비밀번호(4자리)"
                  centered
                  visible={commentModal}
                  onOk={() => checkPassword}
                  onCancel={() => setCommentModal(false)}
                >
                  <Form
                  name="comment_delete"
                  initialValues={{ remember: true }}
                  onFinish={checkPassword}
                 >
                    <Form.Item
                      name="password"
                      rules={[
                          { required: true, message: '비밀번호를 입력해 주세요 :D' },
                          { min: 4, message: '4자를 입력해 주세요 :D' },
                          { max: 4, message: '4자를 입력해 주세요 :D' }
                      ]}
                    >
                      <Input.Password maxLength={4}/>
                    </Form.Item>

                    <Col xs={{span: 24}}>
                      <Form.Item className="post-button">
                        <Button type="danger" htmlType="submit">
                          삭제
                        </Button>
                      </Form.Item>
                    </Col>    
                  </Form>
                </Modal>

                </Card>
            </Col>
        </Row>
    );
};

export default Speach;
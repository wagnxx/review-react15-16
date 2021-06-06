import React, { useCallback } from 'react'

import { Row, Col, Divider, Form, Input, Tag, PageHeader } from 'antd';
import { PayCircleOutlined, LeftOutlined } from '@ant-design/icons'
import { useConversations } from '../../../../contexts/ConversationsProvider';

export default function OpenCoversation({onBack}) {

  const { sendMessage, selectedConversation } = useConversations();
  const setRef = useCallback(
    node => {
      if (node) {
        node.scrollIntoView({ smooth: true })
      }
    },
    [])

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      values.text);

    form.resetFields();


  };
  const handleOnSend = value => {
    console.log(value);
    console.log(form);
    form.validateFields().then(r => {
      form.submit();
    }).catch(err => {
      console.log('验证不过')
    })
  }

  return (
    <div className="conversation-window">
      {/* <div style={{border:'1px solid #ddd',padding:'2px',textAlign:'center'}}>

        <LeftOutlined />
        <span>23333</span>
      </div> */}

      <PageHeader
        className="site-page-header"
        onBack={() => onBack()}
        title={selectedConversation.recipients.map(r => r.name).join(', ')}
        style={{ border: '1px solid rgb(235, 237, 240)',borderTop:'none' }}

      />




      <div className="send-messagebox">

        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="text"
            rules={[{ required: true, message: 'Please input your id!' }]}
          >
            <Input.Search
              placeholder="input search text"
              allowClear
              enterButton="Send"
              size="large"
              onSearch={handleOnSend}
            />
          </Form.Item>
        </Form>

      </div>

      <div className="chat-box">

        <div className="chat-list">
          {
            selectedConversation.messages.map((message, index) => {
              const lastMessage = selectedConversation.messages.length - 1 === index;
              return (
                <Row
                  justify={message.fromMe ? 'end' : 'start'}
                  style={{ marginTop: '14px' }}
                  key={index}
                >
                  <Col >
                    <p ref={lastMessage ? setRef : null} className={message.fromMe ? "right" : "left"}> 
                      <span>{message.text}</span>
                    </p>
                    {
                      message.fromMe ? <Tag  color="gold">You</Tag> : <Tag color="success">{message.senderName}</Tag>
                    }
                  </Col>
                </Row>
              )
            })
          }

        </div>
      </div>

    </div>
  )
}

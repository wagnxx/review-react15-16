import React, { useState } from 'react'
import SiderBar from './siderBar'
import { useDashboardContext } from '../../../../contexts/dashboardContext';
import OpenCoversation from './OpenCoversation';
import { useConversations } from '../../../../contexts/ConversationsProvider';
import { Row, Col } from 'antd';
import { useWindowResized } from '../../../../contexts/WindowResizeContextProvider';

const layout = {
  sider: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
    lg: { span: 6 },
    xl: { span: 5 },
  },
  content: {
    xs: { span: 24 },
    sm: { span: 12, },
    md: { span: 14 },
    lg: { span: 18 },
    xl: { span: 19 },
  },
}

export default function SocketPage() {
  const [conversationOpened, setConversationOpened] = useState(false);
  const dashContext = useDashboardContext();
  const { selectedConversation } = useConversations();
  const { isPhoneClient } = useWindowResized();
  const onBack = () => {
    isPhoneClient && setConversationOpened(false)
  }
  const opendConversation = () => {
    isPhoneClient && setConversationOpened(true)
  }
  return (
    <div className="chat-page__">
      <Row
        justify="start"
        wrap={true}
      >
        {
          conversationOpened && isPhoneClient ? '' :
            <Col {...layout.sider}>
              <SiderBar opendConversation={opendConversation} id={dashContext.id} />
            </Col>
        }

        <Col xs={{ span: 24 }} sm={{ span: 0 }} style={{ margin: '10px 0' }}>

        </Col>

        {
          !conversationOpened && isPhoneClient ? '' :

            <Col {...layout.content}>
              {selectedConversation &&
                <OpenCoversation onBack={onBack} selectedConversation={selectedConversation} />
              }
            </Col>
        }

      </Row>
    </div>
  )
}
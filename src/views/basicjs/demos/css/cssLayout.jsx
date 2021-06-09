import React from 'react'
import './cssLayout.css'
export default function cssLayout() {
  return (
    <div className="dashboard">
      <div className="sider-bar">
        <div className="taps">
          <div className="taps__header">

            <div className="taps__item">Conversations</div>
            <div className="taps__item">Contacts</div>
          </div>
          <div className="taps__content">
            taps item content
          </div>
        </div>
      </div>

      <div className="chat-window">
        <div className='window-header'>
          <span className="goback"> Back </span>
          <div className='title'>headers</div>
          <div className="avator">avator</div>
        </div>
        <div className="chat-box">
          <div className="chat-list">
            <div className="chat-list__item">list
            <br />
              item</div>
            <div className="chat-list__item">list item</div>
            <div className="chat-list__item">list item</div>
            <div className="chat-list__item">list item</div>
            <div className="chat-list__item">list item</div>
          </div>
        </div>
        <div className="send-box">
          send box
        </div>
      </div>


    </div>
  )
}

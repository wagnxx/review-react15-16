## branch 简介

- master ,最初忘了分 branch，把 hooks，redux，hooks-redux 都放在这个部分了
- hooks-dva 主要是用 dva/umi 创建项目
- hooks-immutable-redux 主要是 immutableJS 的实战，简单几个例子
- hooks-mobx-lite mobx 实战
- hooks-practice ，webapck +　ＴＳ　＋　ｒｅａｃｔ项目实战　，以ｈｏｏｋｓ为主
- hook-whatsapp ,react + socket.io 完成聊天通信

### 该版本为 hook-whatsapp,目前的进展如下

1. 已实现的

- 联系人列表
- 会话列表
- 添加联系人
- 创建新聊天室
- 聊天消息 包含 text 和 Image

2. 待实现的(功能方面)

- 聊天室中新增邀请新的联系人为成员
- 联系人,查看详情(id,头像,NickName)
- 文件消息和 text 消息共用一个方法

- 删除会话(管理员)
- 会话移除成员
- 成员退出会话
- 修改群名称

- 通知
  - 消息提示
  - 上线离线点亮

3. 将来要实现(技术方面)

- 用户信息,联系人 转存 服务端 sqlite
- 文件类型消息继续存本地

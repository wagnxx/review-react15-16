import React from 'react'

// 高阶组件实战

function HOCFactoryFactory(...params){
    return function HOCFactor(WrappedComponent){
        return class HOC extends React.Component{
            render(){
                return <WrappedComponent {...this.props} />;
            }
        }
    }
}
//调用方式1
@HOCFactoryFactory({})
class WrappedComponent extends React.Component{}
// 调用方式2
HOCFactoryFactory({})(WrappedComponent);
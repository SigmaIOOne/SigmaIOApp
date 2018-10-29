/**
 * 发送验证码用
 * 调用如下：
 * 每隔1秒调用一次onTimer的回调事件
 * <Timer interval={1000} onTimer={this.onTimer}/>
 */
import React, { Component } from 'react';

export default class Timer extends Component {
    componentWillMount() {
        const {interval} = this.props;
        this.timer = setInterval(this.onEvent, interval);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.interval !== this.props.interval) {
            clearInterval(this.timer);
            this.timer = setInterval(this.onEvent, newProps.interval);
        }
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    onEvent = ev => {
        const { onTimer } = this.props;
        onTimer(ev);
    };
    render(){
        return this.props.children || null;
    }
}
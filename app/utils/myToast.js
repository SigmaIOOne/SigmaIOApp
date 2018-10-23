/**
 * 通用Toast弹窗处理
 * 父组件通过onRef回调的方法获得子组件的ref, 如下
 * <Toast onRef={toast => this.toast = toast}/>
 */
import React from 'react';
import Toast from 'react-native-easy-toast';
import {
    StyleSheet,
} from 'react-native';

import {scaleSize} from "./ScreenUtil";

export default class MyToast extends React.Component {
    componentDidMount() {
        const { onRef } = this.props;
        if (typeof onRef === 'function') onRef(this.toast);
    }
    render() {
        return (
            <Toast
                {...this.props}
                ref={toast => this.toast = toast}
                style={styles.toastStyle}
                position="center"
                textStyle={{color: '#4A90E2', fontSize: scaleSize(34)}}/>
        );
    }
}

const styles = StyleSheet.create({
    toastStyle: {
        backgroundColor: '#FFFFFF',
        borderRadius: scaleSize(8),
    }
});
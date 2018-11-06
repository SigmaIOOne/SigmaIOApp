/**
 * 通用Toast弹窗处理
 * 说明：
 * 1、之所以不用react-native-easy-toast，是因为在react-native-modalbox打开
 *    的情况下，toast的层级没有modal高，会被覆盖掉。
 * 2、为了防止父组件的modal里有input键盘输入，最好在父组件modal调用接口时，
 *    用Keyboard.dismiss()，先将键盘隐藏掉，这样可以防止toast位置的抖动。
 * 3、父组件通过onRef回调的方法获得子组件的this, 如下
 *   <Toast onRef={toast => this.toast = toast}/>
 *   通过this.toast.show('hello world')使用。
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Modal from 'react-native-modalbox';
import {scaleSize} from "./ScreenUtil";

export default class MyToast extends React.Component {
    static propTypes = {
        modalType: PropTypes.string,
        onRef: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            duration: 2500, // 模态框持续时间
            modalTxt: '',
        }
    }
    componentDidMount() {
        const { onRef } = this.props;
        if (typeof onRef === 'function') onRef(this);
    }
    // 模态框打开，过一段时间再消失
    show = (modalTxt) => {
        this.setState({modalTxt});
        this.toast.open();
        setTimeout(() => {
            this.toast.close();
        }, this.state.duration);
    }
    render() {
        // 默认toast蓝底白字
        const modalType = this.props.modalType || 'blue';
        return (
            <Modal
                {...this.props}
                ref={toast => this.toast = toast}
                style={styles.modal}
                position={'center'}
                coverScreen={true}
                backdropOpacity={0}
                animationDuration={0}
            >
                <View style={[styles.modalContent, modalType === 'blue' ? styles.modalContentBlue : styles.modalContentWhite]}>
                    <Text style={modalType === 'blue' ? styles.modalTxtWhite : styles.modalTxtBlue}>{this.state.modalTxt}</Text>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        height: scaleSize(70),
    },
    modalContent: {
        paddingTop: scaleSize(12),
        paddingBottom: scaleSize(12),
        paddingRight: scaleSize(40),
        paddingLeft: scaleSize(40),
        borderRadius: scaleSize(8),
    },
    modalContentBlue: {
        backgroundColor: '#4A90E2',
    },
    modalContentWhite: {
        backgroundColor: '#FFFFFF',
    },
    modalTxtBlue: {
        color: '#4A90E2',
        fontSize: scaleSize(34),
    },
    modalTxtWhite: {
        color: '#FFFFFF',
        fontSize: scaleSize(34),
    },
});
/**
 * 我的 -> 我的订单 -> 订单详情
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
// import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class OrderDetails extends Component {
    // 渲染每个订单模块里的每行
    _renderPerRow = (data) => {
        return (
            <View style={styles.perRow}>
                <Text style={styles.rowTxt}>{I18n.t(data.title)}</Text>
                <Text style={styles.rowTxt}>{data.value}</Text>
            </View>
        )
    }
    // 渲染弹窗文本
    _renderModalTxt = (data) => {
        return (
            <Text style={styles.modalTxt}>{I18n.t(data)}</Text>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.topTitle}>{I18n.t('my.orderDetails.insurance')}</Text>
                    <TouchableOpacity style={styles.topRightArea} onPress={() => this.myModal.open()}>
                        <Text style={styles.topRightTxt}>{I18n.t('my.applyCompensation')}</Text>
                    </TouchableOpacity>
                </View>
                {
                    // 保障金额
                    this._renderPerRow({
                        title: 'my.orderDetails.guaranteeAmount',
                        value: '20000SIGM',
                    })
                }
                <View style={styles.whiteSplit}></View>
                {
                    // 购买人
                    this._renderPerRow({
                        title: 'my.orderDetails.buyer',
                        value: '刘航',
                    })
                }
                {
                    // 身份证号码
                    this._renderPerRow({
                        title: 'my.orderDetails.id',
                        value: '110103198637482315',
                    })
                }
                {
                    // 邮箱
                    this._renderPerRow({
                        title: 'my.orderDetails.email',
                        value: 'liuhang@163.com',
                    })
                }
                {
                    // 保障期限
                    this._renderPerRow({
                        title: 'my.orderDetails.guaranteeDeadline',
                        value: '2018-07-13至2019-07-13',
                    })
                }
                {
                    // 手机号码
                    this._renderPerRow({
                        title: 'my.orderDetails.phone',
                        value: '18609763948',
                    })
                }
                {
                    // 订单金额
                    this._renderPerRow({
                        title: 'my.orderDetails.orderAmount',
                        value: '200 SIGM',
                    })
                }
                <View style={styles.lastItem}>
                    <Text style={styles.rowTxt}>{I18n.t('my.orderDetails.guaranteeAddress')}</Text>
                    <Text style={styles.rowTxt}>{'68TR510kh37c732MV449dd618es30Y11a00L88fgCx'}</Text>
                </View>
                {/* 理赔流程弹窗 */}
                <Modal
                    style={styles.modal}
                    position={'center'}
                    coverScreen={true}
                    ref={myModal => this.myModal = myModal}
                >
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTitleTxt}>{I18n.t('my.orderDetails.applyCompensationContent._title')}</Text>
                        <TouchableOpacity style={styles.closeBtnT} onPress={() => this.myModal.close()}>
                            <Image style={styles.closeBtnImg} source={require('../../assets/images/common/close.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.title1')}
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.text1_1')}
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.text1_2')}
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.title2')}
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.text2_1')}
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.text2_2')}
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.title3')}
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.text3')}
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.title4')}
                        {this._renderModalTxt('my.orderDetails.applyCompensationContent.text4')}
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height,
        paddingTop: scaleSize(40),
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(40),
        alignItems: 'center',
    },
    top: {
        width: scaleSize(666),
        alignItems: 'center',
        position: 'relative',
        marginBottom: scaleSize(32),
    },
    topTitle: {
        color: '#4A90E2',
        fontSize: scaleSize(36),
    },
    topRightArea: {
        position: 'absolute',
        top: scaleSize(6),
        right: 0,
    },
    topRightTxt: {
        color: '#F5A623',
        fontSize: scaleSize(28),
    },
    perRow: {
        width: scaleSize(666),
        height: scaleSize(74),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(16),
        paddingRight: scaleSize(16),
        backgroundColor: 'rgba(242, 242, 245, .55)'
    },
    rowTxt: {
        color: '#9B9B9B',
        fontSize: scaleSize(30),
    },
    whiteSplit: {
        // width: scaleSize(666),
        height: scaleSize(16),
        backgroundColor: '#FFFFFF',
    },
    lastItem: {
        width: scaleSize(666),
        marginTop: scaleSize(16),
        padding: scaleSize(16),
        backgroundColor: 'rgba(242, 242, 245, .55)'
    },
    modal: {
        width: scaleSize(670),
        height: scaleSize(1078),
        backgroundColor: '#FFFFFF',
        borderRadius: scaleSize(24),
        alignItems: 'center',
    },
    modalTitle: {
        flexDirection: 'row',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
        paddingBottom: scaleSize(26),
        width: scaleSize(670),
        paddingTop: scaleSize(26),
    },
    modalTitleTxt: {
        color: '#555555',
        fontSize: scaleSize(28),
        marginLeft: scaleSize(280),
    },
    closeBtnT: {
        width: scaleSize(44),
        height: scaleSize(44),
        marginLeft: scaleSize(206),
    },
    closeBtnImg: {
        width: scaleSize(32),
        height: scaleSize(32),
    },
    modalContent: {
        paddingTop: scaleSize(32),
        paddingRight: scaleSize(40),
        paddingLeft: scaleSize(40),
    },
    modalTxt: {
        color: '#555555',
        fontSize: scaleSize(28),
    }
});
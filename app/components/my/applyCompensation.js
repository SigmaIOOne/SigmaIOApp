/**
 * 我的 -> 申请理赔
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
// import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';


export default class ApplyCompensation extends Component {
    // 渲染每个订单模块
    _renderPerOrder = (data, index) => {
        return (
            <TouchableOpacity key={index} style={styles.order} onPress={() => this.myModal.open()}>
                { data.list.map(res => this._renderPerRow(res)) }
                <Text style={styles.orderSuccess}>{I18n.t('my.applyCompensationPart.type')}</Text>
            </TouchableOpacity>
        );
    }
    // 渲染每个订单模块里的每行
    _renderPerRow = (data) => {
        return (
            <View style={styles.perRow}>
                <Text style={styles.rowTitle}>{data.title}</Text>
                <Text style={styles.rowValue}>{data.value}</Text>
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
        const list = [];
        list.push(
            {
                id: '31434982743',
                list: [
                    { title: '订单号:', value: '31434982743'},
                    { title: '账户安全险:', value: '2018-07-12 16：02'},
                ]
            }
        );
        // const list = [];
        return (
            <ScrollView>
                <View style={styles.container}>
                    {
                        list.length
                            ? list.map((data, index) => this._renderPerOrder(data, index))
                            : <View style={styles.noRecordPage}>
                                <Image style={styles.noRecordImg} source={require('../../assets/images/my/no_record.png')}/>
                                <Text style={styles.noRecordTxt}>{I18n.t('my.noRecord')}</Text>
                            </View>
                    }
                    {/* 理赔流程弹窗 */}
                    <Modal
                        style={styles.modal}
                        position={'center'}
                        coverScreen={true}
                        ref={myModal => this.myModal = myModal}
                    >
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleTxt}>{I18n.t('my.applyCompensationContent._title')}</Text>
                            <TouchableOpacity style={styles.closeBtnT} onPress={() => this.myModal.close()}>
                                <Image style={styles.closeBtnImg} source={require('../../assets/images/common/close.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalContent}>
                            {this._renderModalTxt('my.applyCompensationContent.title1')}
                            {this._renderModalTxt('my.applyCompensationContent.text1_1')}
                            {this._renderModalTxt('my.applyCompensationContent.text1_2')}
                            {this._renderModalTxt('my.applyCompensationContent.title2')}
                            {this._renderModalTxt('my.applyCompensationContent.text2_1')}
                            {this._renderModalTxt('my.applyCompensationContent.text2_2')}
                            {this._renderModalTxt('my.applyCompensationContent.title3')}
                            {this._renderModalTxt('my.applyCompensationContent.text3')}
                            {this._renderModalTxt('my.applyCompensationContent.title4')}
                            {this._renderModalTxt('my.applyCompensationContent.text4')}
                        </View>
                    </Modal>
                </View>
            </ScrollView>
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
    noRecordPage: {
        alignItems: 'center',
    },
    noRecordImg: {
        width: scaleSize(120),
        height: scaleSize(160),
        marginBottom: scaleSize(20),
        marginTop: Dimensions.get('window').height / 2 - scaleSize(88) - scaleSize(220)
    },
    noRecordTxt: {
        color: '#E8E8E8',
        fontSize: scaleSize(28),
    },
    order: {
        width: scaleSize(666),
        height: scaleSize(252),
        alignItems: 'center',
        marginBottom: scaleSize(24),
        backgroundColor: 'rgba(242, 242, 245, .55)'
    },
    perRow: {
        width: scaleSize(666),
        height: scaleSize(74),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20),
    },
    rowTitle: {
        color: '#555555',
        fontSize: scaleSize(30),
    },
    rowValue: {
        color: '#9B9B9B',
        fontSize: scaleSize(30),
    },
    orderSuccess: {
        color: '#4A90E2',
        fontSize: scaleSize(36),
        marginTop: scaleSize(24),
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
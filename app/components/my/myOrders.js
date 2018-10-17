/**
 * 我的 -> 我的订单
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
// import { connect } from 'react-redux';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import OrderDetails from "./orderDetails";

export default class MyOrders extends Component {
    // 渲染每个订单模块
    _renderPerOrder = (data, index) => {
        return (
            <TouchableOpacity key={index} style={styles.order} onPress={() => this.props.navigation.navigate('OrderDetails')}>
                { data.list.map(res => this._renderPerRow(res)) }
                <Text style={styles.orderSuccess}>{I18n.t('my.paySuccess')}</Text>
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
            <View style={styles.container}>
                {
                    list.length
                        ? list.map((data, index) => this._renderPerOrder(data, index))
                        : <View style={styles.noRecordPage}>
                            <Image style={styles.noRecordImg} source={require('../../assets/images/my/no_record.png')}/>
                            <Text style={styles.noRecordTxt}>{I18n.t('my.noRecord')}</Text>
                        </View>
                }
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
    }
});
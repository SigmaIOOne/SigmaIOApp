//payCompleted
/**
 * 产品 -> 产品详情 -> 填写订单 -> 支付完成
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { Button } from 'react-native-elements';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class PayCompleted extends Component {
    render() {
        // payStatus: 0: 失败，1：成功
        // product: 0：账户安全险，1：航延宝，2：上下班降雨险
        const { payStatus, product } = this.props.navigation.state.params;
        const payStateList = ['payFail', 'paySuccess'];
        const productList = ['productInsurance', 'productNavigation', 'productRaining'];
        console.log('payStatus ', payStatus, typeof payStatus);
        return (
            <View style={styles.container}>
                <Image style={styles.iconImg} source={payStatus === 0 ? require('../../assets/images/product/pay_fail.png') : require('../../assets/images/product/pay_success.png')}/>
                <Text style={[styles.payStateTxt, payStatus === 0 ? styles.payStateTxtRed : styles.payStateTxtBlue]}>{I18n.t('product.productDetail.payCompleted.' + payStateList[payStatus])}</Text>
                <Text style={styles.payProductTitle}>{I18n.t('product.' + productList[product])}</Text>
                <View style={styles.btnsView}>
                    <Button
                        // 返回首页
                        title={I18n.t('product.productDetail.payCompleted.backToHome')}
                        titleStyle={{color: '#4A90E2', fontSize: scaleSize(32)}}
                        buttonStyle={styles.btnStyle}
                        onPress={() => {}}
                    />
                    {
                        payStatus === 0
                        ? <Button
                            // 重新支付
                            title={I18n.t('product.productDetail.payCompleted.repay')}
                            titleStyle={{color: '#4A90E2', fontSize: scaleSize(32)}}
                            buttonStyle={styles.btnStyle}
                            onPress={() => {}}/>
                        : <Button
                            // 查看详情
                            title={I18n.t('product.productDetail.payCompleted.showDetail')}
                            titleStyle={{color: '#4A90E2', fontSize: scaleSize(32)}}
                            buttonStyle={styles.btnStyle}
                            onPress={() => {}}/>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        minHeight: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF',
    },
    iconImg: {
        width: scaleSize(116),
        height: scaleSize(116),
        marginTop: scaleSize(60),
        marginBottom: scaleSize(24),
    },
    payStateTxt: {
        fontSize: scaleSize(30),
        marginBottom: scaleSize(8),
    },
    payStateTxtBlue: {
        color: '#4A90E2'
    },
    payStateTxtRed: {
        color: '#D0021B',
    },
    payProductTitle: {
        color: '#9B9B9B',
        fontSize: scaleSize(26),
        marginBottom: scaleSize(44),
    },
    btnsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: scaleSize(558),
    },
    btnStyle: {
        width: scaleSize(232),
        height: scaleSize(64),
        backgroundColor: '#FFFFFF',
        borderRadius: scaleSize(32),
        borderColor: '#4A90E2',
        borderWidth: scaleSize(2),
    }
});

/**
 * 产品
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';


import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

class Product extends Component {
    // 渲染保险产品
    _renderInsuranceProduct = (data, index) => {
        return (
            <TouchableOpacity style={styles.insuranceProduct} key={index} onPress={() => this.props.navigation.navigate('ProductDetail', {type: data.type})}>
                <Image style={styles.insuranceProductImg} source={data.img}/>
                <View style={styles.insuranceProductLeft}>
                    <Text style={styles.insuranceProductTitle}>{data.title}</Text>
                    <Text style={styles.insuranceProductNotes}>{data.notes}</Text>
                    <View style={styles.insuranceProductFooter}>
                        <Text style={styles.insuranceProductPrice}>{data.price}</Text>
                        <Text style={styles.insuranceProductUnit}>SIGM</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        // 产品显示排序：安全险，航空险，降雨
        const productList = [
            {
                title: '账户安全险',
                notes: '保障额度 20000SIGM',
                price: 200,
                img: require('../../assets/images/product/product_insurance.png'),
                type: 0,
            },
            {
                title: '航延宝',
                notes: '最高可获得 3000SIGM',
                price: 1000,
                img: require('../../assets/images/product/product_navigation.png'),
                type: 1,
            },
            {
                title: '上下班降雨险',
                notes: '保障额度 460SIGM/天',
                price: 920,
                img: require('../../assets/images/product/product_raining.png'),
                type: 2,
            },
        ];
        return (
            <ScrollView>
                <View style={styles.container}>
                    {/* 轮播图三张图片, 对应下面的保险的三个产品 */}
                    <View style={styles.bannerView}></View>
                    {/* 产品模块 */}
                    <View>
                        <View style={styles.sectionTitle}><Text style={styles.sectionTitleTxt}>{I18n.t('product.home.insuranceProduct')}</Text></View>
                        {
                            productList.map((data, index) => this._renderInsuranceProduct(data, index))
                        }
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default connect(
    state => ({
        wallet: state.wallet
    })
)(Product)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        minHeight: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF',
    },
    bannerView: {
        width: scaleSize(750),
        height: scaleSize(416),
        backgroundColor: '#abcdef',
        marginTop: scaleSize(40),
    },
    sectionTitle: {
        width: scaleSize(666),
        borderBottomColor: '#BEBEBE',
        borderBottomWidth: scaleSize(1),
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(20),
        marginBottom: scaleSize(20),
    },
    sectionTitleTxt: {
        color: '#555555',
        fontSize: scaleSize(32),
    },
    insuranceProduct: {
        width: scaleSize(666),
        height: scaleSize(242),
        backgroundColor: 'rgba(242, 242, 245, .55)',
        marginBottom: scaleSize(28),
        flexDirection: 'row',
        borderRadius: scaleSize(8),
    },
    insuranceProductImg: {
        width: scaleSize(230),
        height: scaleSize(242),
        marginRight: scaleSize(40),
    },
    insuranceProductLeft: {
        paddingTop: scaleSize(28),
    },
    insuranceProductTitle: {
        color: '#4A90E2',
        fontSize: scaleSize(32),
        marginBottom: scaleSize(16),
    },
    insuranceProductNotes: {
        color: '#B2B1B6',
        fontSize: scaleSize(28),
        marginBottom: scaleSize(50),
        width: scaleSize(376),
        overflow: 'hidden',
    },
    insuranceProductFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    insuranceProductPrice: {
        color: '#4A90E2',
        fontSize: scaleSize(32),
        marginRight: scaleSize(12),
    },
    insuranceProductUnit: {
        color: '#B2B1B6',
        fontSize: scaleSize(26),
    }
});
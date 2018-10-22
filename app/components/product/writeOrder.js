/**
 * 产品 -> 产品详情 -> 填写订单
 */
import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { Button, CheckBox, Input } from 'react-native-elements';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

class writeOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            walletAddress: '', // 钱包地址
            buyer: '', // 购买人姓名
            id: '', // 身份证号
            email: '', // 邮箱
            deadline: '', // 保障期限
            phone: '', // 手机号码
            flightData: '', // 航班日期
            flightDataId: '', // 航班号
            credentialsType: 0, // 证件类型, 0: 身份证，1：护照
            credentialsId: '', // 证件号码
            mnemonisAgree: false, // 条款那个对勾按钮
            showSelectView: false, // 是否显示证件类型下拉框
        };
    }

    // 根据产品类型，渲染不同的订单填写列表，0：安全险，1：航空险，2：降雨险
    _renderOrderList = (type) => {
        if (type === 0) return this._renderProductInsurance();
        else if (type === 1) return this._renderProductNavigation();
        else return this._renderProductRaining();
    }

    // 渲染安全险的订单填写列表
    _renderProductInsurance = () => {
        const { wallet_address } = this.props.wallet.walletInfo;
        console.log('wallet_address  ', this.props.wallet);
        const dataList = [
            {   title: 'buyer', inputPlaceholder: 'buyerPlaceholder', inputTarget: 'buyer', },
            {   title: 'id', inputPlaceholder: 'idPlaceholder', inputTarget: 'id', },
            {   title: 'email', inputPlaceholder: 'emailPlaceholder', inputTarget: 'email', },
            {   title: 'deadline', inputPlaceholder: 'deadlinePlaceholder1', inputTarget: 'deadline', },
            {   title: 'phone', inputPlaceholder: 'phonePlaceholder', inputTarget: 'phone', noBorderBottom: true },
        ];
        return (
            <View>
                <View style={styles.addressTopCard}>
                    <Text style={styles.addressTitle}>{I18n.t('product.productDetail.writeOrder.address')}</Text>
                    <Text style={styles.addressValue}>{wallet_address}</Text>
                </View>
                {
                    dataList.map((data, index) => this._renderPerInputRow(data, index))
                }
            </View>
        );
    }

    // 渲染航空险的订单填写列表
    _renderProductNavigation = () => {
        const dataList = [
            {   title: 'buyer', inputPlaceholder: 'buyerPlaceholder', inputTarget: 'buyer', },
            {   title: 'id', inputPlaceholder: 'idPlaceholder', inputTarget: 'id', },
            {   title: 'flightData', inputPlaceholder: 'flightDataPlaceholder', inputTarget: 'flightData', },
            {   title: 'flightDataId', inputPlaceholder: 'flightDataIdPlaceholder', inputTarget: 'flightDataId', },
            {   title: 'phone', inputPlaceholder: 'phonePlaceholder', inputTarget: 'phone', noBorderBottom: true },
        ];
        return (
            <View>
                {
                    dataList.map((data, index) => this._renderPerInputRow(data, index))
                }
            </View>
        );
    }

    // 渲染降雨险的订单填写列表
    _renderProductRaining = () => {
        const dataList = [
            {   title: 'buyer', inputPlaceholder: 'buyerPlaceholder', inputTarget: 'buyer', },
            {   title: 'credentialsType', rightView: this._renderSelectCredentialsBtn },
            {   title: 'id', inputPlaceholder: 'idPlaceholder', inputTarget: 'id', },
            {   title: 'flightData', inputPlaceholder: 'flightDataPlaceholder', inputTarget: 'flightData', },
            {   title: 'flightDataId', inputPlaceholder: 'flightDataIdPlaceholder', inputTarget: 'flightDataId', },
            {   title: 'phone', inputPlaceholder: 'phonePlaceholder', inputTarget: 'phone', noBorderBottom: true },
        ];
        const { showSelectView } = this.state;
        return (
            <View style={styles.positionRelative}>
                {
                    dataList.map((data, index) => this._renderPerInputRow(data, index))
                }
                {/* 证件类型下拉框 */}
                { showSelectView && this._renderSelectCredentials() }
            </View>
        );
    }

    // 证件类型按钮
    _renderSelectCredentialsBtn = () => {
        const { credentialsType, showSelectView } = this.state;
        const credentialsTypes = ['ID', 'passport'];
        return (
            <TouchableOpacity onPress={() => this.setState({showSelectView: !showSelectView})}>
                <View style={styles.credentialsView}>
                    <Text style={styles.selectCredentialsValue}>{I18n.t('product.productDetail.writeOrder.' + credentialsTypes[credentialsType])}</Text>
                    <Image style={styles.selectIcon} source={require('../../assets/images/product/down_arrow.png')}/>
                </View>
            </TouchableOpacity>
        )
    }

    // 证件类型下拉框
    _renderSelectCredentials = () => {
        const credentialsTypes = ['ID', 'passport'];
        return (
            <View style={styles.selectCredentialsView}>
                {
                    credentialsTypes.map((data, index) => this._renderSelectCredentialsItem(data, index))
                }
            </View>
        );
    }

    // 证件类型下拉框选项
    _renderSelectCredentialsItem = (type, index) => {
        return (
            <TouchableOpacity key={index} style={styles.selectCredentialsItemView} onPress={() => this._clickSelectCredentials(index)}>
                <Text style={styles.selectCredentialsItem}>{I18n.t('product.productDetail.writeOrder.' + type)}</Text>
            </TouchableOpacity>
        );
    }

    // 证件类型下拉框点击选择事件
    _clickSelectCredentials = (type) => {
        this.setState({
            credentialsType: type,
            showSelectView: false,
        });
    }

    // 渲染每行输入框
    _renderPerInputRow = (data, index) => {
        const inputValue = this.state[data.inputTarget];
        return (
            <View key={index} style={[styles.inputRow]}>
                <View style={[styles.inputRowContent, data.noBorderBottom ? styles.inputRowContentNoBorder : {}]}>
                    <Text style={styles.inputTitle}>{I18n.t('product.productDetail.writeOrder.' + data.title)}</Text>
                    {
                        data.rightView
                            ? data.rightView()
                            : <View style={styles.inputOutView}>
                                <Input
                                    placeholder={I18n.t('product.productDetail.writeOrder.' + data.inputPlaceholder)}
                                    placeholderTextColor="rgba(190, 190, 190, .8)"
                                    inputContainerStyle={[styles.inputContainerStyle]}
                                    inputStyle={styles.inputStyle}
                                    value={inputValue}
                                    onChangeText={(newValue) => { this.setState({[data.inputTarget]: newValue})}}
                                />
                            </View>
                    }
                </View>
            </View>
        );
    }

    render() {
        const { type } = this.props.navigation.state.params;
        const { mnemonisAgree } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.tips}>{I18n.t('product.productDetail.writeOrder.tips' + type)}</Text>
                    {/* 订单填写列表区 */}
                    { this._renderOrderList(type) }
                    <View style={styles.isAgree_flex}>
                        <CheckBox
                            title=" "
                            iconType="material"
                            checkedIcon="check-circle"
                            uncheckedIcon="check-circle"
                            checkedColor="#4A90E2"
                            checked={mnemonisAgree}
                            containerStyle={styles.checkBox}
                            onPress={() => {
                                this.setState({ mnemonisAgree: !mnemonisAgree });
                            }}
                        />
                        <Text style={styles.color_999}>
                            {I18n.t('wallet.iAgreeTerm')}
                            {/* 我已阅读并同意 */}
                            <Text
                                style={styles.color_aff}
                                onPress={() => this.props.navigation.navigate('ServerPolicies')}
                            >
                                {I18n.t('public.serverPolicies')}
                                {/* 《服务条款》 */}
                            </Text>
                        </Text>
                    </View>
                    <Button
                        // 确定
                        title={I18n.t('public.OK')}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                        buttonStyle={styles.checkBtnStyle}
                        onPress={() => {}}
                    />
                </View>
            </ScrollView>

        );
    }
}

export default connect(
    state => ({
        wallet: state.wallet
    })
)(writeOrder)

const styles = StyleSheet.create({
    positionRelative: {
        position: 'relative'
    },
    container: {
        alignItems: 'center',
    },
    tips: {
        width: scaleSize(750),
        color: '#4A90E2',
        fontSize: scaleSize(24),
        marginLeft: scaleSize(42),
        marginTop: scaleSize(20),
        marginBottom: scaleSize(20),
    },
    inputRow: {
        width: scaleSize(750),
        // height: scaleSize(90),
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    inputRowContent: {
        width: scaleSize(670),
        height: scaleSize(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#4A90E2',
        borderBottomWidth: scaleSize(2),
    },
    inputRowContentNoBorder: {
        borderBottomWidth: 0,
    },
    inputTitle: {
        color: '#4A4A4A',
        fontSize: scaleSize(30),
        paddingLeft: scaleSize(17),
    },
    inputOutView: {
        width: scaleSize(470),
        overflow: 'hidden',
    },
    inputStyle: {
        color: 'rgba(190, 190, 190, .8)',
        fontSize: scaleSize(30),
        textAlign: 'right',
    },
    inputContainerStyle: {
        maxWidth: scaleSize(470),
        height: scaleSize(30),
        borderBottomWidth: 0,
    },
    addressTopCard: {
        width: scaleSize(750),
        // height: scaleSize(170),
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginBottom: scaleSize(40),
    },
    addressTitle: {
        width: scaleSize(670),
        height: scaleSize(78),
        lineHeight: scaleSize(76),
        color: '#4A4A4A',
        fontSize: scaleSize(30),
        borderBottomColor: '#4A90E2',
        borderBottomWidth: scaleSize(2),
        marginLeft: scaleSize(17),
        marginBottom: scaleSize(17),
    },
    addressValue: {
        width: scaleSize(670),
        color: '#9B9B9B',
        fontSize: scaleSize(26),
        paddingLeft: scaleSize(17),
        paddingRight: scaleSize(17),
        marginBottom: scaleSize(24),
    },
    credentialsView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: scaleSize(88),
    },
    selectCredentialsValue: {
        color: '#9B9B9B',
        fontSize: scaleSize(30),
        marginRight: scaleSize(20),
    },
    selectIcon: {
        width: scaleSize(28),
        height: scaleSize(28),
    },
    selectCredentialsView: {
        position: 'absolute',
        top: scaleSize(180),
        left: scaleSize(40),
        width: scaleSize(670),
        backgroundColor: '#FFFFFF',
        borderTopWidth: scaleSize(1),
        borderTopColor: '#BEBEBE',
        borderLeftWidth: scaleSize(1),
        borderLeftColor: '#BEBEBE',
        borderRightWidth: scaleSize(1),
        borderRightColor: '#BEBEBE',
    },
    selectCredentialsItemView: {
        width: scaleSize(670),
        height: scaleSize(70),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
    },
    selectCredentialsItem: {
        color: '#9B9B9B',
        fontSize: scaleSize(30),
        marginRight: scaleSize(32),
    },
    checkBtnStyle: {
        width: scaleSize(654),
        height: scaleSize(88),
        backgroundColor: '#4A90E2',
        borderRadius: scaleSize(44),
        marginTop: scaleSize(354),
        marginBottom: scaleSize(94),
    },
    isAgree_flex: {
        width: scaleSize(750),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: scaleSize(56),
        marginTop: scaleSize(24),
    },
    checkBox: {
        padding: 0,
        marginLeft: 0,
        width: scaleSize(46),
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    color_999: {
        color: '#424559',
        // width: screen.width - 50
    },
    color_aff: {
        color: '#5077BC',
    }
});

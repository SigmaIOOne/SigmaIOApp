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
import Toast from '../../utils/myToast';
import { scaleSize } from '../../utils/ScreenUtil';
import { checkPhone, checkEmail, checkIDNumber, checkDate } from '../../utils/valiServices';
import { buyProduct } from '../../api/product';

class WriteOrder extends Component {
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
            modalTitle: '', // 弹窗标题
            modalImg: '', // 内容图片
            btnDisabled: false, // 用来防止多次提交订单
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
        // const { wallet_address } = this.props.wallet.walletInfo;
        const dataList = [
            {   title: 'buyer', inputPlaceholder: 'buyerPlaceholder', inputTarget: 'buyer', },
            {   title: 'id', inputPlaceholder: 'idPlaceholder', inputTarget: 'id', },
            {   title: 'email', inputPlaceholder: 'emailPlaceholder', inputTarget: 'email', },
            {   title: 'deadline', rightView: () => <Text style={styles.rightViewText}>{I18n.t('product.productDetail.writeOrder.deadlinePlaceholder1')}</Text>},
            {   title: 'phone', inputPlaceholder: 'phonePlaceholder', inputTarget: 'phone', noBorderBottom: true },
        ];
        return (
            <View>
                {/* 钱包地址先不要了 */}
                {/*<View style={styles.addressTopCard}>*/}
                    {/*<Text style={styles.addressTitle}>{I18n.t('product.productDetail.writeOrder.address')}</Text>*/}
                    {/*<Text style={styles.addressValue}>{wallet_address}</Text>*/}
                {/*</View>*/}
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
            // {   title: 'credentialsType', rightView: this._renderSelectCredentialsBtn },
            {   title: 'credentialsType', rightView: () => <Text style={styles.rightViewText}>{I18n.t('product.productDetail.writeOrder.ID')}</Text> },
            {   title: 'id', inputPlaceholder: 'idPlaceholder', inputTarget: 'id', },
            {   title: 'email', inputPlaceholder: 'emailPlaceholder', inputTarget: 'email', },
            {   title: 'deadline', rightView: () => <Text style={styles.rightViewText}>{I18n.t('product.productDetail.writeOrder.deadlinePlaceholder2')}</Text> },
            {   title: 'phone', inputPlaceholder: 'phonePlaceholder', inputTarget: 'phone', noBorderBottom: true },
        ];
        // const { showSelectView } = this.state;
        return (
            <View style={styles.positionRelative}>
                {
                    dataList.map((data, index) => this._renderPerInputRow(data, index))
                }
                {/* 证件类型不让用户选，所以不要了 */}
                {/* 证件类型下拉框 */}
                {/*{ showSelectView && this._renderSelectCredentials() }*/}
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

    // 打开弹窗
    _openModal = (title, imgName) => {
        this.setState({
            modalTitle: title,
            modalImg: imgName
        });
        this.myModal.open();
    };

    // 确定所填写的订单
    _checkOrder = async () => {
        try {
            const { type } = this.props.navigation.state.params;
            await this.setState({btnDisabled: true}); // 防止多次提交
            // 0：安全险，1：航空险，2：降雨险
            // 安全险
            if (type === 0) {
                const {buyer, id, email, phone, mnemonisAgree} = this.state;
                if (!buyer || !id || !email || !phone) await Promise.reject(I18n.t('error.orderNotFill')); // 您当前的信息未填写完全
                else if (!mnemonisAgree) await Promise.reject(I18n.t('error.pleaseSelectAgree')); // 未勾选我同意
                else {
                    await checkIDNumber(id); // 验证身份证号
                    await checkEmail(email); // 验证邮箱
                    await checkPhone(phone); // 验证手机号码
                    let result = await buyProduct({
                        type: 1, // 后端：购买类别 1.账户安全 2.航延宝 3.天⽓险
                        name: buyer,
                        numberid: id,
                        email,
                        phone,
                    });
                    result = result.data;
                    result.status == 200 ? this.props.navigation.navigate('PayCompleted', {id: result.data.id, product: 0}) : await Promise.reject(result.msg);
                }
            } else if (type === 1) {
                const {buyer, id, flightData, flightDataId, phone, mnemonisAgree} = this.state;
                if (!buyer || !id || !flightData || !flightDataId || !phone) await Promise.reject(I18n.t('error.orderNotFill')); // 您当前的信息未填写完全
                else if (!mnemonisAgree) await Promise.reject(I18n.t('error.pleaseSelectAgree')); // 未勾选我同意
                else {
                    await checkIDNumber(id); // 验证身份证号
                    await checkDate(flightData); // 验证用户输入的日期
                    await checkPhone(phone); // 验证手机号码
                    let result = await buyProduct({
                        type: 2, // 后端：购买类别 1.账户安全 2.航延宝 3.天⽓险
                        name: buyer,
                        numberid: id,
                        flightdate: flightData,
                        flightnumber: flightDataId,
                        phone,
                    });
                    result = result.data;
                    result.status == 200 ? this.props.navigation.navigate('PayCompleted', {id: result.data.id, product: 1}) : await Promise.reject(result.msg);
                }
            } else {
                // 证件类型不用传，因为一定是身份证，后端说的，现在是证件类型都不给用户选
                const {buyer, id, email, phone, mnemonisAgree} = this.state;
                if (!buyer || !id || !email || !phone) await Promise.reject(I18n.t('error.orderNotFill')); // 您当前的信息未填写完全
                else if (!mnemonisAgree) await Promise.reject(I18n.t('error.pleaseSelectAgree')); // 未勾选我同意
                else {
                    await checkIDNumber(id); // 验证身份证号
                    await checkEmail(email); // 验证邮箱
                    await checkPhone(phone); // 验证手机号码
                    const { month } = this.props.navigation.state.params; // 用户在产品详情页选择的月份
                    let result = await buyProduct({
                        type: 3, // 后端：购买类别 1.账户安全 2.航延宝 3.天⽓险
                        name: buyer,
                        numberid: id,
                        email,
                        phone,
                        month,
                    });
                    result = result.data;
                    result.status == 200 ? this.props.navigation.navigate('PayCompleted', {id: result.data.id, product: 2}) : await Promise.reject(result.msg);
                }
            }
        }
        catch (err) {
            this.setState({btnDisabled: false});
            this.toast.show(err);
        }
    }

    // 渲染订单下面我同意部分
    _renderIAgree = () => {
        const { type } = this.props.navigation.state.params;
        const { mnemonisAgree } = this.state;
        return (
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
                    {/* 我同意 */}
                    {I18n.t('product.productDetail.writeOrder.IAgree')}
                </Text>
                {
                    type === 0 &&
                    <View style={styles.notes}>
                        <Text style={styles.color_aff} onPress={() => this._openModal('guaranteeItems', 'insurance_guarantee_items')}>
                            《{I18n.t('product.productDetail.writeOrder.guaranteeItems')}》
                        </Text>
                        {/* 《保障条款》 */}
                        <Text style={styles.color_999}>和</Text>
                        <Text style={styles.color_aff} onPress={() => this._openModal('insureShouldKnow', 'insurance_insure_should_know')}>
                            《{I18n.t('product.productDetail.writeOrder.insureShouldKnow')}》
                        </Text>
                        {/* 《投保须知》 */}
                    </View>
                }
                {
                    type === 1 &&
                    <View style={styles.notes}>
                        <Text style={styles.color_aff} onPress={() => this._openModal('buyShouldKnow', 'navigation_buy_should_know')}>
                            《{I18n.t('product.productDetail.writeOrder.buyShouldKnow')}》
                        </Text>
                        {/* 《购买须知》 */}
                        <Text style={styles.color_999}>和</Text>
                        <Text style={styles.color_aff} onPress={() => this._openModal('productItems', 'navigation_product_items')}>
                            《{I18n.t('product.productDetail.writeOrder.productItems')}》
                        </Text>
                        {/* 《产品条款》 */}
                    </View>
                }
                {
                    type === 2 &&
                    <View style={styles.notes}>
                        <Text style={styles.color_aff} onPress={() => this._openModal('buyShouldKnow', 'raining_buy_should_know')}>
                            《{I18n.t('product.productDetail.writeOrder.buyShouldKnow')}》
                        </Text>
                        {/* 《购买须知》 */}
                        <Text style={styles.color_999}>和</Text>
                        <Text style={styles.color_aff} onPress={() => this._openModal('productItems', 'raining_product_items')}>
                            《{I18n.t('product.productDetail.writeOrder.productItems')}》
                        </Text>
                        {/* 《产品条款》 */}
                    </View>
                }
            </View>
        );
    }
    render() {
        const { type } = this.props.navigation.state.params;
        const { modalTitle, modalImg, btnDisabled } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.tips}>{I18n.t('product.productDetail.writeOrder.tips' + type)}</Text>
                    {/* 订单填写列表区 */}
                    { this._renderOrderList(type) }
                    {/* 订单下面我同意部分 */}
                    { this._renderIAgree() }
                    {/* 确定按钮 */}
                    <Button
                        title={I18n.t('public.OK')}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                        buttonStyle={styles.checkBtnStyle}
                        onPress={() => this._checkOrder()}
                        disabled={btnDisabled}
                    />
                </View>
                <Modal
                    style={styles.modal}
                    position={'center'}
                    coverScreen={true}
                    ref={myModal => this.myModal = myModal}
                    swipeArea={20} // 为了让scrollView能正常滚动
                >
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTitleTxt}>{I18n.t('product.productDetail.writeOrder.' + modalTitle)}</Text>
                        <TouchableOpacity style={styles.closeBtnT} onPress={() => this.myModal.close()}>
                            <Image style={styles.closeBtnImg} source={require('../../assets/images/common/close.png')} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View>
                            {
                                modalImg === 'insurance_guarantee_items' && <Image style={[styles.modalContentImg, {height: scaleSize(6022)}]} source={require('../../assets/images/product/insurance_guarantee_items.png')}/>
                            }
                            {
                                modalImg === 'insurance_insure_should_know' && <Image style={[styles.modalContentImg, {height: scaleSize(564)}]} source={require('../../assets/images/product/insurance_insure_should_know.png')}/>
                            }
                            {
                                modalImg === 'navigation_buy_should_know' && <Image style={[styles.modalContentImg, {height: scaleSize(1216)}]} source={require('../../assets/images/product/navigation_buy_should_know.png')}/>
                            }
                            {
                                modalImg === 'navigation_product_items' && <Image style={[styles.modalContentImg, {height: scaleSize(4082)}]} source={require('../../assets/images/product/navigation_product_items.png')}/>
                            }
                            {
                                modalImg === 'raining_buy_should_know' && <Image style={[styles.modalContentImg, {height: scaleSize(608)}]} source={require('../../assets/images/product/raining_buy_should_know.png')}/>
                            }
                            {
                                modalImg === 'raining_product_items' && <Image style={[styles.modalContentImg, {height: scaleSize(4894)}]} source={require('../../assets/images/product/raining_product_items.png')}/>
                            }
                        </View>
                    </ScrollView>
                </Modal>
                {/* 点击发生网络未连接或者别的报错状况 */}
                <Toast onRef={toast => this.toast = toast}/>
            </ScrollView>
        );
    }
}

export default connect(
    state => ({
        wallet: state.wallet
    })
)(WriteOrder)

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
    rightViewText: {
        color: '#9B9B9B',
        fontSize: scaleSize(30),
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
        width: scaleSize(490),
        overflow: 'hidden',
        alignItems: 'flex-end',
    },
    inputStyle: {
        color: 'rgba(190, 190, 190, .8)',
        fontSize: scaleSize(30),
        textAlign: 'right',
    },
    inputContainerStyle: {
        maxWidth: scaleSize(490),
        height: scaleSize(40),
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
    },
    notes: {
        flexDirection: 'row',
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
    modalContentImg: {
        width: scaleSize(670),
        marginTop: scaleSize(32),
    }
});

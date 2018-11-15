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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import {getOrderdetails} from '../../api/product';
import Toast from '../../utils/myToast';
import Spinner from '../../utils/mySpinner';
import NoNetworkPage from '../public/noNetworkPage';

class OrderDetails extends Component {
    static propTypes = {
        netInfo: PropTypes.object,
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            product: '', // 0：账户安全险，1：航延宝，2：上下班降雨险
            productDetail: {}, // 存放原始订单详情数据
        };
    }
    componentDidMount() {
        this._init();
    }
    componentWillReceiveProps(nextProps) {
        if (!this.state.isLoaded && !nextProps.netInfo.isConnected) this.setState({isLoaded: true});
    }
    // 页面初始化和刷新用
    _init = () => {
        this._getOrderdetails();
    }
    // 获取订单详情
    _getOrderdetails = async () => {
        try {
            const { id } = this.props.navigation.state.params;
            let result = await getOrderdetails(id);
            result = result.data;
            if (result.status == 200) {
                // this.props.setAllOrder(result.data);
                const productType = ['账户安全', '航空宝', '降雨宝'];
                result = result.data[0];
                const type = productType.indexOf(result.type);
                this.setState({
                    product: type,
                    productDetail: result,
                    isLoaded: true,
                });
            } else {
                await Promise.reject(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    // 渲染每个订单模块里的每行
    _renderPerRow = (data, index) => {
        return (
            <View style={styles.perRow} key={index}>
                {
                    data.left
                    ? data.left
                    : <Text style={styles.rowTxt}>{I18n.t(data.title)}</Text>
                }
                <Text style={data.valueStyle ? styles[data.valueStyle] : styles.rowTxt}>{data.value}</Text>
            </View>
        )
    }
    // 渲染弹窗文本
    _renderModalTxt = (data) => {
        return (
            <Text style={styles.modalTxt}>{I18n.t(data)}</Text>
        )
    }
    // 渲染账户安全险的订单详情
    _renderProductInsuranceOrder = () => {
        const productDetail = this.state.productDetail;
        const floor2List = [
            // 购买人
            {
                title: 'my.orderDetails.buyer',
                value: productDetail.name,
            },
            // 身份证号码
            {
                title: 'my.orderDetails.id',
                value: productDetail.numberid,
            },
            // 邮箱
            {
                title: 'my.orderDetails.email',
                value: productDetail.email,
            },
            // 保障期限
            {
                title: 'my.orderDetails.guaranteeDeadline',
                value: productDetail.add_time.substr(0, 10) + '至' + productDetail.end_time.substr(0, 10),
            },
            // 手机号码
            {
                title: 'my.orderDetails.phone',
                value: productDetail.phone,
            },
            // 订单金额
            {
                title: 'my.orderDetails.orderAmount',
                value: productDetail.money + 'SIGM',
            },
        ];
        return (
            <View>
                {
                    // 保障金额
                    this._renderPerRow({
                        title: 'my.orderDetails.guaranteeAmount',
                        value: productDetail.amountguarantee + 'SIGM',
                    })
                }
                <View style={styles.whiteSplit}></View>
                {
                    floor2List.map((data, index) => this._renderPerRow(data, index))
                }
                {/* 保障地址不要了 */}
                {/*<View style={styles.lastItem}>*/}
                    {/*<Text style={styles.rowTxt}>{I18n.t('my.orderDetails.guaranteeAddress')}</Text>*/}
                    {/*<Text style={styles.rowTxt}>{'68TR510kh37c732MV449dd618es30Y11a00L88fgCx'}</Text>*/}
                {/*</View>*/}
            </View>
        );
    }
    // 渲染航空险的订单详情
    _renderProductNavigationOrder = () => {
        const productDetail = this.state.productDetail;
        const floor2List = [
            {
                // 航班
                title: 'my.orderDetails.flight',
                value: productDetail.flightnumber,
            },
            // {
            //     // 北京首都
            //     title: productDetail.city,
            //     value: productDetail.province,
            // },
            {
                // 计划起飞时间
                title: 'my.orderDetails.flightStartDate',
                value: productDetail.flightdate,
            },
            {
                // 身份证号码
                title: 'my.orderDetails.id',
                value: productDetail.numberid,
            },
            {
                // 手机号码
                title: 'my.orderDetails.phone',
                value: productDetail.phone,
            },
            {
                // 购买人
                title: 'my.orderDetails.buyer',
                value: productDetail.name,
            },
        ];
        return (
            <View>
                {
                    // 最高保障金额
                    this._renderPerRow({
                        title: 'my.orderDetails.guaranteeAmountMax',
                        value: productDetail.amountguarantee + 'SIGM',
                    })
                }
                <View style={styles.whiteSplit}></View>
                {
                    floor2List.map((data, index) => this._renderPerRow(data, index))
                }
                <View style={styles.whiteSplit}></View>
                {
                    // 订单金额
                    this._renderPerRow({
                        title: 'my.orderDetails.orderAmount',
                        value: productDetail.money + 'SIGM',
                    })
                }
            </View>
        );
    }
    // 渲染降雨险的订单详情
    _renderProductRaining = () => {
        const productDetail = this.state.productDetail;
        const floor2List = [
            {
                // 保障城市
                title: 'my.orderDetails.guaranteeCity',
                value: productDetail.city,
            },
            {
                // 保障月份
                title: 'my.orderDetails.guaranteeMonth',
                // value: productDetail.add_time.substr(0, 10) + '至' + productDetail.end_time.substr(0, 10),
                value: productDetail.add_month.substr(0, 6)
            },
            {
                // 理赔阈值
                title: 'my.orderDetails.threshold',
                value: '中雨1小时累计降水量>2.5mm',
            },
            {
                // 身份证号码
                title: 'my.orderDetails.id',
                value: productDetail.numberid,
            },
            {
                // 手机号码
                title: 'my.orderDetails.phone',
                value: productDetail.phone,
            },
            {
                // 购买人
                title: 'my.orderDetails.buyer',
                value: productDetail.name,
            },
        ];
        return (
            <View>
                {
                    // 最高保障金额
                    this._renderPerRow({
                        title: 'my.orderDetails.guaranteeAmountMax',
                        value: productDetail.amountguarantee + 'SIGM',
                    })
                }
                <View style={styles.whiteSplit}></View>
                {
                    floor2List.map((data, index) => this._renderPerRow(data, index))
                }
                <View style={styles.whiteSplit}></View>
                {
                    // 订单金额
                    this._renderPerRow({
                        title: 'my.orderDetails.orderAmount',
                        value: productDetail.money + 'SIGM',
                    })
                }
            </View>
        );
    }
    render() {
        // 0：账户安全险，1：航延宝，2：上下班降雨险
        const { product, isLoaded } = this.state;
        const { netInfo } = this.props;
        const isConnected = netInfo.isConnected;
        const productList = ['productInsurance', 'productNavigation', 'productRaining'];
        return (
            <View>
                {
                    isLoaded
                    ? <View>
                        {
                            isConnected
                            ? <View style={styles.container}>
                                    <View style={styles.top}>
                                        <Text style={styles.topTitle}>{I18n.t('product.' + productList[product])}</Text>
                                        <TouchableOpacity style={styles.topRightArea} onPress={() => this.myModal.open()}>
                                            <Text style={styles.topRightTxt}>{I18n.t('my.applyCompensation')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        product === 0 && this._renderProductInsuranceOrder()
                                    }
                                    {
                                        product === 1 && this._renderProductNavigationOrder()
                                    }
                                    {
                                        product === 2 && this._renderProductRaining()
                                    }
                                    {/* 理赔流程弹窗 */}
                                    <Modal
                                        style={styles.modal}
                                        position={'center'}
                                        coverScreen={true}
                                        ref={myModal => this.myModal = myModal}
                                        swipeArea={20}
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
                            : <NoNetworkPage tryAgainFunc={this._init}/>
                        }
                    </View>
                    : <Spinner/>
                }
                {/* 点击发生网络未连接或者别的报错状况 */}
                <Toast onRef={toast => this.toast = toast}/>
            </View>
        );
    }
}

export default connect(
    state => ({
        netInfo: state.netInfo,
    })
)(OrderDetails)

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
    blueValueTxt: {
        color: '#4A90E2',
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
    },
});
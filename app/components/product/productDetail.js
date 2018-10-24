/**
 * 产品 -> 产品详情
 */
import React, { Component } from 'react';
import {
    Image,
    Picker,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Container,
    Footer,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-elements';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import ProductDetailTable from '../public/productDetailTable';
import monthSelector from '../public/monthSelector';

export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 安全险
            tableData0: {
                columnsWidth: [
                    // scaleSize(312),
                    scaleSize(311),
                    // scaleSize(184),
                    scaleSize(183),
                    // scaleSize(170),
                    scaleSize(169),
                ],
                data: [
                    ['保障内容', '保障期限', '保障额度'],
                    ['保障内容', '保障期限', '保障额度'],
                    ['保障内容', '保障期限', '保障额度'],
                    ['SigmaIO平台账户安全', '365天', '20000SIGM'],
                    ['SigmaIO平台账户安全', '365天', '20000SIGM'],
                    ['SigmaIO平台账户安全', '365天', '20000SIGM'],
                ]
            },
            // 航延保
            tableData1: {
                columnsWidth: [
                    scaleSize(195),
                    scaleSize(273),
                    scaleSize(195),
                ],
                data: [
                    ['范围', '期限', '年龄'],
                    ['国内', '单次飞行', '18-80岁'],
                    ['国内', '单次飞行', '18-80岁'],
                ]
            },
            // 降雨险
            tableData2: {
                columnsWidth: [
                    scaleSize(169),
                    scaleSize(495),
                ],
                data: [
                    ['保障内容', '上下班降雨费用损失'],
                    ['保障期限', '一个月'],
                    ['投保年龄', '20-60周岁'],
                    ['保障额度', '每份：460 SIGM/天，最多赔付14,260 SIGM'],
                    ['保障范围', '针对直辖市、省会城市被保险人通勤途中，由于降雨影响导致费用损失等给予保险金额内的赔付。'],
                    ['理赔标准', '一个月'],
                ]
            },
            // 份数
            buyNum: 0,
            yearMonthSelectList: [], // 降雨险的时候存放可以选择的年月
            // showSelectView: false, // 是否显示月份选择下拉框
            selectedYearMonthValue: '', // 选择的年月
        };
    }

    componentWillMount() {
        this._init();
    }
    _init = () => {
        const yearMonthSelectList = monthSelector();
        console.log('yearMonthSelectList ', yearMonthSelectList);
        this.setState({
            yearMonthSelectList,
            selectedYearMonthValue: yearMonthSelectList[0],
        });
    }
    // 渲染安全险 -> 保障详情
    _renderProductInsuranceDetails = () => {
        return (
            <View style={[styles.details, styles.productInsuranceDetails]}>
                <View style={[styles.detailsTop, styles.marginBottom24]}>
                    <Text style={styles.detailsTopLeft}>{I18n.t('product.productDetail.productInsuranceDetails._title')}</Text>
                    <Text style={styles.detailsTopRight}>{I18n.t('product.productDetail.productInsuranceDetails.note')}</Text>
                </View>
                <Text style={[styles.detailsContentTxt, styles.marginBottom24]}>{I18n.t('product.productDetail.productInsuranceDetails.content1')}</Text>
                <Text style={[styles.detailsContentTxt]}>{I18n.t('product.productDetail.productInsuranceDetails.content2')}</Text>
            </View>
        );
    }
    // 渲染航延宝 -> 保障详情
    _renderProductNavigationDetails = () => {
        return (
            <View style={[styles.details, styles.productInsuranceDetails]}>
                <View style={[styles.detailsTop, styles.marginBottom24]}>
                    <Text style={styles.detailsTopLeft}>{I18n.t('product.productDetail.productNavigationDetails._title')}</Text>
                </View>
                <View style={[styles.productNavigationDetailsRow, styles.marginBottom24]}>
                    <Text style={[styles.detailsContentTxt2]}>{I18n.t('product.productDetail.productNavigationDetails.content1')}</Text>
                    <Text style={[styles.detailsContentTxt2]}>3000 SIGM</Text>
                </View>
                <View style={[styles.productNavigationDetailsRow, styles.marginBottom8]}>
                    <Text style={[styles.detailsContentTxt3]}>{I18n.t('product.productDetail.productNavigationDetails.content2')}</Text>
                    <Text style={[styles.detailsContentTxt3]}>500 SIGM</Text>
                </View>
                <View style={[styles.productNavigationDetailsRow, styles.marginBottom8]}>
                    <Text style={[styles.detailsContentTxt3]}>{I18n.t('product.productDetail.productNavigationDetails.content3')}</Text>
                    <Text style={[styles.detailsContentTxt3]}>2500 SIGM</Text>
                </View>
            </View>
        );
    }
    // 渲染降雨险选择列表
    _renderProductRaining = () => {
        const list = [
            {
                // 选择省份
                title: 'chooseProvince', right: this._renderProvinceSelector,
            },
            {
                // 选择城市
                title: 'chooseCity', right: this._renderCitySelector,
            },
            {
                // 保障月份
                title: 'guaranteeMonth', right: this._renderMonthSelector,
            },
            {
                // 保障金额
                title: 'guaranteeMoney', value: '920 SIGM/天',
            },
            {
                // 赔付阈值
                title: 'threshold', value: '中雨1小时累计降水量>2.5mm',
            },
            {
                // 购买份数
                title: 'buyNum',  right: this._renderBuyNumSelector, noBorderBottom: true,
            },
        ];
        return (
            <View style={[styles.details, styles.marginBottom42]}>
                {
                    list.map((data, index) => this._renderProductRainingItem(data, index))
                }
                {/* 月份下拉框 */}
                {/*{*/}
                    {/*showSelectView && !!yearMonthSelectList.length &&*/}
                        {/*<View style={{maxHeight: scaleSize(420), position: 'absolute', top: scaleSize(270), left: 0}}>*/}
                            {/*<ScrollView>*/}
                                {/*<View style={styles.monthSelectorListView}>*/}
                                    {/*{*/}
                                        {/*yearMonthSelectList.map((data, index) => this._renderSelectMonthListItem(data, index))*/}
                                    {/*}*/}
                                {/*</View>*/}
                            {/*</ScrollView>*/}
                        {/*</View>*/}
                {/*}*/}
            </View>
        )
    }
    // 渲染降雨险选择列表选项
    _renderProductRainingItem = (data, index) => {
        return (
            <View key={index} style={[styles.productRainingListRow, data.noBorderBottom ? {} : styles.borderBottom]}>
                <Text style={styles.detailsContentTxt30}>{I18n.t('product.productDetail.productRainingList.' + data.title)}</Text>
                {
                    data.right
                    ? data.right()
                    : <Text style={styles.detailsContentTxt30}>{data.value}</Text>
                }
            </View>
        )
    }
    // 渲染省份选择器
    _renderProvinceSelector = () => {
        // 暂时先不用做选择器
        return (
            <Text style={styles.detailsContentTxt30}>北京市</Text>
        );
    }
    // 渲染城市选择器
    _renderCitySelector = () => {
        // 暂时先不用做选择器
        return (
            <Text style={styles.detailsContentTxt30}>北京市</Text>
        );
    }
    // 渲染月份选择器
    _renderMonthSelector = () => {
        const { selectedYearMonthValue, yearMonthSelectList } = this.state;
        // return (
        //     <TouchableOpacity onPress={() => this.setState({showSelectView: !showSelectView})}>
        //         <View style={styles.monthSelectorView}>
        //             <Text style={styles.selectMonthItem}>{selectedYearMonthValue}</Text>
        //             <Image style={styles.selectIcon} source={require('../../assets/images/product/down_arrow.png')}/>
        //         </View>
        //     </TouchableOpacity>
        // );
        return (
            <View style={{marginRight: scaleSize(-24)}}>
                {/* 月份下拉框 */}
                <Picker
                    selectedValue={selectedYearMonthValue}
                    onValueChange={(selectedYearMonthValue) => this.setState({selectedYearMonthValue})}
                    style={{
                        width: scaleSize(245),
                        color: '#9B9B9B',
                        fontSize: scaleSize(30),
                        paddingRight: 0,
                        marginRight: 0,
                    }}
                >
                    {
                        yearMonthSelectList.map((data, index) =>
                            <Picker.Item
                                key={index}
                                label={data}
                                value={data}
                            />)
                    }
                </Picker>
            </View>
        );
    }
    // 渲染月份下拉框Item
    // _renderSelectMonthListItem = (data, index) => {
    //     return (
    //         <TouchableOpacity key={index} style={styles.monthSelectorListItem} onPress={() => this._clickSelectItem(data)}>
    //             <Text style={styles.selectMonthItem}>{data}</Text>
    //         </TouchableOpacity>
    //     );
    // }
    // 点击选择的年月
    // _clickSelectItem = (data) => {
    //     this.setState({
    //         selectedYearMonthValue: data,
    //         showSelectView: false,
    //     });
    // }
    // 渲染份数数量选择器
    _renderBuyNumSelector = () => {
        const { buyNum } = this.state;
        return (
            <View style={styles.rainingNumRight}>
                <TouchableOpacity onPress={() => this._handleBuyNum('minus')}>
                    <Image style={styles.rainingNumBtn} source={require('../../assets/images/product/minus.png')} />
                </TouchableOpacity>
                <Text style={styles.buyNum}>{buyNum}</Text>
                <TouchableOpacity onPress={() => this._handleBuyNum('plus')}>
                    <Image style={styles.rainingNumBtn} source={require('../../assets/images/product/plus.png')} />
                </TouchableOpacity>
            </View>
        );
    }
    // 购买份数操作
    _handleBuyNum = (type) => {
        let { buyNum } = this.state;
        if (type === 'minus') {
            if (buyNum <= 0) return;
            else this.setState({buyNum: --buyNum});
        } else {
            this.setState({buyNum: ++buyNum});
        }
    }
    // 立即购买
    _buyProduct = () => {
        const { type } = this.props.navigation.state.params;
        console.log('type   ', type);
        this.props.navigation.navigate('WriteOrder', {type})
    }
    render() {
        const tips = [
            // 安全险
            'productInsuranceTips',
            // 航延宝
            'productNavigationTips',
            // 降雨险
            'productRainingTips',
        ];
        const { type } = this.props.navigation.state.params;
        const { yearMonthSelectList, showSelectView } = this.state;
        console.log('type ', type, typeof type);
        return (
            <Container>
                <KeyboardAwareScrollView>
                    <View style={styles.main}>
                        <Image style={styles.productImg} source={require('../../assets/images/product/product_detail_img.png')}/>
                        {
                            type === 2
                                ? <View>
                                    <Text style={styles.tips}>{I18n.t('product.productDetail.' + tips[type])}</Text>
                                    <ProductDetailTable tableData={this.state['tableData' + type]}/>
                                    { this._renderProductRaining() }
                                </View>
                                : <View style={styles.rowCenter}>
                                    <ProductDetailTable tableData={this.state['tableData' + type]}/>
                                    <Text style={styles.tips}>{I18n.t('product.productDetail.' + tips[type])}</Text>
                                    {
                                        type === 0
                                            ? this._renderProductInsuranceDetails()
                                            : this._renderProductNavigationDetails()
                                    }
                                </View>
                        }
                    </View>
                </KeyboardAwareScrollView>
                <Footer style={styles.footer}>
                    <View style={styles.footerLeft}>
                        <Text style={styles.footerLeftValue}>200</Text>
                        <Text style={styles.footerLeftUnit}>SIGM</Text>
                    </View>
                    <Button
                        title={I18n.t('product.productDetail.buyBtn')}
                        // "立即购买"
                        buttonStyle={styles.buyBtnStyle}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(30)}}
                        onPress={() => this._buyProduct()}
                    />
                </Footer>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    rowCenter: {
        alignItems: 'center',
    },
    main: {
        width: scaleSize(750),
        paddingTop: scaleSize(42),
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    productImg: {
        width: scaleSize(666),
        height: scaleSize(346),
        marginBottom: scaleSize(40),
    },
    tips: {
        width: scaleSize(666),
        color: '#4A90E2',
        fontSize: scaleSize(24),
        marginTop: scaleSize(20),
        marginBottom: scaleSize(20),
    },
    details: {
        position: 'relative',
        width: scaleSize(666),
        backgroundColor: 'rgba(242, 242, 245, .55)',
        borderRadius: scaleSize(8),
        marginTop: scaleSize(32),
    },
    detailsTop: {
        width: scaleSize(666),
        height: scaleSize(36),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    productInsuranceDetails: {
        padding: scaleSize(24),
    },
    detailsTopLeft: {
        color: '#4A90E2',
        fontSize: scaleSize(36),
    },
    detailsTopRight: {
        color: '#4A90E2',
        fontSize: scaleSize(26),
        marginRight: scaleSize(48),
    },
    detailsContentTxt: {
        color: '#9B9B9B',
        fontSize: scaleSize(24),
    },
    detailsContentTxt2: {
        color: '#9B9B9B',
        fontSize: scaleSize(32),
    },
    detailsContentTxt3: {
        color: '#9B9B9B',
        fontSize: scaleSize(26),
    },
    detailsContentTxt30: {
        color: '#9B9B9B',
        fontSize: scaleSize(30),
    },
    productNavigationDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    productRainingListRow: {
        width: scaleSize(666),
        height: scaleSize(90),
        paddingLeft: scaleSize(24),
        paddingRight: scaleSize(24),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    rainingNumRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rainingNumBtn: {
        width: scaleSize(30),
        height: scaleSize(30),
    },
    buyNum: {
        color: '#4A90E2',
        fontSize: scaleSize(30),
        marginRight: scaleSize(14),
        marginLeft: scaleSize(14),
    },
    borderBottom: {
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: scaleSize(1),
    },
    marginBottom24: {
        marginBottom: scaleSize(24),
    },
    marginBottom42: {
        marginBottom: scaleSize(42),
    },
    marginBottom8: {
        marginBottom: scaleSize(8),
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(56),
        paddingRight: scaleSize(48),
        backgroundColor: '#FFFFFF',
    },
    footerLeft: {
        flexDirection: 'row',
    },
    footerLeftValue: {
        color: '#4A90E2',
        fontSize: scaleSize(36),
        marginRight: scaleSize(15),
    },
    footerLeftUnit: {
        color: '#9091A3',
        fontSize: scaleSize(36),
    },
    buyBtnStyle: {
        width: scaleSize(234),
        height: scaleSize(66),
        borderRadius: scaleSize(33),
        backgroundColor: '#4A90E2',
    },
    // 月份选择器用
    monthSelectorView: {
        width: scaleSize(250),
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'flex-end',
        height: scaleSize(90),
    },
    selectMonthItem: {
        color: '#9B9B9B',
        fontSize: scaleSize(30),
    },
    selectIcon: {
        width: scaleSize(28),
        height: scaleSize(28),
    },
    monthSelectorListView: {
        width: scaleSize(666),
        // maxHeight: scaleSize(420),
        backgroundColor: '#FFFFFF',
        borderTopWidth: scaleSize(1),
        borderTopColor: '#BEBEBE',
        borderLeftWidth: scaleSize(1),
        borderLeftColor: '#BEBEBE',
        borderRightWidth: scaleSize(1),
        borderRightColor: '#BEBEBE',
    },
    monthSelectorListItem: {
        width: scaleSize(666),
        height: scaleSize(70),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
    }
});
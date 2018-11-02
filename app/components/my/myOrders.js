/**
 * 我的 -> 我的订单
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import { getAllOrder } from '../../api/product';
import { setAllOrder } from '../../store/reducers/data';
import Toast from '../../utils/myToast';
import Spinner from '../../utils/mySpinner';
import NoNetworkPage from '../public/noNetworkPage';

class MyOrders extends Component {
    static propTypes = {
        data: PropTypes.object,
        netInfo: PropTypes.object,
        setAllOrder: PropTypes.func,
    }
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        };
    }
    componentDidMount() {
        // 不用willMount是防止那个toast还没有被渲染出来，然后需要有报错提示
        this._init();
    }
    componentWillReceiveProps(nextProps) {
        // 没网情况下要把加载中停止掉
        if (!this.state.isLoaded && !nextProps.netInfo.isConnected) this.setState({isLoaded: true});
    }
    // 页面初始化和刷新用
    _init = () => {
        this._getAllOrder();
    }
    // 获取全部订单，我的订单和申请理赔都用这个接口，后端说的
    _getAllOrder = async () => {
        try {
            let result = await getAllOrder();
            result = result.data;
            console.log('all ', result);
            if (result.status == 200) {
                this.props.setAllOrder(result.data);
                this.setState({
                    isLoaded: true,
                });
            } else {
                this.toast.show(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    // 渲染每个订单模块
    _renderPerOrder = (data, index) => {
        return (
            <TouchableOpacity key={index} style={styles.order} onPress={() => this.props.navigation.navigate('OrderDetails', {id: data.id})}>
                { data.list.map((res, rowIndex) => this._renderPerRow(res, rowIndex)) }
                <Text style={styles.orderSuccess}>{I18n.t('my.paySuccess')}</Text>
            </TouchableOpacity>
        );
    }
    // 渲染每个订单模块里的每行
    _renderPerRow = (data, index) => {
        return (
            <View style={styles.perRow} key={index}>
                <Text style={styles.rowTitle}>{data.title}</Text>
                <Text style={styles.rowValue}>{data.value}</Text>
            </View>
        )
    }
    render() {
        // const list = new Array(20).fill({
        //     id: '31434982743',
        //     list: [
        //         { title: '订单号:', value: '31434982743'},
        //         { title: '账户安全险:', value: '2018-07-12 16：02'},
        //     ]
        // });
        // list.push(
        //     {
        //         id: '31434982743',
        //         list: [
        //             { title: '订单号21:', value: '31434982743'},
        //             { title: '账户安全险:', value: '2018-07-12 16：02'},
        //         ]
        //     },
        //     {
        //         id: '31434982743',
        //         list: [
        //             { title: '订单号22:', value: '31434982743'},
        //             { title: '账户安全险:', value: '2018-07-12 16：02'},
        //         ]
        //     },
        // );
        // const list = [];
        const { netInfo, data } = this.props;
        const { isLoaded } = this.state;
        const isConnected = netInfo.isConnected;
        const { allOrder, hasAllOrderCache } = data;
        const list = allOrder.map(res => ({
            id: res.id, // 订单id
            list: [
                { title: '订单号:', value: res.nmber },
                { title: res.type, value: res.time },
            ]
        }));
        return (
            <View>
                {
                    isLoaded
                    ? <View>
                        {
                            (isConnected || (!isConnected && hasAllOrderCache)) // 有网 或者 没网但是有缓存
                            ? <View>
                                {
                                    list.length
                                        ? <ScrollView>
                                            <View style={styles.container}>
                                                {
                                                    list.map((data, index) => this._renderPerOrder(data, index))
                                                }
                                            </View>
                                        </ScrollView>
                                        : <View style={styles.noRecordPage}>
                                            <Image style={styles.noRecordImg} source={require('../../assets/images/my/no_record.png')}/>
                                            <Text style={styles.noRecordTxt}>{I18n.t('my.noRecord')}</Text>
                                        </View>
                                }
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
        data: state.data,
    }),{
        setAllOrder,
    }
)(MyOrders)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        minHeight: Dimensions.get('window').height - StatusBar.currentHeight,
        paddingTop: scaleSize(40),
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(40),
        alignItems: 'center',
    },
    noRecordPage: {
        width: scaleSize(750),
        height: Dimensions.get('window').height - StatusBar.currentHeight,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
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
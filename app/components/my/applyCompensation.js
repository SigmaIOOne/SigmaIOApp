/**
 * 我的 -> 申请理赔
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
import Modal from 'react-native-modalbox';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import { getAllOrder } from '../../api/product';
import { setAllOrder } from '../../store/reducers/data';
import Toast from '../../utils/myToast';
import Spinner from '../../utils/mySpinner';
import NoNetworkPage from '../public/noNetworkPage';

class ApplyCompensation extends Component {
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
            if (result.status == 200) {
                this.props.setAllOrder(result.data);
                this.setState({
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
    // 渲染每个订单模块
    _renderPerOrder = (data, index) => {
        return (
            <TouchableOpacity key={index} style={styles.order} onPress={() => this.myModal.open()}>
                { data.list.map((res, rowIndex) => this._renderPerRow(res, rowIndex)) }
                <Text style={styles.orderSuccess}>{I18n.t('my.applyCompensationPart.type')}</Text>
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
    // 渲染弹窗文本
    _renderModalTxt = (data) => {
        return (
            <Text style={styles.modalTxt}>{I18n.t(data)}</Text>
        )
    }
    render() {
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
)(ApplyCompensation)

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
/**
 * SIGM -> 总资产 -> 账户详情 -> 交易记录
 */
import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { scaleSize } from '../../utils/ScreenUtil';
import {I18n} from "../../../language/i18n";
import {getTransactionRecord} from '../../api/sigm';
import {setTransactionRecord} from '../../store/reducers/data';
import Toast from '../../utils/myToast';
import NoNetworkPage from '../public/noNetworkPage';

class TransactionRecord extends React.Component {
    static propTypes = {
        data: PropTypes.object,
        netInfo: PropTypes.object,
        setTransactionRecord: PropTypes.func,
    }
    componentDidMount() {
        this._init();
    }
    // 页面初始化和刷新用
    _init = () => {
        this._getTransactionRecord();
    }
    // 获取交易记录
    _getTransactionRecord = async () => {
        try {
            let result = await getTransactionRecord();
            result = result.data;
            console.log('record ', result);
            if (result.status == 200) {
                this.props.setTransactionRecord(result.data);
            } else {
                this.toast.show(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    _renderListItem = (data, index) => {
        return (
            <View key={index} style={styles.perRecordItem}>
                <View style={styles.perItemFloor1}>
                    <Text style={styles.floor1LeftTxt}>{data.title.toString()}</Text>
                    <View style={styles.flexRow}>
                        <Text style={styles.floor1RightTxt}>{data.money}</Text>
                        <Text style={styles.floor1RightTxt}>SIGM</Text>
                    </View>
                </View>
                <Text style={styles.dateTxt}>{data.time}</Text>
            </View>
        );
    }
    render() {
        console.log('data ', this.props.data);
        const { transactionRecord, hasTransactionRecord } = this.props.data;
        const isConnected = this.props.netInfo.isConnected;
        return (
            <View>
                {
                    (isConnected || (!isConnected && hasTransactionRecord)) // 有网 或者 没网但是有缓存
                    ? <View style={styles.container}>
                            {
                                transactionRecord.length
                                    ? transactionRecord.map((data, index) => this._renderListItem(data, index))
                                    : <View style={styles.noRecordPage}>
                                        <Image style={styles.noRecordImg} source={require('../../assets/images/sigm/no_record.png')}/>
                                        <Text style={styles.noRecordTxt}>{I18n.t('sigm.accountDetail.transactionRecordPart.noRecord')}</Text>
                                    </View>
                            }
                        </View>
                    : <NoNetworkPage tryAgainFunc={this._init}/>
                }
                {/* 网络未连接或者别的报错状况 */}
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
        setTransactionRecord,
    }
)(TransactionRecord)

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    container: {
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height,
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
    perRecordItem: {
        width: scaleSize(670),
        // height: scaleSize(110),
        borderTopWidth: scaleSize(1),
        borderTopColor: 'rgba(155, 155, 155, 0.4)',
        paddingTop: scaleSize(16),
        paddingBottom: scaleSize(16),
        // paddingRight: scaleSize(38),
        // paddingLeft: scaleSize(38),
    },
    perItemFloor1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    floor1LeftTxt: {
        color: '#4A4A4A',
        fontSize: scaleSize(28),
        maxWidth: scaleSize(400),
    },
    floor1RightTxt: {
        color: '#D0021B',
        fontSize: scaleSize(28),
    },
    dateTxt: {
        color: '#9B9B9B',
        fontSize: scaleSize(24),
    }
});

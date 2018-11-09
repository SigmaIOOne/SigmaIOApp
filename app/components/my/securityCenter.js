/**
 * 我的 -> 安全中心
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import { getDeposit } from '../../api/sigm';
import Toast from '../../utils/myToast';
import NoNetworkPage from '../public/noNetworkPage';
import { changeSecurityState } from '../../store/reducers/data';

class SecurityCenter extends Component {
    static propTypes = {
        changeSecurityState: PropTypes.func,
        netInfo: PropTypes.object,
        securityCenterData: PropTypes.object,
    }

    componentDidMount() {
        this._init();
    }

    // 初始化和刷新用
    _init = () => {
        this._getPageData();
    }

    // 获取页面数据信息
    _getPageData = async () => {
        try {
            let result = await getDeposit();
            result = result.data;
            console.log('res ', result);
            if (result.status == 200) {
                this.props.changeSecurityState('hasCertificated', !!result.data.numberid);
            }else await Promise.reject(result.msg);
        }
        catch (err) {
            this.toast.show(err);
        }
    }

    _renderItem = (data, index) => {
        return (
            <TouchableOpacity key={index} disabled={!data.hasPressFunc} onPress={() => { data.pressFunc() }} style={styles.item}>
                <Text style={styles.itemTitle}>{I18n.t(data.title)}</Text>
                <View style={styles.itemRight}>
                    <Text style={data.hasPressFunc ? styles.itemTxtRed : styles.itemTxtGray}>{I18n.t(data.txt)}</Text>
                    <Image style={styles.rightArrow} source={require('../../assets/images/my/right_arrow.png')}/>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { netInfo, securityCenterData } = this.props;
        console.log('netInfo ', netInfo);
        const isConnected = netInfo.isConnected;
        console.log('data ', securityCenterData);
        const { bindPhone, hasCertificated } = securityCenterData;
        const list = [
            {
                // 绑定手机
                title: 'my.securityPart.bindPhone',
                txt: bindPhone ? 'my.securityPart.bindTxt2' : 'my.securityPart.bindTxt1',
                hasPressFunc: !bindPhone,
                pressFunc: () => bindPhone ? {} : this.props.navigation.navigate('BindPhone'),
            },
            {
                // 认证身份
                title: 'my.securityPart.certificate',
                txt: hasCertificated ? 'my.securityPart.certificateTxt2' : 'my.securityPart.certificateTxt1',
                hasPressFunc: !hasCertificated,
                pressFunc: () => this.props.navigation.navigate('Certificate'),
            }
        ];
        return (
            <View>
                {
                    isConnected
                    ? <View style={styles.container}>
                        {
                            list.map((data, index) => this._renderItem(data, index))
                        }
                    </View>
                    : <NoNetworkPage tryAgainFunc={this._init}/>
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
        securityCenterData: state.data.securityCenterData
    }), {
        changeSecurityState
    }
)(SecurityCenter)

const styles = StyleSheet.create({
    container: {
        marginTop: scaleSize(40),
    },
    item: {
        width: scaleSize(750),
        height: scaleSize(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(32),
        backgroundColor: '#FFFFFF',
    },
    itemTitle: {
        color: 'rgba(85, 85, 85, .8)',
        fontSize: scaleSize(30),
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightArrow: {
        width: scaleSize(28),
        height: scaleSize(28),
        marginLeft: scaleSize(18),
    },
    itemTxtGray: {
        color: '#9B9B9B',
        fontSize: scaleSize(30),
    },
    itemTxtRed: {
        color: '#D0021B',
        fontSize: scaleSize(30),
    }
});

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import Toast from '../../utils/myToast';
import { logout } from '../../api/login';
import { changeLoginState, setUserInfo } from '../../store/reducers/login';
import { setTransactionRecord, setAllOrder } from '../../store/reducers/data';

class My extends Component {
    static propTypes = {
        changeLoginState: PropTypes.func,
        login: PropTypes.object,
        netInfo: PropTypes.object,
        setAllOrder: PropTypes.func,
        setTransactionRecord: PropTypes.func,
        setUserInfo: PropTypes.func,
    }
    componentDidUpdate() {
        // 网络未连接
        // 不能用isConnected来判断，因为如果之前是没网，现在还是没网，就不会渲染，
        // toast也就不会触发
        const {netInfo} = this.props;
        if (netInfo.noNetworkClickNum) {
            this.toast.show(netInfo.errMsg);
        }
    }
    _renderSelectItem = (data) => {
	    return (
            <TouchableOpacity
                onPress={() => data.pressFunc()}
            >
                <View style={[styles.item, data.hasNoBorder ? {} : styles.itemBorderTop]}>
                    <View style={styles.itemLeft}>
                        <Image style={styles.itemIcon} source={data.icon}/>
                        <Text style={styles.itemTitle}>{I18n.t(data.title)}</Text>
                    </View>
                    <Image style={styles.rightArrow} source={require('../../assets/images/my/right_arrow.png')} />
                </View>
            </TouchableOpacity>
        );
    }
    // 退出登录
    _logout = async () => {
        let result = await logout();
        result = result.data;
        console.log('logout ', result);
        if (result.status == 200) {
            this.props.changeLoginState(false);
            this.props.setUserInfo({});
            this.props.setAllOrder([], false);
            this.props.setTransactionRecord([], false);
            storage.remove({
                key: 'login'
            });
        } else {
            this.toast.show(result.msg);
        }
    }
	render() {
        const { login, userInfo } = this.props.login;
        const phone = login ? userInfo.account : '';
        const formatPhone = login && phone ? phone.replace(phone.slice(3, 7), '****') : '';
		return (
			<View style={ login ? styles.container : {}}>
                {
                    login
                    ? <View>
                            <View style={styles.top}>
                                <View style={styles.topLeft}>
                                    <Image style={styles.topIcon} source={require('../../assets/images/my/user.png')}/>
                                    <Text style={styles.topTxt}>{formatPhone}</Text>
                                </View>
                                <TouchableOpacity onPress={() => this._logout()}>
                                    <Text style={styles.topTxt}>{I18n.t('my.logout')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.graySplitLine}></View>
                            {/* 消息中心 */}
                            {
                                this._renderSelectItem({
                                    icon: require('../../assets/images/my/message.png'),
                                    title: 'my.message',
                                    pressFunc: () => this.props.navigation.navigate('MessageCenter'),
                                    hasNoBorder: true,
                                })
                            }
                            <View style={styles.graySplitLine}></View>
                            {/* 我的订单 */}
                            {
                                this._renderSelectItem({
                                    icon: require('../../assets/images/my/order.png'),
                                    title: 'my.order',
                                    pressFunc: () => this.props.navigation.navigate('MyOrders'),
                                    hasNoBorder: true,
                                })
                            }
                            {/* 申请理赔 */}
                            {
                                this._renderSelectItem({
                                    icon: require('../../assets/images/my/apply.png'),
                                    title: 'my.applyCompensation',
                                    pressFunc: () => this.props.navigation.navigate('ApplyCompensation')
                                })
                            }
                            {/* 数据上传记录 */}
                            {
                                this._renderSelectItem({
                                    icon: require('../../assets/images/my/upload.png'),
                                    title: 'my.uploadRecord',
                                    pressFunc: () => this.props.navigation.navigate('UploadRecord')
                                })
                            }
                            {/* 安全中心 */}
                            {
                                this._renderSelectItem({
                                    icon: require('../../assets/images/my/security.png'),
                                    title: 'my.security',
                                    pressFunc: () => this.props.navigation.navigate('SecurityCenter')
                                })
                            }
                            {/* 关于我们 */}
                            {
                                this._renderSelectItem({
                                    icon: require('../../assets/images/my/about.png'),
                                    title: 'my.aboutUs',
                                    pressFunc: () => this.props.navigation.navigate('AboutUs')
                                })
                            }
                            {/* 意见反馈 */}
                            {
                                this._renderSelectItem({
                                    icon: require('../../assets/images/my/suggest.png'),
                                    title: 'my.suggest',
                                    pressFunc: () => this.props.navigation.navigate('Suggest')
                                })
                            }
                    </View>
                    : <TouchableOpacity style={styles.top} onPress={() => this.props.navigation.navigate('Login', {origin: 'My'})}>
                        <View style={styles.topLeft}>
                            <Image style={styles.topIcon} source={require('../../assets/images/my/user.png')}/>
                            <Text style={styles.topTxt}>{I18n.t('my.login')}</Text>
                        </View>
                    </TouchableOpacity>
                }
                <Toast onRef={toast => this.toast = toast}/>
			</View>
		);
	}
}

// export default withNavigation(My);
export default connect(
    state => ({
        login: state.login,
        netInfo: state.netInfo,
    }), {
        changeLoginState,
        setAllOrder,
        setTransactionRecord,
        setUserInfo,
    }
)(My)

const styles = StyleSheet.create({
	container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF',
    },
    graySplitLine: {
	    height: scaleSize(20),
        backgroundColor: '#F2F2F5',
    },
    top: {
	    height: scaleSize(200),
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(32),
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topLeft: {
	    flexDirection: 'row',
    },
    topIcon: {
        width: scaleSize(80),
        height: scaleSize(80),
        marginTop: scaleSize(60),
        marginRight: scaleSize(20),
    },
    topTxt: {
        color: '#555555',
        fontSize: scaleSize(32),
        marginTop: scaleSize(78),
    },
    item: {
	    flexDirection: 'row',
        height: scaleSize(96),
        justifyContent: 'space-between',
        alignItems: 'center',
	    paddingLeft: scaleSize(32),
	    paddingRight: scaleSize(24),
    },
    itemBorderTop: {
        borderTopWidth: scaleSize(1),
        borderTopColor: '#C5C5C5',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemIcon: {
        width: scaleSize(36),
        height: scaleSize(36),
        // marginTop: scaleSize(30),
        marginRight: scaleSize(28),
        // marginBottom: scaleSize(30),
    },
    itemTitle: {
	    color: '#4A4A4A',
        fontSize: scaleSize(32),
        // marginTop: scaleSize(32),
        // marginBottom: scaleSize(32),
    },
    rightArrow: {
        width: scaleSize(28),
        height: scaleSize(28),
        // marginTop: scaleSize(34),
        // marginBottom: scaleSize(34),
    }
});

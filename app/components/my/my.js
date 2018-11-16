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
import NoNetworkPage from '../public/noNetworkPage';
import {getLoginMsg, logout} from '../../api/login';
import { changeLoginState, setUserInfo } from '../../store/reducers/login';
import { resetDataRedux } from '../../store/reducers/data';

class My extends Component {
    static propTypes = {
        changeLoginState: PropTypes.func,
        login: PropTypes.object,
        netInfo: PropTypes.object,
        resetDataRedux: PropTypes.func,
        setUserInfo: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            logoutBtnDisabled: false, // 用来防止多次调接口
        }
    }

    componentDidMount() {
        this._init();
    }

    componentWillReceiveProps(nextProps) {
        const curLogin = this.props.login.login;
        const nextLogin = nextProps.login.login;
        if( !curLogin && nextLogin ) this._init();
    }

    _init = () => {
        this.setState({logoutBtnDisabled: false});
        !this.props.login.login && this._getLoginMsg();
    }

    // 防止在Splash的时候没有获取到接口返回值，在tab页里重新都试一下
    _getLoginMsg = async () => {
        try {
            let result = await getLoginMsg();
            result = result.data;
            if (result.status == 200) {
                this.props.changeLoginState(true);
                this.props.setUserInfo(result.data);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }

    // 渲染我的页面选项列表
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
        try {
            await this.setState({logoutBtnDisabled: true});
            let result = await logout();
            result = result.data;
            if (result.status == 200) {
                this.props.changeLoginState(false);
                this.props.setUserInfo({});
                this.props.resetDataRedux();
                // storage.remove({
                //     key: 'login'
                // });
            } else await Promise.reject(result.msg);
        }
        catch (err) {
            this.setState({logoutBtnDisabled: false});
            this.toast.show(err);
        }
    }
	render() {
        const { login, userInfo } = this.props.login;
        const { logoutBtnDisabled } = this.state;
        const isConnected = this.props.netInfo.isConnected;
        const phone = login && userInfo.phone ? userInfo.phone.toString() : '';
        const formatPhone = login && phone ? phone.replace(phone.slice(3, 7), '****') : '';
        return (
		    <View>
                <View style={ login ? styles.container : {}}>
                    {
                        login
                            ? <View>
                                {
                                    isConnected
                                        ? <View>
                                            <View style={styles.top}>
                                                <View style={styles.topLeft}>
                                                    <Image style={styles.topIcon} source={require('../../assets/images/my/user.png')}/>
                                                    <Text style={styles.topTxt}>{formatPhone}</Text>
                                                </View>
                                                <TouchableOpacity disabled={logoutBtnDisabled} onPress={() => this._logout()}>
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
                                        : <NoNetworkPage tryAgainFunc={this._init}/>
                                }
                            </View>
                            : <TouchableOpacity style={styles.top} onPress={() => this.props.navigation.navigate('Login', {origin: 'My'})}>
                                <View style={styles.topLeft}>
                                    <Image style={styles.topIcon} source={require('../../assets/images/my/user.png')}/>
                                    <Text style={styles.topTxt}>{I18n.t('my.login')}</Text>
                                </View>
                            </TouchableOpacity>
                    }
                </View>
                {/* 点击发生网络未连接或者别的报错状况 */}
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
        resetDataRedux,
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

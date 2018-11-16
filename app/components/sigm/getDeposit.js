/**
 * SIGM -> 挖矿账户 -> 获取算力
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import {getDeposit, userSignIn} from '../../api/sigm';
import Toast from '../../utils/myToast';
import NoNetworkPage from '../public/noNetworkPage';
import { changeSecurityState } from "../../store/reducers/data";

class GetDeposit extends React.Component {
    static propTypes = {
        changeSecurityState: PropTypes.func,
        netInfo: PropTypes.object,
        securityCenterData: PropTypes.object,
    }

    constructor(props) {
        super(props);
        // 绑定车辆, 认证身份防止后退不刷新，所以存在redux里
        this.state = {
            calculation: '', // 我的实时算力, 通过路由传来
            hasSigned: false, // 签到情况，通过路由传来
        };
    }

    componentDidMount() {
        this._init();
    }

    // 初始化和刷新用
    _init = () => {
        this._getPageDataFromRouter();
        this._getPageDataAsync();
    }

    // 通过路由获取的数据信息
    _getPageDataFromRouter = () => {
        const { calculation, hasSigned } = this.props.navigation.state.params;
        this.setState({calculation, hasSigned});
    }

    // 获取页面数据信息
    _getPageDataAsync = async () => {
        try {
            let result = await getDeposit();
            result = result.data;
            if (result.status == 200) {
                // 1是已绑定， 0是未绑定
                const { car, numberid } = result.data;
                this.props.changeSecurityState('bindCar', car == 1);
                this.props.changeSecurityState('hasCertificated', numberid == 1);
            }else await Promise.reject(result.msg);
        }
        catch (err) {
            this.toast.show(err);
        }
    }

    // 用户签到
    _userSignIn = async () => {
        try {
            let result = await userSignIn();
            result = result.data;
            if (result.status == 200) {
                this.toast.show(I18n.t('sigm.miningPart.signSuccess'));
                this.props.changeSecurityState('hasSigned', true);
            } else await Promise.reject(result.msg);
        }
        catch (err) {
            this.toast.show(err);
        }
    }

    // 渲染列表里的每一项
    _renderListItem = (data) => {
        return (
            <View style={[styles.listItem, data.hasNoBorder ? {} : styles.listItemBorder]}>
                <View style={[styles.flexRow]}>
                    <Image style={styles.itemIcon} source={data.iconImg}/>
                    <View>
                        <Text style={styles.itemTitle}>{I18n.t('sigm.miningPart.getDepositPart.' + data.title)}</Text>
                        <View style={styles.flexRow}>
                            <Text style={styles.itemTxt1}>{I18n.t('sigm.miningPart.getDepositPart.' + data.description1)}</Text>
                            <Text style={styles.itemTxt2}>{I18n.t('sigm.miningPart.getDepositPart.' + data.description2)}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity disabled={data.disabled} style={[styles.itemRight, data.disabled ? styles.itemRightDisabled : {}]} onPress={() => data.pressFunc()}>
                    <Text style={styles.itemRightTxt}>{I18n.t('sigm.miningPart.getDepositPart.' + data.btnTxt)}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        const { calculation } = this.state;
        const { netInfo, securityCenterData } = this.props;
        const { bindCar, hasCertificated, hasSigned } = securityCenterData;
        const isConnected = netInfo.isConnected;
        return (
            <View>
                {
                    isConnected
                    ? <View>
                        <View style={styles.header}>
                            <Text style={styles.headerTxt}>{I18n.t('sigm.miningPart.realTimeDeposit')}</Text>
                            <Text style={styles.headerTxt}>{calculation}</Text>
                        </View>
                        <View style={styles.item1}>
                            {/* 绑定车辆 */}
                            {
                                this._renderListItem({
                                    iconImg: require('../../assets/images/sigm/car.png'),
                                    title: 'bindCar',
                                    description1: 'bindCarDescription1',
                                    description2: 'bindCarDescription2',
                                    btnTxt: bindCar ? 'bindCarBtn2' : 'bindCarBtn1',
                                    disabled: bindCar,
                                    hasNoBorder: true,
                                    pressFunc: () => { this.props.navigation.navigate('BindCar') }
                                })
                            }
                        </View>
                        <View style={styles.itemList}>
                            {/* 每日签到 */}
                            {
                                this._renderListItem({
                                    iconImg: require('../../assets/images/sigm/daily.png'),
                                    title: 'daylySignIn',
                                    description1: 'daylyDescription1',
                                    description2: 'daylyDescription2',
                                    btnTxt: hasSigned ? 'daylyBtn2' : 'daylyBtn1',
                                    disabled: hasSigned,
                                    pressFunc: () => this._userSignIn()
                                })
                            }
                            {/* 邀请好友 */}
                            {/* 好友是可以无限邀请的 */}
                            {
                                this._renderListItem({
                                    iconImg: require('../../assets/images/sigm/friends.png'),
                                    title: 'inviteFriends',
                                    description1: 'inviteDescription1',
                                    description2: 'inviteDescription2',
                                    btnTxt: 'inviteBtn1',
                                    disabled: false,
                                    pressFunc: () => { this.props.navigation.navigate('InviteFriends') }
                                })
                            }
                            {/* 认证身份 */}
                            {
                                this._renderListItem({
                                    iconImg: require('../../assets/images/sigm/certificate.png'),
                                    title: 'certificate',
                                    description1: 'certificateDescription1',
                                    description2: 'certificateDescription2',
                                    btnTxt: hasCertificated ? 'certificateBtn2' : 'certificateBtn1',
                                    disabled: hasCertificated,
                                    pressFunc: () => { this.props.navigation.navigate('Certificate') }
                                })
                            }
                            {/* 注册用户 */}
                            {/* 用户都是已注册的 */}
                            {
                                this._renderListItem({
                                    iconImg: require('../../assets/images/sigm/registry.png'),
                                    title: 'registry',
                                    description1: 'registryDescription1',
                                    description2: 'registryDescription2',
                                    btnTxt: 'registryBtn2',
                                    disabled: true,
                                })
                            }
                        </View>
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
)(GetDeposit)

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingTop: scaleSize(26),
        paddingRight: scaleSize(40),
        paddingBottom: scaleSize(26),
        paddingLeft: scaleSize(40),
        marginBottom: scaleSize(16),
    },
    headerTxt: {
        color: '#4A90E2',
        fontSize: scaleSize(32),
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(40),
    },
    listItemBorder: {
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#9B9B9B',
    },
    itemIcon: {
        width: scaleSize(60),
        height: scaleSize(60),
        marginRight: scaleSize(20),
        marginTop: scaleSize(40),
    },
    itemTitle: {
        color: '#555555',
        fontSize: scaleSize(32),
        marginTop: scaleSize(28),
    },
    itemTxt1: {
        color: '#BEBEBE',
        fontSize: scaleSize(24),
        marginBottom: scaleSize(28),
    },
    itemTxt2: {
        color: '#4A90E2',
        fontSize: scaleSize(24),
    },
    itemRight: {
        width: scaleSize(164),
        height: scaleSize(44),
        borderRadius: scaleSize(22),
        backgroundColor: '#4A90E2',
        alignItems: 'center',
        marginTop: scaleSize(48),
    },
    itemRightDisabled: {
        backgroundColor: '#E8E8E8',
    },
    itemRightTxt: {
        color: '#FFFFFF',
        fontSize: scaleSize(28),
        lineHeight: scaleSize(40),
    },
    item1: {
        marginTop: scaleSize(16),
        marginBottom: scaleSize(16),
        backgroundColor: '#FFFFFF',
    },
    itemList: {
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height - scaleSize(396),
    }
});

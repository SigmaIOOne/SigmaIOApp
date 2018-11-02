/**
 * SIGM -> 总资产 -> 账户详情 -> 交易记录
 */
import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import Toast from '../../utils/myToast';
import { getSigmTab } from '../../api/sigm';
// 测试用
import { changeLoginState } from '../../store/reducers/login';

class Sigm extends React.Component {
    static propTypes = {
        login: PropTypes.object,
        netInfo: PropTypes.object,
    }
    constructor(props) {
        super(props);
        this.state = {
            all: '0.00', // 总资产
            dollar: '0.00', // 约等于多少钱
            income: '0.00', // 累计收益
            miningaccount: '0.00', // 挖矿资产
            charged: '0.00', // 待收取
        }
    }
    // componentWillReceiveProps(nextProps) {
        // 网络未连接
        // if (this.props.netInfo.noNetworkClickNum) {
            // this.toast.show(I18n.t('error.noNetwork'));
            // 在这里的时候，下面的toast弹窗还没渲染出来，所以不能在这里设置
            // console.log('nnn ', nextProps.netInfo, this.toast);
        // }
    // }
    componentDidMount() {
        console.log('sigm did ', this.props.navigation.state.params);
        this._asyncGetSigm();
    }
    componentWillReceiveProps(nextProps) {
        console.log('sigm will ', nextProps.navigation.state.params);
        if (nextProps.login.login) this._asyncGetSigm();
        else this._resetSigmData(); // 说明退出了登录
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
    _cardPress = (target) => {
        const login = this.props.login.login;
        const navigate = this.props.navigation.navigate;
        !login ? navigate('Login', {origin: 'Sigm'}) : navigate(target);
    }
    // 用户退出登录后重置tab信息
    _resetSigmData = () => {
        console.log('reset');
        this.setState({
            all: '0.00', // 总资产
            dollar: '0.00', // 约等于多少钱
            income: '0.00', // 累计收益
            miningaccount: '0.00', // 挖矿资产
            charged: '0.00', // 待收取
        });
    }
    // 获取sigm的tab页上的数据信息
    _asyncGetSigm = async () => {
        try {
            let result = await getSigmTab();
            result = result.data;
            if (result.status == 200) {
                const { all, dollar, income, miningaccount, charged } = result.data;
                this.setState({
                    all,
                    dollar,
                    income,
                    miningaccount,
                    charged,
                });
            } else {
                this.toast.show(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    // 马上收取
    _getImmediately = () => {
        // const login = this.props.login.login;
        // if (!login) navigate('Login');
        const login = this.props.login.login;
        const navigate = this.props.navigation.navigate;
        !login ? navigate('Login', {origin: 'Sigm'}) : navigate('MiningPart');
        // 将待领取全部取出来，加到挖矿资产里去
    }
    render() {
        const login = this.props.login.login;
        // const isConnected = this.props.netInfo.isConnected;
        console.log('netInfo ', this.props.netInfo);
        const { all, dollar, income, miningaccount, charged } = this.state;
        return (
            <View style={styles.container}>
                <Image style={styles.sigmBg} source={require('../../assets/images/sigm/sigm_bg.png')}/>
                <View style={styles.content}>
                    <View style={[styles.header, styles.spaceBetween]}>
                        <View style={styles.headerLeft}>
                            <Image style={styles.headerLeftImg} source={require('../../assets/images/sigm/sigm_title.png')}/>
                            <Text style={styles.headerLeftText}>SigmalO</Text>
                        </View>
                        {
                            !login &&
                                <TouchableOpacity style={styles.headerRight} onPress={() => this.props.navigation.navigate('Login', {origin: 'Sigm'})}>
                                    <Text style={styles.headerRightText}>{I18n.t('sigm.login')}</Text>
                                </TouchableOpacity>
                        }
                    </View>
                    {/* 卡片 */}
                    {/* 总资产 */}
                    <View style={styles.perCard}>
                        <View style={[styles.cardRow1, styles.spaceBetween]}>
                            <View style={[styles.cardTitle, styles.spaceBetween]}>
                                <Image style={styles.cardIcon} source={require('../../assets/images/sigm/icon_1.png')}/>
                                <Text style={styles.cardTitleText}>{I18n.t('sigm.totalAsset')}</Text>
                            </View>
                            <TouchableOpacity style={styles.rightArrowView} onPress={() => this._cardPress('AccountDetail')}>
                                <Image style={styles.rightArrow} source={require('../../assets/images/sigm/right_arrow.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.cardRow2, styles.spaceBetween]}>
                            <View style={[styles.spaceBetween]}>
                                <Text style={[styles.cardRow2LeftText, styles.cardRow2LeftTextVal]}>{all}</Text>
                                <Text style={styles.cardRow2LeftText}>SIGM</Text>
                            </View>
                            <Text style={styles.cardRow2Right}>≈{dollar}$</Text>
                        </View>
                        <View style={[styles.cardRow3, styles.spaceBetween]}>
                            <Text style={styles.cardRow3Left}>{I18n.t('sigm.totalProfit')}</Text>
                            <Text style={styles.cardRow3Right}>{income}</Text>
                        </View>
                    </View>
                    {/* 挖矿账户 */}
                    <View style={styles.perCard}>
                        <View style={[styles.cardRow1, styles.spaceBetween]}>
                            <View style={[styles.cardTitle, styles.spaceBetween]}>
                                <Image style={styles.cardIcon} source={require('../../assets/images/sigm/icon_2.png')}/>
                                <Text style={styles.cardTitleText}>{I18n.t('sigm.minerAccount')}</Text>
                            </View>
                            <TouchableOpacity style={styles.rightArrowView} onPress={() => this._cardPress('MiningPart')}>
                                <Image style={styles.rightArrow} source={require('../../assets/images/sigm/right_arrow.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.cardRow2, styles.flexRow]}>
                            <Text style={[styles.cardRow2LeftText, styles.cardRow2LeftTextVal]}>{miningaccount}</Text>
                            <Text style={styles.cardRow2LeftText}>SIGM</Text>
                        </View>
                        <View style={[styles.cardRow3, styles.spaceBetween]}>
                            <View style={[styles.spaceBetween]}>
                                <Text style={[styles.cardRow3Left, styles.card2Row3LeftText]}>{I18n.t('sigm.waitingGet')}</Text>
                                <Text style={[styles.cardRow3Left, styles.card2Row3LeftText]}>{charged}</Text>
                            </View>
                            {/* 马上收取 */}
                            <TouchableOpacity style={styles.card2Row3Right} onPress={() => this._getImmediately()}>
                                <Text style={styles.card2Row3RightText}>{I18n.t('sigm.immediatelyGet')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* 点击发生网络未连接或者别的报错状况 */}
                <Toast onRef={toast => this.toast = toast}/>
            </View>
        );
    }
}

export default connect(
    state => ({
        login: state.login,
        netInfo: state.netInfo,
    }),{
        changeLoginState,
    }
)(Sigm)

const styles = StyleSheet.create({
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexRow: {
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        backgroundColor: '#f0f2f5'
    },
    sigmBg: {
        height: scaleSize(340),
    },
    content: {
        position: 'absolute',
        top: scaleSize(134)
    },
    header: {
        marginBottom: scaleSize(16),
    },
    headerLeft: {
        width: scaleSize(300),
        flexDirection: 'row',
    },
    headerLeftImg: {
        width: scaleSize(64),
        height: scaleSize(64),
        marginRight: scaleSize(24),
        marginLeft: scaleSize(18)
    },
    headerLeftText: {
        fontSize: scaleSize(48),
        color: '#FFFFFF',
    },
    headerRight: {
        width: scaleSize(100),
    },
    headerRightText: {
        fontSize: scaleSize(36),
        color: '#FFFFFF',
    },
    perCard: {
        width: scaleSize(686),
        height: scaleSize(306),
        backgroundColor: '#ffffff',
        borderRadius: scaleSize(12),
        marginBottom: scaleSize(38),
        padding: scaleSize(40)
    },
    cardRow1: {
        height: scaleSize(50),
        marginTop: scaleSize(-9),
    },
    cardIcon: {
        width: scaleSize(32),
        height: scaleSize(32),
        marginRight: scaleSize(28),
        marginTop: scaleSize(9),
    },
    cardTitleText: {
        lineHeight: scaleSize(50),
        fontSize: scaleSize(32),
    },
    rightArrowView: {
        width: scaleSize(70),
        height: scaleSize(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightArrow: {
        width: scaleSize(20),
        height: scaleSize(32),
    },
    cardRow2: {
        height: scaleSize(66),
        marginTop: scaleSize(26),
        marginBottom: scaleSize(26),
    },
    cardRow2LeftText: {
        fontSize: scaleSize(48),
        color: '#4A90E2',
        lineHeight: scaleSize(66)
    },
    cardRow2LeftTextVal: {
        marginRight: scaleSize(24),
    },
    cardRow2Right: {
        fontSize: scaleSize(28),
        color: '#4A90E2',
        lineHeight: scaleSize(66)
    },
    cardRow3: {
        backgroundColor: '#F2F2F5',
        width: scaleSize(606),
        height: scaleSize(64),
        paddingLeft: scaleSize(12),
        paddingRight: scaleSize(12),
        borderRadius: scaleSize(12),
    },
    cardRow3Left: {
        color: '#F5A623',
        fontSize: scaleSize(32),
        lineHeight: scaleSize(64),
    },
    cardRow3Right: {
        color: '#F5A623',
        fontSize: scaleSize(32),
        lineHeight: scaleSize(64),
    },
    card2Row3LeftText: {
        color: '#4A90E2',
    },
    card2Row3Right: {
        width: scaleSize(166),
        height: scaleSize(44),
        borderRadius: scaleSize(22),
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scaleSize(10),
    },
    card2Row3RightText: {
        color: '#FFFFFF',
        fontSize: scaleSize(28),
    }
});
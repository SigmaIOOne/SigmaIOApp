/**
 * SIGM -> 挖矿账户 -> 挖矿
 */
import React from 'react';
import {
    Animated,
    Dimensions,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import { ImageBackground } from 'react-native-vector-icons/lib/react-native';
import Modal from 'react-native-modalbox';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import Toast from '../../utils/myToast';
import { getMiningData, transferAmount, userSignIn } from '../../api/sigm';
import NoNetworkPage from '../public/noNetworkPage';
import { changeSecurityState } from "../../store/reducers/data";

class MiningPart extends React.Component {
    static propTypes = {
        changeSecurityState: PropTypes.func,
        netInfo: PropTypes.object,
        securityCenterData: PropTypes.object,
    }
    constructor(props) {
		super(props);
		this.state = {
            fadeAnim: new Animated.Value(1),
            top: new Animated.Value(scaleSize(220)),
            marginLeft: new Animated.Value(scaleSize(34)),
            show: true,
            anim: new Animated.Value(0),
            compositeAnim: new Animated.Value(0),
            // 上面是动画效果用,下面的命名来自接口返回参数
            calculation: '', // 当前算⼒
            charged: '', // 待收取
            ranking: '', // 算⼒排名
            miningaccount: '', // 挖矿资产
            total: '', // 全⽹总算⼒
            transferVal: '', // 划转数值
        };
	}
    componentDidMount() {
        this._init();
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
    /**
     * 页面初始化和刷新用
     */
    _init = () => {
        this._getMiningData();
    }
    /**
     * 获取挖矿页面上的数据信息
     */
    _getMiningData = async () => {
        try {
            let result = await getMiningData();
            result = result.data;
            console.log('all ', result);
            if (result.status == 200) {
                const {
                    calculation,
                    charged,
                    ranking,
                    miningaccount,
                    sign,
                    total,
                } = result.data;
                this.setState({
                    calculation,
                    charged,
                    ranking,
                    miningaccount,
                    total,
                });
                this.props.changeSecurityState('hasSigned', sign == '1'); // 今日签到会涉及到后退不刷新的问题，所以存在redux里
            } else {
                await Promise.reject(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    /**
     * 渲染floor2的item
     */
    _renderFloor2Item = (title, value, hasRightBorder = true) => {
        return (
            <View style={[styles.floor2Item, hasRightBorder ? {borderRightColor: '#D8D8D8', borderRightWidth: scaleSize(1)} : {}]}>
                <Text style={styles.floor2Title}>{title}</Text>
                <Text style={styles.floor2Value}>{value}</Text>
            </View>
        );
    }
    /**
     * 渲染挖矿攻略弹窗item
     */
    _renderMiningStrategyModalItem = (data) => {
        return (
            <View style={[styles.miningStrategyModalItem, data.hasBorderBotom ? {borderBottomColor: '#BEBEBE', borderBottomWidth: scaleSize(1)} : {}]}>
                <Text style={styles.miningStrategyModalItemTitle}>{data.title}</Text>
                <Text style={styles.miningStrategyModalItemValue}>{data.value}</Text>
            </View>
        );
    }
    /**
     * 用户签到
     */
    _userSignIn = async () => {
        try {
            let result = await userSignIn();
            result = result.data;
            result.status == 200 ? this.props.changeSecurityState('hasSigned', true) : await Promise.reject(result.msg);
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    /**
     * 打开划转弹窗
     */
    _openTransferModal = () => {
        this.setState({
            transferVal: '',
        }, () => this.transferModal.open());
    }
    /**
     * 确认划转按钮
     */
    _transferAmount = async () => {
        Keyboard.dismiss(); // 为了防止toast的位置因为键盘收起而移动，所以干脆先手动关闭键盘
        try {
            const transferVal = this.state.transferVal;
            let result = await transferAmount(transferVal);
            result = result.data;
            console.log('transfer ', result);
            if (result.status == 200) {
                this.transfer.close();
            } else {
                await Promise.reject(result.msg);
            }
        }
        catch (err) {
            this.toast.show(err);
        }
    }
    _onPress = () => {
        Animated.spring(this.state.anim, {
            toValue: 0,   
            velocity: 7,  
            tension: -20, 
            friction: 3,  
          }).start();
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 0, duration: 2000}
        ).start();
        Animated.timing(
            this.state.top,
            {toValue: scaleSize(0), duration: 2000},
        ).start();
    }

    render() {
        const { netInfo, securityCenterData } = this.props;
        const isConnected = netInfo.isConnected;
        const {
            calculation,
            charged,
            ranking,
            miningaccount,
            total,
            transferVal,
        } = this.state;
        const hasSigned = securityCenterData.hasSigned;
        return (
            <View>
                {
                    isConnected
                    ? <View>
                        <View style={[styles.header, styles.flexRow]}>
                            <View style={[styles.center, styles.headerLeft]}>
                                <Text style={styles.headerTxt1}>{I18n.t('sigm.miningPart.minerAssets')}</Text>
                                <Text style={[styles.headerTxt2, {marginRight: scaleSize(16)}]}>{miningaccount}</Text>
                                <Text style={styles.headerTxt2}>SIGM</Text>
                            </View>
                            {/* 划转 */}
                            <View style={styles.center}>
                                <TouchableOpacity style={styles.transferT} onPress={() => this._openTransferModal()}>
                                    <Text style={styles.transferTxt}>{I18n.t('sigm.miningPart.transfer')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.floor1}>
                                <Animated.Text style={{ position: 'relative', top: this.state.top, opacity: this.state.fadeAnim, color: '#666'}}>
                                    已领取0.02343SIGM
                                </Animated.Text>
                                <ImageBackground style={styles.outerCircle} source={require('../../assets/images/sigm/outer_circle.png')}>
                                    <TouchableOpacity onPress={()=>{
                                        Animated.spring(this.state.anim, {
                                            toValue: 0,
                                            velocity: 7,
                                            tension: -20,
                                            friction: 3,
                                        }).start();
                                        Animated.timing(
                                            this.state.fadeAnim,
                                            {toValue: 0, duration: 2000}
                                        ).start(() => {
                                            this.setState({
                                                fadeAnim: new Animated.Value(1),
                                            })
                                        });
                                        Animated.timing(
                                            this.state.top,
                                            {toValue: scaleSize(0), duration: 2000},
                                        ).start(() => {
                                            this.setState({
                                                top: new Animated.Value(scaleSize(220)),
                                            })
                                        });
                                    }}>
                                        <Animated.View
                                            style={[styles.content1, {
                                                transform: [
                                                    {scale: this.state.anim.interpolate({
                                                            inputRange: [0, 2],
                                                            outputRange: [1, 1.5],
                                                        })}
                                                ]}
                                            ]}>
                                            <Image source={require('../../assets/images/sigm/inner_circle.png')} style={styles.innerCircle}/>
                                        </Animated.View>
                                    </TouchableOpacity>
                                </ImageBackground>
                                {/* 挖矿攻略 */}
                                <TouchableOpacity onPress={() => this.miningStrategyModal.open()}>
                                    <Text style={styles.strategyTxt}>{I18n.t('sigm.miningPart.miningStrategy')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.floor2}>
                                {/* 我的实时算力 */}
                                {
                                    this._renderFloor2Item(
                                        I18n.t('sigm.miningPart.realTimeDeposit'),
                                        calculation,
                                    )
                                }
                                {/* 全网算力 */}
                                {
                                    this._renderFloor2Item(
                                        I18n.t('sigm.miningPart.allDeposit'),
                                        total,
                                    )
                                }
                                {/* 我的算力排行 */}
                                {
                                    this._renderFloor2Item(
                                        I18n.t('sigm.miningPart.depositRank'),
                                        ranking,
                                        false
                                    )
                                }
                            </View>
                            <View style={[styles.flexRow, {alignItems: 'center'}]}>
                                <Button
                                    title={I18n.t('sigm.miningPart.signIn')}
                                    // "今日签到"
                                    icon={
                                        <Image style={styles.signInIcon} source={require('../../assets/images/sigm/signIn_icon.png')}/>
                                    }
                                    disabled={hasSigned}
                                    disabledStyle={[styles.signInBtn, styles.signInGrayBtn]}
                                    buttonStyle={[styles.signInBtn, styles.signInBlueBtn]}
                                    titleStyle={{color: '#FFFFFF', fontSize: scaleSize(36)}}
                                    onPress={() => this._userSignIn()}
                                />
                                <Button
                                    title={I18n.t('sigm.miningPart.getDeposit')}
                                    // "获取算力"
                                    icon={
                                        <Image style={styles.getDepositIcon} source={require('../../assets/images/sigm/getDeposit_icon.png')}/>
                                    }
                                    buttonStyle={styles.getDepositBtn}
                                    titleStyle={{color: '#4A90E2', fontSize: scaleSize(36)}}
                                    onPress={() => this.props.navigation.navigate('GetDeposit', {calculation})}
                                />
                            </View>
                        </View>
                        {/* 挖矿攻略弹窗 */}
                        <Modal
                            style={[styles.modal]}
                            coverScreen={true}
                            position={'center'}
                            ref={modal => this.miningStrategyModal = modal}
                            swipeArea={20}
                        >
                            <View>
                                <View style={styles.modalTitle}>
                                    <Text style={styles.modalTitleTxt}>{I18n.t('sigm.miningPart.miningStrategy')}</Text>
                                    <TouchableOpacity style={styles.closeBtnT} onPress={() => this.miningStrategyModal.close()}>
                                        <Image style={styles.closeBtnImg} source={require('../../assets/images/common/close.png')} />
                                    </TouchableOpacity>
                                </View>
                                {/* 什么是算力 */}
                                {
                                    this._renderMiningStrategyModalItem({
                                        title: I18n.t('sigm.miningPart.miningStrategyPart.whatDeposit'),
                                        value: I18n.t('sigm.miningPart.miningStrategyPart.depositDescription'),
                                        hasBorderBotom: true
                                    })
                                }
                                {/* 如何提高算力 */}
                                {
                                    this._renderMiningStrategyModalItem({
                                        title: I18n.t('sigm.miningPart.miningStrategyPart.howDeposit'),
                                        value: I18n.t('sigm.miningPart.miningStrategyPart.wayDescription'),
                                    })
                                }
                            </View>
                        </Modal>
                        {/* 划转弹窗 */}
                        <Modal
                            style={[styles.modal, styles.transferModal]}
                            coverScreen={true}
                            position={'center'}
                            ref={modal => this.transferModal = modal}
                            swipeArea={20}
                        >
                            <View>
                                <View style={styles.modalTitle}>
                                    <Text style={styles.modalTitleTxt}>{I18n.t('sigm.miningPart.miningStrategy')}</Text>
                                    <TouchableOpacity style={styles.closeBtnT} onPress={() => this.transferModal.close()}>
                                        <Image style={styles.closeBtnImg} source={require('../../assets/images/common/close.png')} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.transferModalFloor1}>
                                    <Text style={styles.transferModalText1}>{I18n.t('sigm.miningPart.transferPart.today')}</Text>
                                    <View>
                                        <Input
                                            placeholder={I18n.t('sigm.accountDetail.transferModal.inputPlaceholder')}
                                            placeholderTextColor="#E8E8E8"
                                            inputStyle={styles.modalTtransferInputStyle}
                                            inputContainerStyle={styles.inputContainerStyle}
                                            value={transferVal}
                                            onChangeText={(transferVal) => this.setState({transferVal})}
                                        />
                                    </View>
                                </View>
                                <Text style={styles.transferModalTips}>{I18n.t('sigm.miningPart.transferPart.tips')}</Text>
                                <Button
                                    title={I18n.t('sigm.miningPart.transferPart.btn')}
                                    // "确认划转"
                                    buttonStyle={styles.transferModalBtn}
                                    titleStyle={{color: '#FFFFFF', fontSize: scaleSize(28)}}
                                    onPress={() => this._transferAmount()}
                                />
                            </View>
                        </Modal>
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
        securityCenterData: state.data.securityCenterData,
    }),{
        changeSecurityState
    }
)(MiningPart)

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    center: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#FFFFFF',
        height: scaleSize(148),
        marginBottom: scaleSize(16),
        paddingTop: scaleSize(20),
        paddingBottom: scaleSize(20),
    },
    headerLeft: {
        width: scaleSize(492),
        borderRightColor: '#D8D8D8',
        borderRightWidth: scaleSize(1),
    },
    headerTxt1: {
        color: '#4A4A4A',
        fontSize: scaleSize(32),
        marginRight: scaleSize(16),
    },
    headerTxt2: {
        color: '#4A90E2',
        fontSize: scaleSize(32),
    },
    transferT: {
        width: scaleSize(164),
        height: scaleSize(44),
        borderRadius: scaleSize(22),
        backgroundColor: '#4A90E2',
        alignItems: 'center',
        marginLeft: scaleSize(50),
    },
    transferTxt: {
        color: '#FFFFFF',
        fontSize: scaleSize(28),
    },
    content: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        height: Dimensions.get('window').height - scaleSize(292),
    },
    floor1: {
        width: scaleSize(750),
        height: scaleSize(534),
        borderBottomColor: '#9B9B9B',
        borderBottomWidth: scaleSize(1),
        alignItems: 'center',
    },
    outerCircle: {
        width: scaleSize(260),
        height: scaleSize(260),
        marginTop: scaleSize(82),
        marginBottom: scaleSize(40),
    },
    innerCircle: {
        width: scaleSize(192),
        height: scaleSize(192),
        // marginTop: scaleSize(34),
        // marginLeft: scaleSize(34)
    },
    strategyTxt: {
        fontSize: scaleSize(28),
        color: '#4A90E2',
    },
    floor2: {
        flexDirection: 'row',
        paddingTop: scaleSize(34),
        height: scaleSize(132),
        marginBottom: scaleSize(100),
    },
    floor2Item: {
        width: scaleSize(249),
        alignItems: 'center',
        justifyContent: 'center',
    },
    floor2Title: {
        fontSize: scaleSize(26),
        color: '#4A90E2',
    },
    floor2Value: {
        fontSize: scaleSize(26),
        color: '#4A4A4A',
    },
    signInBtn: {
        width: scaleSize(296),
        height: scaleSize(68),
        marginRight: scaleSize(62),
    },
    signInBlueBtn: {
        backgroundColor: '#4A90E2',
        borderRadius: scaleSize(34),
    },
    signInGrayBtn: {
        backgroundColor: '#BEBEBE',
        borderRadius: scaleSize(34),
    },
    signInIcon: {
        width: scaleSize(40),
        height: scaleSize(40),
    },
    getDepositBtn: {
        width: scaleSize(296),
        height: scaleSize(68),
        backgroundColor: '#FFFFFF',
        borderRadius: scaleSize(34),
        borderColor: '#4A90E2',
        borderWidth: scaleSize(2),
    },
    getDepositIcon: {
        width: scaleSize(28),
        height: scaleSize(44),
    },
    modal: {
        alignItems: 'center',
        width: scaleSize(666),
        height: scaleSize(530),
        borderRadius: scaleSize(24),
    },
    modalTitle: {
        width: scaleSize(666),
        flexDirection: 'row',
        paddingBottom: scaleSize(38),
        paddingTop: scaleSize(40),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
    },
    modalTitleTxt: {
        color: '#4A4A4A',
        fontSize: scaleSize(36),
        marginLeft: scaleSize(260),
    },
    closeBtnT: {
        width: scaleSize(44),
        height: scaleSize(44),
        marginLeft: scaleSize(194),
    },
    closeBtnImg: {
        width: scaleSize(32),
        height: scaleSize(32),
    },
    miningStrategyModalItem: {
        paddingTop: scaleSize(24),
        paddingRight: scaleSize(40),
        paddingLeft: scaleSize(40),
        paddingBottom: scaleSize(20),
    },
    miningStrategyModalItemTitle: {
        color: '#4A90E2',
        fontSize: scaleSize(30),
    },
    miningStrategyModalItemValue: {
        color: '#9B9B9B',
        fontSize: scaleSize(26),
        marginTop: scaleSize(16),
    },
    transferModal: {
        width: scaleSize(670),
        height: scaleSize(558),
    },
    transferModalFloor1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: scaleSize(26),
        paddingRight: scaleSize(42),
        paddingBottom: scaleSize(26),
        paddingLeft: scaleSize(42),
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
    },
    transferModalText1: {
        color: '#4A90E2',
        fontSize: scaleSize(30),
    },
    modalTtransferInputStyle: {
        fontSize: scaleSize(30),
        color: '#4A90E2',
    },
    inputContainerStyle: {
        width: scaleSize(300),
        height: scaleSize(42),
        borderBottomWidth: 0,
    },
    transferModalTips: {
        width: scaleSize(670),
        paddingTop: scaleSize(32),
        paddingRight: scaleSize(42),
        paddingBottom: scaleSize(46),
        paddingLeft: scaleSize(42),
        color: '#9B9B9B',
        fontSize: scaleSize(30),
    },
    transferModalBtn: {
        width: scaleSize(526),
        height: scaleSize(88),
        backgroundColor: '#4A90E2',
        borderRadius: scaleSize(44),
        marginLeft: scaleSize(72),
    },
    content1: {
        // backgroundColor: 'green',
        // borderWidth: 1,
        // padding: 5,
        // margin: 20,
        alignItems: 'center',
        width: scaleSize(192),
        height: scaleSize(192),
        marginTop: scaleSize(34),
        marginLeft: scaleSize(34)
      },
});

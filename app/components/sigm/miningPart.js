/**
 * SIGM -> 挖矿账户 -> 挖矿
 */
import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';
import { Button } from 'react-native-elements';
import { ImageBackground } from 'react-native-vector-icons/lib/react-native';
import Modal from 'react-native-modalbox';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import GetDeposit from "./getDeposit";

export default class MiningPart extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
            fadeAnim: new Animated.Value(0),
            width: new Animated.Value(scaleSize(192)),
            marginLeft: new Animated.Value(scaleSize(34)),

        };
        this._onPress = this._onPress.bind(this);
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
    _onPress() {
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 1, duration: 500}
        ).start();
        Animated.timing(
            this.state.width,
            {toValue: scaleSize(230), duration: 2000},
            {toValue: scaleSize(192), duration: 2000}
        ).start(()=> {
            this.setState({
                width: new Animated.Value(scaleSize(192)),
            })
        });
        Animated.timing(
            this.state.marginLeft,
            {toValue: scaleSize(15), duration: 2000}
        ).start(() => {
            this.setState({
                marginLeft: new Animated.Value(scaleSize(34)),
            })
        });

    }
    componentDidMount() {
        
    }
    render() {
        return (
            <View>
                <View style={[styles.header, styles.flexRow]}>
                    <View style={[styles.center, styles.headerLeft]}>
                        <Text style={styles.headerTxt1}>{I18n.t('sigm.miningPart.minerAssets')}</Text>
                        <Text style={[styles.headerTxt2, {marginRight: scaleSize(16)}]}>31.30945</Text>
                        <Text style={styles.headerTxt2}>SIGM</Text>
                    </View>
                    <View style={styles.center}>
                        <TouchableOpacity style={styles.transferT} onPress={() => this.transferModal.open()}>
                            <Text style={styles.transferTxt}>{I18n.t('sigm.miningPart.transfer')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.floor1}>
                        <ImageBackground style={styles.outerCircle} source={require('../../assets/images/sigm/outer_circle.png')}>
                            <TouchableOpacity onPress={this._onPress}>
                                <Animated.Image style={{ width: this.state.width, height: this.state.width, marginTop: this.state.marginLeft, marginLeft: this.state.marginLeft }}
                                    source={require('../../assets/images/sigm/inner_circle.png')}
                                />
                            </TouchableOpacity>
                            {/* <Image style={styles.innerCircle} source={require('../../assets/images/sigm/inner_circle.png')}/> */}
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
                                '100+37'
                            )
                        }
                        {/* 全网算力 */}
                        {
                            this._renderFloor2Item(
                                I18n.t('sigm.miningPart.allDeposit'),
                                '7864689'
                            )
                        }
                        {/* 我的算力排行 */}
                        {
                            this._renderFloor2Item(
                                I18n.t('sigm.miningPart.depositRank'),
                                '9876',
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
                            buttonStyle={styles.signInBtn}
                            titleStyle={{color: '#FFFFFF', fontSize: scaleSize(36)}}
                            onPress={() => {}}
                        />
                        <Button
                            title={I18n.t('sigm.miningPart.getDeposit')}
                            // "获取算力"
                            icon={
                                <Image style={styles.getDepositIcon} source={require('../../assets/images/sigm/getDeposit_icon.png')}/>
                            }
                            buttonStyle={styles.getDepositBtn}
                            titleStyle={{color: '#4A90E2', fontSize: scaleSize(36)}}
                            onPress={() => this.props.navigation.navigate('GetDeposit')}
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
                            <Text style={styles.transferModalText1}>0</Text>
                        </View>
                        <Text style={styles.transferModalTips}>{I18n.t('sigm.miningPart.transferPart.tips')}</Text>
                        <Button
                            title={I18n.t('sigm.miningPart.transferPart.btn')}
                            // "确认划转"
                            buttonStyle={styles.transferModalBtn}
                            titleStyle={{color: '#FFFFFF', fontSize: scaleSize(28)}}
                            onPress={() => {}}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}

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
        marginTop: scaleSize(34),
        marginLeft: scaleSize(34)
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
        backgroundColor: '#4A90E2',
        borderRadius: scaleSize(34),
        marginRight: scaleSize(62),
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
        borderWidth: scaleSize(1),
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
    }
});

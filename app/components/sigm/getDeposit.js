/**
 * SIGM -> 挖矿账户 -> 获取算力
 */
import React from 'react';
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

export default class GetDeposit extends React.Component {
    _renderListItem = (data) => {
        return (
            <View style={styles.listItem}>
                <View style={[styles.flexRow]}>
                    <Image style={styles.itemIcon} source={data.iconImg}/>
                    <View>
                        <Text style={styles.itemTitle}>{I18n.t(data.title)}</Text>
                        <View style={styles.flexRow}>
                            <Text style={styles.itemTxt1}>{I18n.t(data.description1)}</Text>
                            <Text style={styles.itemTxt2}>{I18n.t(data.description2)}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    {
                        data.disabled
                            ? <View style={[styles.itemRight, styles.itemRightDisabled]}>
                                <Text style={styles.itemRightTxt}>{I18n.t(data.btnTxt)}</Text>
                            </View>
                            : <TouchableOpacity style={styles.itemRight} onPress={() => data.pressFunc()}>
                                <Text style={styles.itemRightTxt}>{I18n.t(data.btnTxt)}</Text>
                            </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }
    render() {
        return (
            <View>
                <View style={styles.header}>
                    <Text style={styles.headerTxt}>{I18n.t('sigm.miningPart.realTimeDeposit')}</Text>
                    <Text style={styles.headerTxt}>137</Text>
                </View>
                <View style={styles.item1}>
                    {/* 绑定车辆 */}
                    {
                        this._renderListItem({
                            iconImg: require('../../assets/images/sigm/car.png'),
                            title: 'sigm.miningPart.getDepositPart.bindCar',
                            description1: 'sigm.miningPart.getDepositPart.bindCarDescription1',
                            description2: 'sigm.miningPart.getDepositPart.bindCarDescription2',
                            btnTxt: 'sigm.miningPart.getDepositPart.bindCarBtn1',
                            disabled: false,
                            pressFunc: () => { this.props.navigation.navigate('BindCar') }
                        })
                    }
                </View>
                <View style={styles.itemList}>
                    {/* 每日签到 */}
                    {
                        this._renderListItem({
                            iconImg: require('../../assets/images/sigm/daily.png'),
                            title: 'sigm.miningPart.getDepositPart.daylySignIn',
                            description1: 'sigm.miningPart.getDepositPart.daylyDescription1',
                            description2: 'sigm.miningPart.getDepositPart.daylyDescription2',
                            btnTxt: 'sigm.miningPart.getDepositPart.daylyBtn2',
                            disabled: true,
                        })
                    }
                    {/* 邀请好友 */}
                    {
                        this._renderListItem({
                            iconImg: require('../../assets/images/sigm/friends.png'),
                            title: 'sigm.miningPart.getDepositPart.inviteFriends',
                            description1: 'sigm.miningPart.getDepositPart.inviteDescription1',
                            description2: 'sigm.miningPart.getDepositPart.inviteDescription2',
                            btnTxt: 'sigm.miningPart.getDepositPart.inviteBtn1',
                            disabled: false,
                            pressFunc: () => { console.log('****'); }
                        })
                    }
                    {/* 认证身份 */}
                    {
                        this._renderListItem({
                            iconImg: require('../../assets/images/sigm/certificate.png'),
                            title: 'sigm.miningPart.getDepositPart.certificate',
                            description1: 'sigm.miningPart.getDepositPart.certificateDescription1',
                            description2: 'sigm.miningPart.getDepositPart.certificateDescription2',
                            btnTxt: 'sigm.miningPart.getDepositPart.certificateBtn1',
                            disabled: false,
                            pressFunc: () => { console.log('****'); }
                        })
                    }
                    {/* 注册用户 */}
                    {
                        this._renderListItem({
                            iconImg: require('../../assets/images/sigm/registry.png'),
                            title: 'sigm.miningPart.getDepositPart.registry',
                            description1: 'sigm.miningPart.getDepositPart.registryDescription1',
                            description2: 'sigm.miningPart.getDepositPart.registryDescription2',
                            btnTxt: 'sigm.miningPart.getDepositPart.registryBtn1',
                            disabled: true,
                        })
                    }
                </View>
            </View>
        );
    }
}

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

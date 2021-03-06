import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { ImageBackground } from 'react-native-vector-icons/lib/react-native';
import Modal from 'react-native-modalbox';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class AccountDetail extends React.Component {
    /**
     * 渲染账户详情选择项
     * @param data
     * @private
     */
    _renderSelectItem = (data) => {
        return (
            <View style={[styles.perItem, styles.spaceBetween]}>
                <View style={[styles.flexRow]}>
                    <Image style={styles.itemIcon} source={data.iconImg}/>
                    <Text style={[styles.perItemLeftText, styles.perItemLeftText1]}>{I18n.t(data.title)}</Text>
                    <Text style={styles.perItemLeftText}>{data.value}</Text>
                </View>
                <TouchableOpacity onPress={() => data.clickFunc()}>
                    <View style={[styles.flexRow]}>
                        <Text style={[styles.perItemRightText]}>{I18n.t(data.rightArrowTitle)}</Text>
                        <Image style={styles.blueArrow} source={require('../../assets/images/sigm/blue_right_arrow.png')}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    /**
     * 渲染提取弹窗列表项
     */
    _renderWithdrawItem = (data) => {
        return (
            <View style={[styles.withdrawItem, styles.spaceBetween]}>
                <Text style={styles.withdrawItemLeft}>{I18n.t(data.title)}</Text>
                <View style={[styles.flexRow]}>
                    <View style={{maxWidth: scaleSize(330)}}>{data.right}</View>
                    <Text style={styles.withdrawItemRightTxt2}>SIGM</Text>
                </View>
            </View>
        );
    }

    /**
     * 渲染划转弹窗列表项
     */
    _renderTtransferItem = (data) => {
        return (
            <View style={[styles.withdrawItem, styles.spaceBetween]}>
                <Text style={styles.withdrawItemLeft}>{I18n.t(data.title)}</Text>
                <Text style={styles.withdrawItemRightTxt2}>{data.value}</Text>
            </View>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.detailTop} source={require('../../assets/images/sigm/login_bg.png')}>
                    <View style={[styles.topFloor1, styles.spaceBetween]}>
                        <Text style={styles.topFloor1Left}>{I18n.t('sigm.accountDetail.allAssets')}</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SigmTransactionRecord')}>
                            <Text style={styles.topFloor1Right}>{I18n.t('sigm.accountDetail.transactionRecord')}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.topFloor2}>31.30945</Text>
                    <Text style={styles.topFloor3}>≈0.14 $</Text>
                </ImageBackground>
                {/* 主账户 */}
                {
                    this._renderSelectItem({
                        iconImg: require('../../assets/images/sigm/account_icon_1.png'),
                        title: 'sigm.accountDetail.mainAccount',
                        value: 0,
                        rightArrowTitle: 'sigm.accountDetail.withdraw',
                        clickFunc: () => this.withdraw.open(),
                    })
                }
                {/*/!* 挖矿账户 *!/*/}
                {
                    this._renderSelectItem({
                        iconImg: require('../../assets/images/sigm/account_icon_2.png'),
                        title: 'sigm.accountDetail.minerAccount',
                        value: 19.30145,
                        rightArrowTitle: 'sigm.accountDetail.transfer',
                        clickFunc: () => this.transfer.open(),
                    })
                }
                {/* 提取弹窗 */}
                <Modal
                    style={styles.modal}
                    position={'center'}
                    coverScreen={true}
                    ref={withdraw => this.withdraw = withdraw}
                >
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTitleTxt}>{I18n.t('sigm.accountDetail.withdraw')}</Text>
                        <TouchableOpacity style={styles.closeBtnT} onPress={() => this.withdraw.close()}>
                            <Image style={styles.closeBtnImg} source={require('../../assets/images/common/close.png')} />
                        </TouchableOpacity>
                    </View>
                    {
                        this._renderWithdrawItem({
                            title: 'sigm.accountDetail.withdrawModal.text1',
                            right:
                                <Input
                                    placeholder={I18n.t('sigm.accountDetail.withdrawModal.inputPlaceholder')}
                                    placeholderTextColor="#E8E8E8"
                                    inputStyle={styles.modalInputStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                />
                        })
                    }
                    {
                        this._renderWithdrawItem({
                            title: 'sigm.accountDetail.withdrawModal.text2',
                            right: <Text style={{color: '#4A90E2', fontSize: scaleSize(30)}}>20</Text>
                        })
                    }
                    <Text style={styles.modalTips}>{I18n.t('sigm.accountDetail.withdrawModal.tip')}</Text>
                    <Button
                        // 确认提取
                        title={I18n.t('sigm.accountDetail.withdrawModal.checkBtn')}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(28)}}
                        buttonStyle={styles.withdrawBtnStyle}
                        onPress={() => {}}
                    />
                </Modal>
                {/* 划转弹窗 */}
                <Modal
                    style={styles.modal}
                    position={'center'}
                    coverScreen={true}
                    ref={transfer => this.transfer = transfer}
                >
                    <View style={styles.modalTitle}>
                        <Text style={styles.modalTitleTxt}>{I18n.t('sigm.accountDetail.transfer')}</Text>
                        <TouchableOpacity style={styles.closeBtnT} onPress={() => this.transfer.close()}>
                            <Image style={styles.closeBtnImg} source={require('../../assets/images/common/close.png')} />
                        </TouchableOpacity>
                    </View>
                    {
                        this._renderTtransferItem({
                            title: 'sigm.accountDetail.transferModal.text',
                            value: 0
                        })
                    }
                    <Text style={styles.modalTips}>{I18n.t('sigm.accountDetail.transferModal.tip')}</Text>
                    <Button
                        // 确认划转
                        title={I18n.t('sigm.accountDetail.transferModal.checkBtn')}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(28)}}
                        buttonStyle={styles.withdrawBtnStyle}
                        onPress={() => {}}
                    />
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flexRow: {
        flexDirection: 'row',
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: 'rgba(242, 242, 245, 0.55)',
        alignItems: 'center',
    },
    detailTop: {
        width: scaleSize(686),
        height: scaleSize(216),
        borderRadius: scaleSize(12),
        marginTop: scaleSize(40),
        marginBottom: scaleSize(40),
        padding: scaleSize(24),
    },
    topFloor1: {},
    topFloor1Left: {
        color: '#FFFFFF',
        fontSize: scaleSize(32),
    },
    topFloor1Right: {
        color: '#FFF46D',
        fontSize: scaleSize(28),
    },
    topFloor2: {
        color: '#FFFFFF',
        fontSize: scaleSize(44),
        textAlign: 'right',
        marginTop: scaleSize(22),
    },
    topFloor3: {
        color: '#FFFFFF',
        fontSize: scaleSize(28),
        textAlign: 'right'
    },
    perItem: {
        width: scaleSize(686),
        height: scaleSize(98),
        backgroundColor: '#FFFFFF',
        borderRadius: scaleSize(18),
        paddingRight: scaleSize(36),
        paddingLeft: scaleSize(24),
        marginBottom: scaleSize(24),
    },
    itemIcon: {
        width: scaleSize(30),
        height: scaleSize(30),
        marginRight: scaleSize(16),
        marginTop: scaleSize(34),
    },
    perItemLeftText: {
        color: '#4A4A4A',
        fontSize: scaleSize(30),
        marginTop: scaleSize(28),
    },
    perItemLeftText1: {
        marginRight: scaleSize(40),
    },
    perItemRightText: {
        color: '#4A90E2',
        marginRight: scaleSize(44),
        marginTop: scaleSize(28),
    },
    blueArrow: {
        width: scaleSize(32),
        height: scaleSize(32),
        marginTop: scaleSize(28),
    },
    modal: {
        width: scaleSize(670),
        height: scaleSize(548),
        backgroundColor: '#FFFFFF',
        borderRadius: scaleSize(24),
        alignItems: 'center',
    },
    modalTitle: {
        flexDirection: 'row',
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
        paddingBottom: scaleSize(32),
        width: scaleSize(670),
        paddingTop: scaleSize(32),
    },
    modalTitleTxt: {
        color: '#4A4A4A',
        fontSize: scaleSize(36),
        marginLeft: scaleSize(298),
    },
    closeBtnT: {
        width: scaleSize(44),
        height: scaleSize(44),
        marginLeft: scaleSize(230),
    },
    closeBtnImg: {
        width: scaleSize(32),
        height: scaleSize(32),
    },
    modalTips: {
        color: '#9B9B9B',
        fontSize: scaleSize(30),
        marginTop: scaleSize(26),
        width: scaleSize(586),
    },
    withdrawBtnStyle: {
        width: scaleSize(526),
        height: scaleSize(88),
        backgroundColor: '#4A90E2',
        borderRadius: scaleSize(44),
        marginTop: scaleSize(38),
        marginBottom: scaleSize(58),
    },
    withdrawItem: {
        borderBottomWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
        paddingTop: scaleSize(26),
        paddingLeft: scaleSize(42),
        paddingRight: scaleSize(42),
        width: scaleSize(670),
        height: scaleSize(94),
    },
    withdrawItemLeft: {
        color: '#4A90E2',
        fontSize: scaleSize(30),
    },
    withdrawItemRightTxt2: {
        color: '#4A90E2',
        fontSize: scaleSize(30),
        marginLeft: scaleSize(20),
    },
    modalInputStyle: {
        fontSize: scaleSize(30),
        color: '#555555',
    },
    inputContainerStyle: {
        width: scaleSize(300),
        height: scaleSize(42),
        borderBottomWidth: 0,
        // flexDirection: 'row'
    }
});

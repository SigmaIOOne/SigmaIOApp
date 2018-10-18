import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Modal from 'react-native-modalbox';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

class AboutUs extends Component {
    _renderSelectItem = (data, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => data.pressFunc()}
            >
                <View style={[styles.item, data.noNeedBorder ? {} : styles.hasborderTop]}>
                    <Text style={styles.itemTxt}>{I18n.t(data.title)}</Text>
                    <View style={styles.itemRight}>
                        { !!data.rightTxt && <Text style={styles.itemTxt}>{data.rightTxt}</Text> }
                        <Image style={styles.rightArrow} source={require('../../assets/images/my/right_arrow.png')} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const list = [
            {
                // 使用协议
                title: 'my.aboutUsPart.protocols',
                pressFunc: () => this.props.navigation.navigate('Protocols'),
                noNeedBorder: true, // 不要顶部的border
            },
            {
                // 隐私条款
                title: 'my.aboutUsPart.policy',
                pressFunc: () => this.props.navigation.navigate('ServerPolicies'),
            },
            {
                // 版本日志
                title: 'my.aboutUsPart.release',
                pressFunc: () => this.props.navigation.navigate('Release'),
            },
            {
                // 更新新版本
                title: 'my.aboutUsPart.update',
                pressFunc: () => this.myModal.open(),
                rightTxt: '1.0.0',
            },
        ];
        return (
            <View style={styles.container}>
                {
                    list.map((item, index) => this._renderSelectItem(item, index))
                }
                {/* 检测版本弹窗 */}
                <Modal
                    style={styles.modal}
                    position={'center'}
                    coverScreen={true}
                    ref={myModal => this.myModal = myModal}
                >
                    <View style={styles.modalTitle}>
                        <TouchableOpacity style={styles.closeBtnT} onPress={() => this.myModal.close()}>
                            <Image style={styles.closeBtnImg} source={require('../../assets/images/common/close.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTxt}>{I18n.t('my.aboutUsPart.updatePart.tips')}</Text>
                        <Text style={styles.modalTxt}>{'1.0.1'}</Text>
                    </View>
                    <View style={styles.btnArea}>
                        <Button
                            // 暂不更新
                            title={I18n.t('my.aboutUsPart.updatePart.notUpdateBtn')}
                            titleStyle={{color: '#F5A623', fontSize: scaleSize(30)}}
                            buttonStyle={styles.notUpdateBtnStyle}
                            onPress={() => {}}
                        />
                        <Button
                            // 立即更新
                            title={I18n.t('my.aboutUsPart.updatePart.updateBtn')}
                            titleStyle={{color: '#FFFFFF', fontSize: scaleSize(30)}}
                            buttonStyle={styles.updateBtnStyle}
                            onPress={() => {}}
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}

export default connect(
    state => ({
        wallet: state.wallet
    })
)(AboutUs)

const styles = StyleSheet.create({
    container: {
        paddingTop: scaleSize(40),
    },
    item: {
        flexDirection: 'row',
        height: scaleSize(96),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: scaleSize(40),
        paddingRight: scaleSize(24),
        backgroundColor: '#FFFFFF',
    },
    hasborderTop: {
        borderTopWidth: scaleSize(1),
        borderTopColor: '#C5C5C5',
    },
    itemTxt: {
        color: '#4A4A4A',
        fontSize: scaleSize(32),
        marginRight: scaleSize(34),
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightArrow: {
        width: scaleSize(28),
        height: scaleSize(28),
    },
    modal: {
        width: scaleSize(670),
        height: scaleSize(422),
        backgroundColor: '#FFFFFF',
        borderRadius: scaleSize(24),
        alignItems: 'center',
    },
    modalTitle: {
        width: scaleSize(670),
        height: scaleSize(94),
    },
    closeBtnT: {
        width: scaleSize(44),
        height: scaleSize(44),
        marginLeft: scaleSize(600),
        marginTop: scaleSize(28),
    },
    closeBtnImg: {
        width: scaleSize(32),
        height: scaleSize(32),
    },
    modalContent: {
        width: scaleSize(670),
        height: scaleSize(94),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopColor: '#BEBEBE',
        borderTopWidth: scaleSize(1),
        borderBottomColor: '#BEBEBE',
        borderBottomWidth: scaleSize(1),
        paddingLeft: scaleSize(42),
        paddingRight: scaleSize(42),
    },
    modalTxt: {
        color: '#4A90E2',
        fontSize: scaleSize(30),
    },
    btnArea: {
        width: scaleSize(670),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: scaleSize(42),
        paddingRight: scaleSize(42),
        marginTop: scaleSize(80),
    },
    notUpdateBtnStyle: {
        width: scaleSize(256),
        height: scaleSize(66),
        borderRadius: scaleSize(33),
        borderColor: '#F5A623',
        borderWidth: scaleSize(1),
        backgroundColor: '#FFFFFF',
    },
    updateBtnStyle: {
        width: scaleSize(256),
        height: scaleSize(66),
        borderRadius: scaleSize(33),
        backgroundColor: '#4A90E2',
    },
});

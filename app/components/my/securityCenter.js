/**
 * 我的 -> 安全中心
 */
import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';
import BindPhone from "./bindPhone";

export default class SecurityCenter extends Component {
    _renderItem = (data) => {
        return (
            <TouchableOpacity onPress={() => { data.hasPressFunc && data.pressFunc() }} style={styles.item}>
                <Text style={styles.itemTitle}>{I18n.t(data.title)}</Text>
                <View style={styles.itemRight}>
                    <Text style={data.hasPressFunc ? styles.itemTxtRed : styles.itemTxtGray}>{I18n.t(data.txt)}</Text>
                    <Image style={styles.rightArrow} source={require('../../assets/images/my/right_arrow.png')}/>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    // 绑定手机
                    this._renderItem({
                        title: 'my.securityPart.bindPhone',
                        txt: 'my.securityPart.bindTxt1',
                        hasPressFunc: true,
                        pressFunc: () => this.props.navigation.navigate('BindPhone'),
                    })
                }
                {
                    // 认证身份
                    this._renderItem({
                        title: 'my.securityPart.certificate',
                        txt: 'my.securityPart.certificateTxt2',
                        hasPressFunc: true,
                        pressFunc: () => this.props.navigation.navigate('Certificate'),
                    })
                }
            </View>
        );
    }
}

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

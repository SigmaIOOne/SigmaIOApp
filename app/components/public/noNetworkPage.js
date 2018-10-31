/**
 * 没有网络时候的通用页面
 */

import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class NoNetworkPage extends React.Component {
    static propTypes = {
        tryAgainFunc: PropTypes.func.isRequired, // 刷新重试按钮
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.noNetworkImg} source={require('../../assets/images/common/no_network.png')}/>
                <Text style={styles.noNetworkTxt}>{I18n.t('error.noNetworkPageTxt')}</Text>
                <Button
                    title={I18n.t('error.tryAgain')}
                    // "点我重试"
                    buttonStyle={styles.btnStyle}
                    titleStyle={{color: '#FFFFFF', fontSize: scaleSize(34)}}
                    onPress={() => this.props.tryAgainFunc()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        height: Dimensions.get('window').height,
        alignItems: 'center',
    },
    noNetworkImg: {
        width: scaleSize(352),
        height: scaleSize(316),
        marginTop: scaleSize(280),
        marginBottom: scaleSize(26),
    },
    noNetworkTxt: {
        color: '#9B9B9B',
        fontSize: scaleSize(28),
        marginBottom: scaleSize(332),
    },
    btnStyle: {
        width: scaleSize(360),
        height: scaleSize(88),
        borderRadius: scaleSize(44),
        backgroundColor: '#4A90E2'
    }
});
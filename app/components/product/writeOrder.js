/**
 * 产品 -> 产品详情 -> 填写订单
 */
import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

class writeOrder extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.tips}>{I18n.t('product.productDetail.' + tips[type])}</Text>
                    <Button
                        // 确定
                        title={I18n.t('public.OK')}
                        titleStyle={{color: '#FFFFFF', fontSize: scaleSize(32)}}
                        buttonStyle={styles.checkBtnStyle}
                        onPress={() => {}}
                    />
                </View>
            </ScrollView>

        );
    }
}

export default connect(
    state => ({
        wallet: state.wallet
    })
)(writeOrder)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    tips: {
        width: scaleSize(750),
        color: '#4A90E2',
        fontSize: scaleSize(24),
        marginRight: scaleSize(43),
        marginTop: scaleSize(20),
        marginBottom: scaleSize(20),
    },
});

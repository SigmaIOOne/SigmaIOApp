/**
 * 产品
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

class Product extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>hhahahh</Text>
            </View>
        )
    }
}

export default connect(
    state => ({
        wallet: state.wallet
    })
)(Product)

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF',
    },
});
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

class AboutUs extends Component {
    render() {
        return (
            <View><Text>llll</Text></View>
        );
    }
}

export default connect(
    state => ({
        wallet: state.wallet
    })
)(AboutUs)

const styles = StyleSheet.create({

});

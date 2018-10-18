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
    _renderSelectItem = (data) => {
        return (
            <TouchableOpacity
                onPress={() => data.pressFunc()}
            >
                <View style={styles.item}>
                    <View style={styles.itemLeft}>
                        <Image style={styles.itemIcon} source={data.icon} />
                        <Text style={styles.itemTitle}>{I18n.t(data.title)}</Text>
                    </View>
                    <View style={styles.itemRight}></View>
                    <Image style={styles.rightArrow} source={require('../../assets/images/my/right_arrow.png')} />
                </View>
            </TouchableOpacity>
        );
    }

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

/**
 * 通用加载中样式
 */
import React, { Component } from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
} from 'react-native';
import { Spinner } from 'native-base';
import {scaleSize} from "./ScreenUtil";

export default class MySpinner extends Component {
    render() {
        return (
            <Spinner color='#4A90E2' style={styles.spinnerStyle}/>
        );
    }
}

const styles = StyleSheet.create({
    spinnerStyle: {
        height: Dimensions.get('window').height - StatusBar.currentHeight - scaleSize(100)
    }
});
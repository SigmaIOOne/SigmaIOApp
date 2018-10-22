/**
 * 产品 -> 轮播图
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
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class Banner extends Component {
    // 渲染顶部轮播图图片
    _renderBannerItem = ({item, index}) => {
        return (
            <View style={styles.bannerView}>
                <Image style={styles.bannerImg} source={{ uri: item.thumbnail}} />
            </View>
        );
    }
    render() {
        const bannerList = [
            {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/1.jpg'},
            {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/2.jpg'},
            {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/3.jpg'},
            
        ];
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={bannerList}
                renderItem={this._renderBannerItem}
                sliderWidth={scaleSize(750)}
                itemWidth={scaleSize(666)}
                />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF',
    },
    bannerView: {
        width: scaleSize(750),
        height: scaleSize(416),
        backgroundColor: '#abcdef',
        marginTop: scaleSize(40),
    },
    slide: {
        marginTop: scaleSize(40)
    },
    bannerImg: {
        width: scaleSize(750),
        height: scaleSize(416),
    },
});
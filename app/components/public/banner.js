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

class Product extends Component {
    // 渲染顶部轮播图图片
    _renderBannerItem = ({item, index}, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.thumbnail }}
                    containerStyle={styles.imageContainer}
                    style={styles.bannerImg}
                    parallaxFactor={0}
                    {...parallaxProps}
                />
                {/*<Text style={styles.title} numberOfLines={2}>*/}
                {/*{ item.title }*/}
                {/*</Text>*/}
            </View>
        );
    }
    render() {
        const bannerList = [
            {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/1.jpg'},
            {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/2.jpg'},
            {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/3.jpg'},
            {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/4.jpg'},
            {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/5.jpg'},
            {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/6.jpg'},
        ];
        return (
            <View style={styles.container}>
                <View>
                    <Carousel
                        data={bannerList}
                        renderItem={this._renderBannerItem}
                        sliderWidth = {scaleSize(750)}
                        itemWidth = {scaleSize(666)}
                        hasParallaxImages={true}
                    />
                </View>
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
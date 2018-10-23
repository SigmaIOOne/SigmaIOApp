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
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { I18n } from '../../../language/i18n';
import { scaleSize } from '../../utils/ScreenUtil';

export default class Banner extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            bannerList : [
                {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/1.jpg'},
                {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/2.jpg'},
                {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/3.jpg'},
                {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/1.jpg'},
                {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/2.jpg'},
                {thumbnail: 'http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201304/jiaoben828/img/3.jpg'},
            ],
            activeSlide: 1
		};
    }
    get pagination () {
        return (
            <Pagination
                dotsLength={this.state.bannerList.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 235, 25, 0)'
                }}
                dotColor={'red'}
                inactiveDotColor={'yellow'}
                dotContainerStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(23, 253, 215, 0)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                />
        );
    }
    
    // 渲染顶部轮播图图片
    _renderBannerItem = ({item, index}) => {
        return (
            <View style={styles.bannerView}>
                <Image style={styles.bannerImg} source={{ uri: item.thumbnail}} />
            </View>
        );
    }

    render() {
        
        return (
            <View>
                <Carousel
                    layout={'default'}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.bannerList}
                    renderItem={this._renderBannerItem}
                    sliderWidth={scaleSize(750)}
                    itemWidth={scaleSize(666)}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                { this.pagination }
            </View>
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
        marginTop: scaleSize(60),
    },
    bannerImg: {
        width: scaleSize(666),
        height: scaleSize(346),
        borderRadius: scaleSize(20)
    },
});
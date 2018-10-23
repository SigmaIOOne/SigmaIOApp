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
            activeSlide: 0
		};
    }
    get pagination () {
        return (
            <Pagination
                dotsLength={this.state.bannerList.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ backgroundColor: '#fff' }}
                dotColor={'rgba(232,232,232,1)'}
                inactiveDotColor={'rgba(155,155,155,1)'}
                dotContainerStyle={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginHorizontal: 8,
                }}
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
            <View style={{ height: scaleSize(520) }}>
                <Carousel
                    layout={'default'}
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.bannerList}
                    renderItem={this._renderBannerItem}
                    sliderWidth={scaleSize(750)}
                    itemWidth={scaleSize(666)}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                <Pagination dotsLength={this.state.bannerList.length} activeDotIndex={this.state.activeSlide}/>
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
        height: scaleSize(406),
        marginTop: scaleSize(40),
    },
    bannerImg: {
        width: scaleSize(666),
        height: scaleSize(346),
        borderRadius: scaleSize(20)
    },
});
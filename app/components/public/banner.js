/**
 * 产品 -> 轮播图
 */
import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { scaleSize } from '../../utils/ScreenUtil';

export default class Banner extends Component {
    static propTypes = {
        bannerData: PropTypes.array,
        clickToProductDetail: PropTypes.func,
    }
    constructor(props) {
		super(props);
		this.state = {
            activeSlide: 0
		};
    }
    get pagination () {
        return (
            <Pagination
                dotsLength={this.props.bannerData.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ backgroundColor: '#fff' }}
                dotColor={'rgba(232,232,232,1)'}
                inactiveDotColor={'rgba(155,155,155,1)'}
                dotContainerStyle={{
                    width: 5,
                    height: 5,
                    // borderRadius: 5,
                    marginHorizontal: 8,
                }}
                />
        );
    }
    
    // 渲染顶部轮播图图片
    _renderBannerItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.bannerView} key={index} onPress={() => this.props.clickToProductDetail(item.type)}>
                <Image style={styles.bannerImg} source={item.thumbnail}/>
            </TouchableOpacity>
        );
    }

    render() {

        return (
            <View style={{ height: scaleSize(514) }}>
                <Carousel
                    layout={'default'}
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.bannerData}
                    renderItem={this._renderBannerItem}
                    sliderWidth={scaleSize(750)}
                    itemWidth={scaleSize(666)}
                    autoplay={true}
                    autoplayInterval={2000}
                    loop={true}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                    />
                <Pagination dotsLength={this.props.bannerData.length} activeDotIndex={this.state.activeSlide}/>
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
        // borderRadius: scaleSize(20)
    },
});
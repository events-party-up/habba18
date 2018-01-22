import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    ImageBackground,
    Dimensions
} from 'react-native';
import { itemWidth, sliderWidth } from '../../utils/global';
import CategoryCard from '../category-card'
import { observer, inject } from 'mobx-react/native';
import Carousel from 'react-native-snap-carousel';

import styles from './styles';

const { width } = Dimensions.get('window')

@inject('eventStore') @observer
export default class EventList extends Component {
    render() {
        return (
            <ImageBackground source={{ uri: "http://www.nelsonvenues.co.nz/uploads/1/0/1/2/101257066/event-placeholder_1_orig.jpg" }} style={{ width: sliderWidth, flex: 1 }}>
                <Carousel
                    style={{ flex: 1 }}
                    ref={c => { this.carousel = c }}
                    data={this.props.eventStore.eventList.slice()}
                    renderItem={({ item, index }) => <CategoryCard item={item} />}
                    sliderWidth={sliderWidth}
                    itemWidth={width / 1.5}
                />
            </ImageBackground>
        )
    }
}
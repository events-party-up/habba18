import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    FlatList,
    WebView,
    Image,
    TouchableWithoutFeedback,
    Modal,
    ImageBackground,
} from 'react-native';
import PopupDialog from 'react-native-popup-dialog';
import FitImage from 'react-native-fit-image';
import ElevatedView from 'react-native-elevated-view'
import LinearGradient from 'react-native-linear-gradient';
import { UIActivityIndicator } from 'react-native-indicators';
import { BlurView } from 'react-native-blur';
import { observer, inject } from 'mobx-react/native';

import Header from '../header';
import { width } from '../../constants';
import styles from './styles';
import BG from '../../images/xx.jpg'

const uri = 'https://unsplash.com/photos/32ZvquJMY80'
// import styles from './styles';
@inject('feedStore') @observer
export default class Auth extends Component {
    state = {
        video: "jl1ONpVYih8",
        modalVisible: false
    }
    _renderItem = ({ item }) => {
        isImageURL = item.resources.slice(0, 4) === "http";
        console.log(item.resources, isImageURL)
        uri = isImageURL ? item.resources : `https://i.ytimg.com/vi/${item.resources}/hqdefault.jpg`
        return (
            <View style={styles.elevatedCard}>
                <BlurView  style={{ flex: 1 }} >
                    <View style={styles.text}>
                        <Text style={styles.headingText}>{item.heading || ''}</Text>
                        <Text style={styles.captionText}>{item.caption || ''}</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => {
                        if (item.resources.slice(0, 4) !== "http") {
                            this.setState({
                                video: item.resources
                            });
                            this.openModal();
                        }
                    }}>
                        <View>
                            <FitImage source={{ uri: uri || 'https://i.ytimg.com/vi/ScMzIvxBSi4/maxresdefault.jpg' }} indicator={true} style={{}} />
                            {/* <FitImage source={{ uri }} style={{ height: 108 * 2, width: 192 * 2 }} /> */}
                            {!isImageURL &&
                                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../../icons/play.png')} style={{ height: 16.7 * 3, width: 24 * 3, }} />
                                </View>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </BlurView>
            </View>
        )
    }
    closeModal() {
        this.setState({ modalVisible: false });
    }
    openModal() {
        this.setState({ modalVisible: true })
    }
    render() {
        onShouldStartLoadWithRequest = (navigator) => {
            this.videoPlayer.stopLoading(); //Some reference to your WebView to make it stop loading that URL
            return false;

        }
        if (this.props.feedStore.isFeedFetching)
            return <UIActivityIndicator animating />
        return (
            <View style={{ flex: 1 }} >
                {/* <LinearGradient
                    // start={{ x: 0, y: 1 }}
                    // end={{ x: 1, y: 1 }}
                    colors={['#43cea2', '#185a9d']}
                    style={{
                        height: '40%', width: '100%'
                    }}>
                </LinearGradient> */}
                <ImageBackground source={BG} style={{ width: '100%', height: '100%' }} resizeMode='cover'>
                    <FlatList
                        data={this.props.feedStore.allFeed}
                        style={styles.scrollView}
                        renderItem={this._renderItem}
                        keyExtractor={i => i.id}
                        ListHeaderComponent={() => (
                            <View style={[styles.elevatedCard, { marginBottom: 10 }]}>
                                <BlurView blurType='light' style={{ flex: 1 }} >
                                    <View style={{ padding: 10 }}>
                                        <Text style={[{ textAlign: 'center' }, styles.text]}>
                                            News Feed
                                    </Text>
                                    </View>
                                </BlurView>
                            </View>
                        )}
                    />
                    <Modal
                        visible={this.state.modalVisible}
                        animationType={'slide'}
                        onRequestClose={() => this.closeModal()}
                        transparent
                    >
                        <BlurView blurType="light" style={{ flex: 1, justifyContent: 'center' }}>

                            <View style={{ height: '45%', width: '100%' }}>

                                <WebView
                                    ref={(ref) => { this.videoPlayer = ref; }}
                                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                                    onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
                                    javaScriptEnabled={true}
                                    // source={{ html: `<iframe width="250" height="200" src="https://www.youtube.com/embed/${this.state.video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>` }}
                                    source={{ uri: `https://www.youtube.com/embed/${this.state.video}` }}
                                />
                                <TouchableWithoutFeedback onPress={() => { this.setState({ modalVisible: false }) }}>
                                    <View>
                                        <Text style={styles.closeText}>Close</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </BlurView>
                    </Modal>
                </ImageBackground>
            </View >
        )
    }
    componentWillMount() {
        this.props.feedStore.fetchFeed()
    }
}
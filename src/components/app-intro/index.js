import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'

// import styles from './styles';
const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 320,
        height: 320,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    }
});
_renderItem = props => (
    <LinearGradient
        style={[styles.mainContent, {
            paddingTop: props.topSpacer,
            paddingBottom: props.bottomSpacer,
            width: props.width,
            height: props.height,
        }]}
        colors={props.colors}
        start={{ x: 0, y: .1 }} end={{ x: .1, y: 1 }}
    >
        <Image source={props.image} style={styles.image} />
        <View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    </LinearGradient>
);
const slides = [
    {
        key: 'somethun',
        title: 'Quick setup, good defaults',
        text: 'React-native-app-intro-slider is easy to setup with a small footprint and no dependencies. And it comes with good default layouts!',
        image: require('../../images/intro1ios.gif'),
        colors: ['#63E2FF', '#B066FE'],
    },
    {
        key: 'somethun1',
        title: 'Super customizable',
        text: 'The component is also super customizable, so you can adapt it to cover your needs and wants.',
        image: require('../../images/intro2ios.gif'),
        colors: ['#A3A1FF', '#3A3897'],
    },
    {
        key: 'somethun2',
        title: 'No need to buy me beer',
        text: 'Usage is all free',
        image: require('../../images/intro3ios.gif'),
        colors: ['#29ABE2', '#4F00BC'],
    },
];
export default class extends Component {
    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="md-arrow-round-forward"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    }
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Icon
                    name="md-checkmark"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    }
    render() {

        return (
            <AppIntroSlider
                slides={slides}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
                renderItem={_renderItem}
                onDone={() => {this.props.close()}}
            />
        );
    }
    componentDidMount = async () => {
        await AsyncStorage.setItem('appIntro', 'yes')
    }
}
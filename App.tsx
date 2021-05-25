import React from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator,StatusBar} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'
import * as ScreenOrientation from 'expo-screen-orientation';
import {  activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import Clock from './page/Clock'
import Tomato from './page/Tomato'
import {unsplash} from './utils'
// @ts-ignore
import jumpIcon0 from './assets/rotate-right0.png'
// @ts-ignore
import jumpIcon1 from './assets/rotate-right1.png'
// @ts-ignore
import themeIcon from './assets/mdi_av-timer.png'
// @ts-ignore
import orientationIcon from './assets/Swap.png'

let timer;
let screenListener: any;

export default class App extends React.Component {

    unsplash: any = null;
    timer: any;
    state = {
        page: 0,
        bg: '',
        progress: false,
        orientation: 'LANDSCAPE_RIGHT'
    }


    async componentDidMount() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
        activateKeepAwake()
        this.unsplash = new unsplash()
        await this.handleChangeBg()

    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    handleJump = () => {
        const {page} = this.state;
        this.setState({
            page: Number(!page)
        })
    }

    handleChangeBg = async () => {
        const url = await this.unsplash.change();
        console.log('图片', url)
        this.setState({
            bg: url
        })
    }

    handleLoading = (begin: boolean) => {
        this.setState({
            progress: begin
        })
    }

    handleChangeOrientation = async () => {
        const {orientation} = this.state;
        const currentOrientation = orientation === 'LANDSCAPE_RIGHT' ? 'LANDSCAPE_LEFT' : 'LANDSCAPE_RIGHT'
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock[currentOrientation])
        this.setState({
            orientation: currentOrientation
        })
    }

    render() {
        const {page, bg = '', progress} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <ActivityIndicator
                    style={
                        {
                            position: 'absolute',
                            zIndex: 999,
                            top: 10,
                            left: '50%',
                            marginLeft: -20
                        }
                    }
                    color={'#8be32f'}
                    size={'small'}
                    animating={progress}
                />
                <View style={styles.bgContainer}>
                    {!!bg && <Image onLoadEnd={() => {
                        this.handleLoading(false)
                    }} onLoadStart={() => {
                        this.handleLoading(true)
                    }} style={styles.bg} source={{uri: bg}}/>}
                </View>
                <View style={styles.jumpIcon}>
                    <TouchableOpacity
                        style={styles.iconTouchable}
                        onPress={this.handleJump}
                    >
                        <Image source={page === 0 ? jumpIcon0 : jumpIcon1}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.iconTouchable}
                        onPress={this.handleChangeBg}
                    >
                        <Image style={styles.iconContent} source={themeIcon}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.jumpIcon, {left: 0}]}>
                    <TouchableOpacity
                        style={styles.iconTouchable}
                        onPress={this.handleChangeOrientation}
                    >
                        <Image style={styles.iconContent} source={orientationIcon}/>
                    </TouchableOpacity>
                </View>

                {page === 0 && <Clock/>}
                {page === 1 && <Tomato/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    bgContainer: {
        position: "absolute",
        backgroundColor: '#1E1C1C',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9
    },
    bg: {
        width: '100%',
        height: '100%'
    },
    jumpIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    iconTouchable: {width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'},
    iconContainer: {
        position: 'absolute',
        width: 50,
        height: 50,
        right: 0,
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 998,
    },
    iconContent: {}
})

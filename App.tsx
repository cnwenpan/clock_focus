import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Clock from './page/Clock'
import Tomato from './page/Tomato'
// @ts-ignore
import jumpIcon0 from './assets/rotate-right0.png'
// @ts-ignore
import jumpIcon1 from './assets/rotate-right1.png'

let timer;

export default class App extends React.Component {
    state={
        page:0,
    }

    componentDidMount() {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);

    }

    handleJump=()=>{
        const {page}=this.state;
        this.setState({
            page:Number(!page)
        })
    }

    render() {
    const {page}=this.state;
        return (
            <View style={styles.container}>
                <View style={styles.jumpIcon}>
                    <TouchableOpacity
                        onPress={this.handleJump}
                    >
                        <Image source={page===0?jumpIcon0:jumpIcon1}/>
                    </TouchableOpacity>
                </View>
                {page===0&&<Clock />}
                {page===1&&<Tomato />}
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        position:'relative'
    },
    jumpIcon: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex:999,
    }
})

import React from 'react';
import {StyleSheet, Text, View, Image, Switch} from 'react-native';
import moment from "moment";
import {Audio} from 'expo-av'
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler'
import {TimeShow} from "../components/TimeShow";
import {Feather} from '@expo/vector-icons';
// @ts-ignore
import settingIcon from "../assets/setting.png";

let timer: any
let timer_tip_audio: any

export default class Tomato extends React.Component {
    private TipSound: any;
    private heartBrokeSound: any;
    private _drawer: any;

    constructor(props: any) {
        super(props);
        Audio.Sound.createAsync(
            require('../assets/water_drop.wav')
        ).then(res => {
            this.TipSound = res.sound;
        })
        Audio.Sound.createAsync(
            require('../assets/heart_broke.mp3')
        ).then(res => {
            this.heartBrokeSound = res.sound;
            this.heartBrokeSound.setIsLoopingAsync(true)
            this.heartBrokeSound.playAsync()
        })

    }

    state = {
        timeText: 1620491400000,
        tip: '集中注意力！',
        rest: false,
        settingVisible: false,
        heartSound: true,
        tipSound: true,
        settingStatus: true
    }

    componentDidMount() {
        timer = setInterval(() => {
            const {timeText, rest} = this.state;
            if (timeText <= 1620489600000 && !rest) {
                this.setState({
                    timeText: 1620490200000,
                    rest: true,
                    tip: '休息一下吧~'
                })
            } else if (timeText <= 1620489600000 && rest) {
                this.setState({
                    timeText: 1620491400000,
                    rest: false,
                    tip: '集中注意力！'
                })
            } else {
                this.setState({
                    timeText: timeText - 1000
                })
            }

        }, 1000)
        this.TipSound?.playAsync();
        timer_tip_audio = setInterval(() => {
            const {tipSound} = this.state;
            if (tipSound) {
                this.TipSound?.replayAsync();
            }
        }, 10 * 1000);
    }

    componentWillUnmount() {
        clearInterval(timer)
        clearInterval(timer_tip_audio)
        this.TipSound.stopAsync();
        this.heartBrokeSound.stopAsync()
    }

    handleSetting = () => {
        console.log(1)
        if(this.state.settingVisible){
            this.setState({
                settingStatus: true
            })
        }else{
            this.setState({
                settingVisible: true
            })
        }

    }

    handleCloseSetting = () => {
        this.setState({
            settingStatus: false
        })
    }

    toggleHeartSound = () => {
        const {heartSound} = this.state;
        this.setState({
            heartSound: !heartSound
        })
        if(heartSound){
            this.heartBrokeSound.stopAsync()
        }else{
            this.heartBrokeSound.replayAsync()
        }

    }

    toggleTipSound = () => {
        const {tipSound} = this.state;
        this.setState({
            tipSound: !tipSound
        })
    }

    render() {
        const {timeText, tip, settingVisible, settingStatus} = this.state;
        return (
            <View style={styles.container}>
                <TimeShow value={moment(timeText).format('mm:ss')}/>
                <View style={{display: 'flex', flexDirection: 'row',}}>
                    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite"
                                     style={{fontSize: 30, textAlign: 'center', marginTop: -10}}>
                        ❤️
                    </Animatable.Text>
                    <Text style={{color: '#ffffff', fontSize: 20}}>{tip}</Text>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.iconTouchable}
                        onPress={this.handleSetting}
                    >
                        <Image style={{width: 17, height: 17}} source={settingIcon}/>
                    </TouchableOpacity>
                </View>
                {settingVisible && <Animatable.View
                    style={styles.setting}
                    animation={settingStatus ? 'fadeInRight' : 'fadeOutRight'}
                    ref={(ref) => {
                        this._drawer = ref
                    }}
                >
                    <View>
                        <TouchableOpacity
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                paddingTop: 10
                            }}
                            onPress={this.handleCloseSetting}
                        >
                            <Text style={[styles.font]}>
                                setting
                            </Text>
                            <Feather style={{marginRight: 20}} name="arrow-right" size={20} color="#ffffff"/>
                        </TouchableOpacity>
                        <View style={styles.setting_item}>
                            <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={this.state.heartSound ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.toggleHeartSound}
                                value={this.state.heartSound}
                            />
                            <Text style={[styles.font,{marginLeft:4}]}>心跳声</Text>
                            <Text style={styles.smallFont}>1/s</Text>
                        </View>
                        <View style={styles.setting_item}>
                            <Switch
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                // thumbColor={this.state.heartSound ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={this.toggleTipSound}
                                value={this.state.tipSound}
                            />
                            <Text style={[styles.font,{marginLeft:4}]}>水滴声</Text>
                            <Text style={styles.smallFont}>1/m</Text>
                        </View>
                    </View>


                </Animatable.View>}
            </View>
        );
    }

}

const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
        }
        ,
        time: {
            color: '#ffffff',
            fontSize: 128,
            textAlign: 'center',
            fontWeight: 'bold'
        }
        ,
        iconContainer: {
            position: 'absolute',
            width: 50,
            height: 50,
            left: 0,
            top: '50%',
            marginTop: -25,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
        },
        iconTouchable: {width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'},
        setting: {
            backgroundColor: '#232e30',
            width: 150,
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 9999
        },
        font: {
            color: '#ffffff'
        },
        smallFont: {
            color: '#928989',
            marginLeft: 4,
        },
        setting_item: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            marginTop: 4,
            marginLeft:10,
        }
    }
)

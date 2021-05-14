import Unsplash from './unsplash'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const unsplash=Unsplash

interface styleObject{
    style:object,
    status:boolean
}


//样式逻辑合并方法，对标react 的classnames。使用方法不同
export const classnames=(styles:Array<styleObject>)=>{
    let styleResult={}
    styles.forEach((item:styleObject)=>{

        // @ts-ignore
        if(item.status){
            styleResult=Object.assign(styleResult,item.style)
        }

    })
    return styleResult;
}

export const getLocalData = async (key:string) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            return value
        }
    } catch(e) {
        return ''
    }
}

export const setLocalData= (key:string,value:string)=>{
    return AsyncStorage.setItem(key,value)
}
export const removeLocalData= (key:string)=>{
    return AsyncStorage.removeItem(key)
}

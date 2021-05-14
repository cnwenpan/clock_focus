import {Alert} from "react-native";
import {getLocalData} from "./index";

interface RequestConfig {
    url: string,
    method: string,
    data?: object
}


const request = async ({url, method, data}: RequestConfig) => {
    const myHeaders = new Headers();
    console.log('网络请求：', url, data)
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                resolve(json)
            })
            .catch(e => {
                Alert.alert(e.toString())
                console.log(e)
            })
    })
}


export default request

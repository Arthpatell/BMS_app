import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ImageBackground
} from 'react-native';
import spaarglogo from '../assets/image/logo.png'
import BackgroundImage from '../assets/image/Bg.png'
import { useRoute } from '@react-navigation/native';
import Userpool from "../Config/Userpool.js"
import { CognitoUser } from "amazon-cognito-identity-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Otp from '../Components/Otp.js'
import { useNavigation } from '@react-navigation/native';

const OtpVerify = () => {
    const Navigation = useNavigation();
    const route = useRoute();
    console.log(route.params.email)
    const [otp, setOtp] = useState('')
    const [isotpClear, setIsOtpClear] = useState(false)
    const [error, setError] = useState({ key: '', message: '' })

    const handleOtp = () => {
        let loginError = { key: '', message: '', };
        console.log(otp)

        if (otp === '' || otp.trim() === '' || otp < 6) {
            loginError.key = "otpVerify",
                loginError.message = "OTP is required ",
                setError(loginError)
            console.log("hey")
        } else {
            console.log("hii")

            const user = new CognitoUser({
                Username: route.params.email,
                Pool: Userpool,
            });

            user.confirmRegistration(otp, true, (err, result) => {
                if (err) {
                    console.log(err.message || JSON.stringify(err));
                    loginError.key = "invalidOtp",
                        loginError.message = "Invalid OTP ",
                        setError(loginError)
                    setTimeout(() => {
                        setIsOtpClear(true)
                    }, 1000)
                    return;
                }
                else if (result) {
                    console.log("success");
                }
                console.log('call result: ' + result);
                loginError.key = "success",
                    loginError.message = "User Sucessfully Verified ",
                    setError(loginError)
                setTimeout(() => {
                    setIsOtpClear(true)
                }, 1000)

                setTimeout(() => {
                    Navigation.navigate('Login')
                }, 1000)
            });
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f9f9f9', paddingTop: 20 }}>
            <Image source={spaarglogo} style={styles.Spaarglogo} />

            <View>
                <ImageBackground source={BackgroundImage} style={styles.Bgimage}>
                </ImageBackground>
                <View style={{ backgroundColor: '#ffffff', height: 570, width: 350, alignSelf: 'center', borderRadius: 5, elevation: 10, marginTop: 40, padding: 20 }}>
                    <Text style={{ color: '#1e152a', alignSelf: 'center', paddingTop: 40, fontSize: 40, paddingBottom: 10 }}>
                        Verified-OTP
                    </Text>
                    <Text style={{ color: '#bebdb9', alignSelf: 'center', fontSize: 17 }}>
                        OTP sent to Your Email.{" "}
                    </Text>
                    <Text style={{ color: '#0096FF', alignSelf: 'center', fontSize: 14 }}>
                        {route.params.email}
                    </Text>
                    {error.key === 'success' && (<Text style={{ color: 'green', alignSelf: 'center', paddingHorizontal: 10, paddingTop: 20 }}>{error.message}</Text>)}
                    <Otp setOtp={setOtp} isotpClear={isotpClear} />
                    {error.key === 'otpVerify' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingHorizontal: 10, paddingTop: 20 }}>{error.message}</Text>)}
                    {error.key === 'invalidOtp' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingHorizontal: 10, paddingTop: 20 }}>{error.message}</Text>)}

                    <View style={{
                        paddingTop: 50,
                        width: 150,
                        alignSelf: 'center',
                    }}>
                        <Button title="Submit" onPress={handleOtp} />
                    </View>
                </View>
            </View>
        </View>
    )
}
export default OtpVerify;
const styles = StyleSheet.create({
    Spaarglogo: {
        height: 100,
        width: 250,
        alignSelf: 'center'
    },
    Bgimage: {
        height: 100,
        width: 400,
        position: 'absolute',
        marginTop: 590
    },
    textinputview: {

        borderBottomWidth: 1,
        width: 20,
        paddingTop: 40
    },
    Textinputstyle: {
        fontSize: 20,
        color: 'black'
    },
})
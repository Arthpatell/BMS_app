import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ToastAndroid
} from 'react-native';
import Otp from '../Components/Otp.js'
import { CognitoUser } from "amazon-cognito-identity-js";
import Userpool from "../Config/Userpool.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const Resetpassword = (props) => {
  const Navigation = useNavigation();
  const [otp, setOtp] = useState('')
  const [resetPassword, setResetPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState({ key: '', message: '' })
  const verifyPassword = () => {
    let loginError = { key: '', message: '' }
    if (otp == '' || otp.trim() == '', otp < 6) {
      loginError.key = 'otp'
      loginError.message = 'otp is required'
      setError(loginError)
    }
    else if (resetPassword == '') {
      loginError.key = 'resetPassword'
      loginError.message = 'Reset password is required'
      setError(loginError)
    } else if (confirmPassword === '') {
      console.log("here........", confirmPassword)
      loginError.key = 'confirmPassword'
      loginError.message = 'Confirm password is required'
      setError(loginError)
    } else {
      const user = new CognitoUser({
        Username: props.email,
        Pool: Userpool,
      });
      user.confirmPassword(otp, resetPassword, {
        onSuccess() {
          ToastAndroid.showWithGravity(
            "Password has been changed",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,);
          setTimeout(() => {
            Navigation.navigate('Login')
          }, 1000)
          console.log('Password confirmed!');
          setError(loginError)
        },
        onFailure(err) {
          console.log('Password not confirmed!');
          setError(loginError)
        },
      });
    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: '#ffffff', alignSelf: 'center', borderRadius: 5, padding: 20 }}>
            <Text style={{ color: 'black', alignSelf: 'flex-start', fontSize: 15, paddingTop: 50, paddingBottom: 10 }}>
              Email
            </Text>
            <TextInput
              style={styles.Emailtextinput}
              placeholderTextColor='grey'
              value={props.email}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setEmail(text)}
              editable={false}
            />
            <Text style={{ color: 'black', alignSelf: 'flex-start', paddingHorizontal: 6, fontSize: 15, paddingTop: 20 }}>
              OTP
            </Text>
            <View style={{ marginTop: -40 }}>
              <Otp setOtp={setOtp} />
            </View>
            {error.key === 'otp' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingHorizontal: 10, paddingTop: 20 }}>{error.message}</Text>)}
            <Text style={{ color: 'black', alignSelf: 'flex-start', paddingBottom: 10, fontSize: 15, paddingTop: 20 }}>
              Reset Password
            </Text>
            <TextInput
              style={styles.Emailtextinput}
              placeholderTextColor='grey'
              placeholder="Reset password"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setResetPassword(text)}
            />
            {error.key === 'resetPassword' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingHorizontal: 10, }}>{error.message}</Text>)}
            <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 20, fontSize: 15, paddingBottom: 10 }}>
              Confirm Password
            </Text>
            <TextInput
              style={styles.Emailtextinput}
              placeholderTextColor='grey'
              placeholder="Reset password"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            {error.key === 'confirmPassword' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingHorizontal: 10, paddingTop: 15 }}>{error.message}</Text>)}
            <View style={{
              paddingTop: 30,
              width: 120,
              alignSelf: 'center',
            }}>
              <Button title="Submit" onPress={verifyPassword} />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
export default Resetpassword
const styles = StyleSheet.create({
  Emailtextinput: {
    height: 40,
    width: 300,
    color: 'black',
    backgroundColor: '#f9f9f9',
    elevation: 5,
    alignSelf: 'center',
  },
})
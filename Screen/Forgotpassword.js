import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native';
import spaarglogo from '../assets/image/logo.png'
import BackgroundImage from '../assets/image/Bg.png'
import { useNavigation, NavigationAction } from '@react-navigation/native';
import Userpool from "../Config/Userpool.js"
import { CognitoUser } from "amazon-cognito-identity-js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Resetpassword from '../Components/Resetpassword';
const Forgotpassword = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [error, setError] = useState({ key: '', message: '' })
  const verifyEmail = () => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let loginError = { key: '', message: '' }
    if (email == '') {
      loginError.key = 'required Email'
      loginError.message = 'Email is required'
      setError(loginError)
    }else if (regex.test(email) === false) {
      loginError.key = "invalidEmail"
      loginError.message = "Email is invalid"
      setError(loginError)

    } else {

      console.log("verifyEmail...", email)
      const user = new CognitoUser({
        Username: email,
        Pool: Userpool,
      });
      user.forgotPassword({
        onSuccess: function (data) {
          // successfully initiated reset password request
          console.log('here....................................')
          console.log('CodeDeliveryData from forgotPassword: ',data);
          setOtpSent(true)
          setValidEmail(true)
        },
        onFailure: function (err) {
          // Alert.alert(err.message || JSON.stringify(err));
        },
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
              <Text style={{ color: '#1e152a', alignSelf: 'center', paddingTop: 40, fontSize: 35, paddingBottom: 10 }}>
                Forgot Password ?
              </Text>
              <Text style={{ color: '#bebdb9', alignSelf: 'center', fontSize: 17 }}>
                Enter your email to reset your password.
              </Text>

              {validEmail == false ?
                <React.Fragment>
                  <Text style={{ color: 'black', alignSelf: 'flex-start', paddingHorizontal: 6, paddingTop: 50, paddingBottom: 5, fontSize: 15 }}>
                    Email
                  </Text>
                  <TextInput
                    style={styles.Emailtextinput}
                    placeholderTextColor='grey'
                    placeholder="Enter Your Email"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    editable={!otpSent}
                  />
                  {error.key === 'required Email' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 10 }}>{error.message}</Text>)}
                  {error.key === 'invalidEmail' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 10 }}>{error.message}</Text>)}
                  <View style={{
                    paddingTop: 30,
                    width: 120,
                    alignSelf: 'center',
                  }}>
                    <Button title="Submit" onPress={verifyEmail} />
                  </View>
                </React.Fragment>
                :
                <Resetpassword email={email} />
              }
            </View>
          </View>
        </View>
  )
}
export default Forgotpassword
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
    // justifyContent:"space-evenly",
    marginTop: 590
  },
  Emailtextinput: {
    height: 40,
    width: 300,
    color: 'black',
    backgroundColor: '#f9f9f9',
    elevation: 5,
    alignSelf: 'center'
  },
})
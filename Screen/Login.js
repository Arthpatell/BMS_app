import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ImageBackground
} from 'react-native';
import spaarglogo from '../assets/image/logo.png'
import hidePassword from '../assets/image/hide.png'
import showPassword from '../assets/image/eye.png'
import BackgroundImage from '../assets/image/Bg.png'
import Userpool from "../Config/Userpool.js"
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../Components/authContext';

const Login = ({ navigation }) => {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('art@yopmail.com')
  const [password, setPassword] = useState('Arth@1234')
  const [error, setError] = useState({ key: '', message: '' })

  const {login} = React.useContext(AuthContext);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  const handleLogin = () => {
    let loginError = { key: '', message: '', };
    if (email === '') {
      loginError.key = "email",
        loginError.message = "Email is required ",
        setError(loginError)
    }
    else if (password == '') {
      loginError.key = "password"
      loginError.message = "password is required"
      setError(loginError)
    }
    if (loginError.key == '') {
      const user = new CognitoUser({
        Username: email,
        Pool: Userpool,
      })
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      })
      user.authenticateUser(authDetails, {
        onSuccess: async (data) => {
          console.log("on sucess", data)
          setError(loginError)
          await AsyncStorage.setItem('accessToken', JSON.stringify(data.accessToken.jwtToken));
          setTimeout(() => {
            login(JSON.stringify(data.accessToken.jwtToken));
          }, 1000);
        },
        onFailure: (err) => {
          console.log('inside err', err)
          if (err) {
            if (regex.test(email) === false) {
              loginError.key = "invalidEmail"
              loginError.message = "Email is invalid"
              setError(loginError)

            } else if (err.name === 'UserNotConfirmedException') {
              console.log("on err", err.name)
              console.log("please verify OTP")
              loginError.key = "otp"
              loginError.message = "Please verify otp"
              setError(loginError)
              setTimeout(() => {
                navigation.navigate('OtpVerify', { email: email })
              }, 1000);
              
            } else if(err.name==='NotAuthorizedException') {
              console.log("...........................")
              console.log("on err", err)
              loginError.key = "invalidCreadential"
              loginError.message = "Invalid creadential"
              setError(loginError)
              console.log("hellow", error)
            }
          }
        },
        newPasswordRequired: (data) => {
          console.log("on err", data)
        },
      })
      console.log("on loginError", loginError)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9', paddingTop: 20 }}>
      <Image source={spaarglogo} style={styles.Spaarglogo} />
      <View>
        <ImageBackground source={BackgroundImage} style={styles.Bgimage}>
        </ImageBackground>
      </View>
      <View style={{ backgroundColor: '#ffffff', height: 570, width: 350, alignSelf: 'center', borderRadius: 5, elevation: 10, marginTop: 40, padding: 20 }}>
        <Text style={{ color: '#06213e', alignSelf: 'center', paddingTop: 40, fontSize: 40, fontWeight: 'bold', paddingBottom: 10 }}>
          Sign in
        </Text>
        {error.key === 'invalidCreadential' && (<Text style={styles.wrongcreadentialtext}>{error.message}</Text>)}
        {error.key === 'otp' && (<Text style={{ color: 'red', alignSelf: 'center', paddingTop: 10 }}>{error.message}</Text>)}
        <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 50, paddingBottom: 5, }}>
          Email
        </Text>
        <View >
          <TextInput
            style={styles.Emailtextinput}
            placeholderTextColor='grey'
            placeholder="Enter Your Email"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
          />
          {error.key === 'email' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}
          {error.key === 'invalidEmail' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}

          <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 20, paddingBottom: 5, }}>
            Password
          </Text>
          <TextInput style={styles.password}
            placeholderTextColor='grey'
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!isShowPassword}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={handleShowPassword}>
            <Image
              style={styles.eyeicon}
              source={isShowPassword ? showPassword : hidePassword} />
          </TouchableOpacity>
          {error.key === 'password' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}
          <Text style={{ color: '#1791dd', paddingTop: 10 }} onPress={() => navigation.navigate('Forgotpassword')}>
            Forgot password?
          </Text>
          <View style={{
            paddingTop: 50,
            width: 200,
            alignSelf: 'center',
          }}>
            <Button title="log in" onPress={handleLogin} />
          </View>
          <Text style={{ color: 'grey', alignSelf: 'center', paddingTop: 30 }}>
            New Here ? {''}
            <Text style={{ color: '#0096FF' }} onPress={() => navigation.navigate("Registration")}>
              Create an Account
            </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}
export default Login;

const styles = StyleSheet.create({
  Spaarglogo: {
    height: 100,
    width: 250,
    alignSelf: 'center'
  },
  Emailtextinput: {
    height: 40,
    width: 310,
    color: 'black',
    backgroundColor: '#f9f9f9',
    elevation: 5,
    alignSelf: 'center'
  },
  password: {
    height: 40,
    width: 310,
    color: 'black',
    backgroundColor: '#f9f9f9',
    elevation: 5,
    alignSelf: 'center',

  },
  hideicon: {
    width: 30,
    height: 20,
    position: 'absolute',
    right: 10,
    top: 23.5
  },
  eyeicon: {
    width: 30,
    height: 20,
    position: 'absolute',
    right: 10,
    top: -30
  },
  Bgimage: {
    height: 100,
    width: 400,
    position: 'absolute',
    marginTop: 590
  },
  wrongcreadentialtext: {
    color: 'red',
    alignSelf: 'center',
    fontSize: 17,
    backgroundColor: '#fff4f8',
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    width: 310,
    alignSelf: 'center',
    textAlign: 'center',
    elevation: 10,
  }
})
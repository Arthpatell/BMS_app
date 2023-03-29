import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ImageBackground, ScrollView,
  ToastAndroid
} from 'react-native';
import spaarglogo from '../assets/image/logo.png'
import BackgroundImage from '../assets/image/Bg.png'
import hidePassword from '../assets/image/hide.png'
import showPassword from '../assets/image/eye.png'
import PhoneInput from "react-native-phone-number-input";
import RadioForm from 'react-native-simple-radio-button'
import axios from 'react-native-axios'
import { useNavigation } from '@react-navigation/native';
const Registration = () => {
  const navigation = useNavigation();
  const [phonenumber, setPhonenumber] = useState('')
  const [value, setValue] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfPassword, setIsShowConfPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [gender, setGender] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [error, setError] = useState({ key: '', message: '' })
  const data = [
    {
      label: 'Male', value: '0'
    },
    {
      label: 'Female', value: '1'
    },
  ]
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
    console.info("isShowPassword", isShowPassword)
  }
  const handleShowConfPassword = () => {
    setIsShowConfPassword(!isShowConfPassword);
    console.info("isShowPassword", isShowConfPassword)
  }
  function password_validate(password) {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(password);
  }
  const handleLogin = async () => {
    let loginError = { key: '', message: '', };
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegx = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"
    console.log(loginError)
    if (firstname === '') {
      loginError.key = "First name",
        loginError.message = "First name is required ",
        setError(loginError)
    } else if (lastname == '') {
      loginError.key = "Last name"
      loginError.message = "Last name is required"
      setError(loginError)
    } else if (phonenumber == '') {
      loginError.key = "Phonenumber"
      loginError.message = "Phone number is required"
      setError(loginError)
    }
    else if (gender == '') {
      loginError.key = "Gender"
      loginError.message = "Gender is required"
      setError(loginError)
    }
    else if (email == '') {
      loginError.key = "email"
      loginError.message = "Email is required"
      setError(loginError)
    } else if (regex.test(email) === false) {
      loginError.key = "invalidEmail"
      loginError.message = "Email is invalid"
      setError(loginError)
    } else if (password == '') {
      loginError.key = "Password"
      loginError.message = "password is required"
      setError(loginError)
    } else if (!password_validate(password)) {
      loginError.key = "invalidPassword"
      loginError.message = "password is invalid"
      setError(loginError)
    }
    else if (password != confirmpassword) {
      loginError.key = "invalidConfPassword"
      loginError.message = "Confirm password is invalid"
      setError(loginError)
    } else if (loginError.key == "") {
      const createUser = {
        name: firstname + " " + lastname,
        phone_number: phonenumber,
        gender: gender,
        email: email,
        password: password,

      }
      console.log("createUser", createUser)
      await axios.post("http://192.168.0.16:5000/api/user", createUser)
        .then(function (response) {
          console.log("response", response)
          loginError.key = "succesfully registered"
          loginError.message = "Successfully registered"
          ToastAndroid.showWithGravity(
            "Account has been created",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setTimeout(() => {
            loginError.key = ""
            loginError.message = ""
            navigation.navigate('OtpVerify', { email: email }); // Passing Value
          }, 1000)
          setError(loginError)
        })
        .catch(function (error) {
          console.log("heyy", error)
          loginError.key = "alreadyExitEmail"
          loginError.message = "Email id already exist."
          setError(loginError);
        })
    } else {
      setError(loginError)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9', paddingTop: 20 }}>
      <Image source={spaarglogo} style={styles.Spaarglogo} />
      <View>
        <ImageBackground source={BackgroundImage} style={styles.Bgimage}>
        </ImageBackground>
      </View>

      <ScrollView
        vertical showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: '#ffffff', width: 350, alignSelf: 'center', borderRadius: 5, elevation: 10, marginTop: 10, padding: 20 }}>
          <Text style={{ color: '#06213e', alignSelf: 'center', fontSize: 20, fontWeight: 'bold', paddingBottom: 10 }}>
            Create an Account
          </Text>
          {error.key === 'alreadyExitEmail' && (<Text style={{ color: 'red', alignSelf: 'center', paddingTop: 5 }}>{error.message}</Text>)}
          {error.key === 'successfully registered' && (<Text style={{ color: 'green', alignSelf: 'center', paddingTop: 5 }}>{error.message}</Text>)}
          <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 10, paddingBottom: 5, }}>
            First name
          </Text>

          <View >
            <TextInput
              style={styles.Firstnametextinput}
              placeholderTextColor='grey'
              placeholder="First name"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setFirstname(text)}
            />
          </View>

          {error.key === 'First name' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}

          <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 10, paddingBottom: 5, }}>
            Last name
          </Text>

          <View >
            <TextInput
              style={styles.Lastnametextinput}
              placeholderTextColor='grey'
              placeholder="Last name"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setLastname(text)}
            />
          </View>

          {error.key === 'Last name' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}

          <View style={{ alignSelf: 'center', elevation: 10 }}>
            <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 10, paddingBottom: 5, }}>
              Phone
            </Text>
            <PhoneInput
              defaultValue={phonenumber}
              defaultCode="IN"
              withShadow='false'
              containerStyle={{ height: 40, width: 310 }}
              textContainerStyle={{ height: 40, width: 310 }}
              textInputStyle={{ height: 40, width: 310, }}
              codeTextStyle={{ height: 25 }}
              onChangeFormattedText={text => {
                setPhonenumber(text);
              }} />
          </View>

          {error.key === 'Phonenumber' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}

          <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 10, paddingBottom: 5, }}>Gender</Text>

          <RadioForm radio_props={data} initial={value}
            formHorizontal
            labelHorizontal={false}
            style={{ paddingTop: 5, }}
            labelColor='grey'
            buttonColor='grey'
            buttonSize={10}
            onPress={(text) => setGender(text)}
          />

          {error.key === 'Gender' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}

          <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 10, paddingBottom: 5, }}>
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
          </View>

          {error.key === 'email' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}
          {error.key === 'invalidEmail' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}

          <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 10, paddingBottom: 5, }}>
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

          {error.key === 'Password' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}
          {error.key === 'invalidPassword' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}

          <Text style={{ color: 'black', alignSelf: 'flex-start', paddingTop: 10, paddingBottom: 5, }}>
            Confirm Password
          </Text>
          <TextInput style={styles.password}
            placeholderTextColor='grey'
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={!isShowConfPassword}
            onChangeText={(text) => setConfirmpassword(text)}
          />

          <TouchableOpacity onPress={handleShowConfPassword}>
            <Image
              style={styles.eyeicon}
              source={isShowConfPassword ? showPassword : hidePassword} />
          </TouchableOpacity>

          {error.key === 'invalidConfPassword' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.message}</Text>)}

          <View style={{
            paddingTop: 20,
            width: 150,
            alignSelf: 'center'
          }}>
            <Button title="Submit" onPress={handleLogin}  />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
export default Registration;
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
  Firstnametextinput: {
    height: 40,
    width: 310,
    color: 'black',
    backgroundColor: '#f9f9f9',
    elevation: 5,
    alignSelf: 'center'
  },
  Lastnametextinput: {
    height: 40,
    width: 310,
    color: 'black',
    backgroundColor: '#f9f9f9',
    elevation: 5,
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
})
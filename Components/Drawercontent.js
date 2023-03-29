import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Avatar, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import avataImage from '../assets/image/Avatarmale.png'
// import avatarfeImage from ''
import { useNavigation } from '@react-navigation/native';
import spaarglogo from '../assets/image/logo.png'
import { AuthContext } from './authContext';
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Drawercontent = (props) => {
  const Navigation = useNavigation();
  const[isshowimage,setIsShowImage]=useState(false)
  const {logout} = React.useContext(AuthContext);

  const getUser = async () => {
    const AccessToken = await AsyncStorage.getItem('accessToken');
    console.log('token.....', await AsyncStorage.getItem('accessToken'))
    console.log(`Bearer ${AccessToken.replace(/^"|"$/g, '')}`)

    await axios.get("http://192.168.0.16:5000/api/user", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AccessToken.replace(/^"|"$/g, '')}`, // auth token 
      },
    })
      .then(function (response) {
        if(response.data.gender==='0'){}
        console.log(response.data)
       

      })
      .catch(function (error) {
        console.log(" Gettask error ", error)
      })
  }
  
  useEffect(() => {
    getUser()
    
  }, [])







  const logOut = () => {
    logout()
  }
  
  return (
    <View style={{ flex: 1, backgroundColor: '#1f1e2c' }}>
      <DrawerContentScrollView {...props}>
        <View style={{backgroundColor:'white'}}>
          <Image source={spaarglogo} style={styles.Spaarglogo} />
        </View>
        {/* <View style={{ flex: 1, borderBottomWidth: 2, borderBottomColor: '#2e2d3b', paddingTop: 10, alignSelf: 'center', width: 250 }} >
        </View> */}
        <View style={styles.userinfo}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image
              source={avataImage} size={80} style={{backgroundColor:'white'}}
              // source={}
            />
            <View>
              <Title style={{ paddingHorizontal: 20, color: 'white', paddingTop: 20 }}>
                Arth Patel
              </Title>
            </View>
          </View>
        </View>
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 30 }} onPress={() => { Navigation.navigate('Dashboard') }} >
            Dashboard
          </Text>
        </View>
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 30 }} onPress={() => { Navigation.navigate('Task') }}>
            Tasks
          </Text>
        </View>
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 30 }} onPress={() => { Navigation.navigate('User management') }}>
            User management
          </Text>
        </View>
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 30 }}>
            Role management
          </Text>
        </View>
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 30 }}>
            Lead management
          </Text>
        </View>
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 30 }}>
            Company management
          </Text>
        </View>
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 30 }}>
            Industry management
          </Text>
        </View>
        <View style={{ paddingTop: 40 }}>
          <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 30 }}>
            Source management
          </Text>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <Drawer.Item
          icon={() => (
            <FontAwesomeIcon style={{ fontSize: 100 }} icon={faRightFromBracket} />
          )}
          label='Log-out'
          onPress={logOut}
        />
      </Drawer.Section>
    </View>
  )
}
export default Drawercontent;

const styles = StyleSheet.create({
  bottomDrawerSection: {
    elevation: 5,
    backgroundColor: 'white'
  },
  userinfo: {
    paddingLeft: 20
  },
  drawerSection: {
    marginTop: 15
  },
  Spaarglogo: {
    height: 50,
    width: 130,
    alignSelf: 'flex-start'

  },
})
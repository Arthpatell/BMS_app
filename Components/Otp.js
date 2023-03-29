import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Button,
    ImageBackground, ScrollView, Alert
} from 'react-native';
const Otp = (props) => {

    const [pin1, setPin1] = useState('');
    const pin1Ref = useRef(null)
    const [pin2, setPin2] = useState('');
    const pin2Ref = useRef(null)
    const [pin3, setPin3] = useState('');
    const pin3Ref = useRef(null)
    const [pin4, setPin4] = useState('');
    const pin4Ref = useRef(null)
    const [pin5, setPin5] = useState('');
    const pin5Ref = useRef(null)
    const [pin6, setPin6] = useState('');
    const pin6Ref = useRef(null)

    useEffect(() => {
        props.setOtp(pin1 + pin2 + pin3 + pin4 + pin5 + pin6)
        },[pin1, pin2, pin3, pin4, pin5, pin6])

    useEffect(()=> {
        if(props.isotpClear == true) {
            setPin1('')
            setPin2('')
            setPin3('')
            setPin3('')
            setPin4('')
            setPin5('')
            setPin6('')
        }
    },[props.isotpClear])
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', justifyContent: 'space-around' }}>
            <View style={styles.textinputview}>
                <TextInput
                    ref={pin1Ref}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    onChangeText={text => {
                        text && pin2Ref.current.focus()
                        setPin1(text)
                        
                    }}

                    defaultValue={pin1}
                    style={styles.Textinputstyle}
                />
            </View>
            <View style={styles.textinputview}>
                <TextInput
                    ref={pin2Ref}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    onChangeText={text => {
                        text ? pin3Ref.current.focus() : pin1Ref.current.focus()
                        setPin2(text)
                        
                    }}
                    defaultValue={pin2}
                    style={styles.Textinputstyle}
                />
            </View>
            <View style={styles.textinputview}>
                <TextInput
                    ref={pin3Ref}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    onChangeText={text => {
                        text ? pin4Ref.current.focus() : pin2Ref.current.focus()
                        setPin3(text)
                        
                    }}
                    defaultValue={pin3}
                    style={styles.Textinputstyle} />
            </View>
            <View style={styles.textinputview}>
                <TextInput
                    ref={pin4Ref}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    onChangeText={text => {
                        text ? pin5Ref.current.focus() : pin3Ref.current.focus()
                        setPin4(text)
                        
                    }}

                    defaultValue={pin4}
                    style={styles.Textinputstyle}
                />
            </View>
            <View style={styles.textinputview}>
                <TextInput
                    ref={pin5Ref}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    onChangeText={text => {
                        text ? pin6Ref.current.focus() : pin4Ref.current.focus();
                        setPin5(text)
                        
                    }}

                    defaultValue={pin5}
                    style={styles.Textinputstyle}

                />
            </View>
            <View style={styles.textinputview}>
                <TextInput
                    ref={pin6Ref}
                    keyboardType={'number-pad'}
                    maxLength={1}
                    onChangeText={text => {
                        text ? pin6Ref.current.focus() : pin5Ref.current.focus();
                        setPin6(text)
                        
                    }}
                    defaultValue={pin6}
                    style={styles.Textinputstyle}
                />
            </View>
        </View>

    )
}
export default Otp;
const styles = StyleSheet.create({
    textinputview: {

        borderBottomWidth: 1,
        width: 20,
        paddingTop: 40,
        
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    Textinputstyle: {
        fontSize: 20,
        color: 'black'
    },
})
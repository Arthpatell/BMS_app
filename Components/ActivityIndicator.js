
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const loadingScreen = (props) => {
    return (
        <View >
            <ActivityIndicator size='large' visible={true} color='black' />
        </View>
    )
}
export default loadingScreen;
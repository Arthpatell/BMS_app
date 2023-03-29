import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screen/Login.js";
import Registration from "../Screen/Registration.js";
import OtpVerify from "../Screen/OtpVerify.js";
import Forgotpassword from "../Screen/Forgotpassword.js";
import Dashboard from "../Screen/Dashboard.js";

const RootStackScreen = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}  initialRouteName="Login">
            <Stack.Group>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registration" component={Registration} />
                <Stack.Screen name="OtpVerify" component={OtpVerify} />
                <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
            </Stack.Group>
        </Stack.Navigator>
    )
}
export default RootStackScreen;
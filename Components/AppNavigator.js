import React, { useEffect, useState } from "react";
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import Task from "../Screen/Task";
import Usermanagement from "../Screen/Usermanagement.js";
import Drawercontent from './Drawercontent'
import Dashboard from "../Screen/Dashboard";
const AppNavigator = () => {
    const Drawer = createDrawerNavigator()
    return (
        <Drawer.Navigator screenOptions={{ headerShown: true }} initialRouteName="Dashboard" drawerContent={props => <Drawercontent{...props} />} >
            <Drawer.Screen name="Dashboard" component={Dashboard} />
            <Drawer.Screen name="Task" component={Task} />
            <Drawer.Screen name="User management" component={Usermanagement} />
        </Drawer.Navigator>
    )
}
export default AppNavigator;

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View, ScrollView, TouchableOpacity, ToastAndroid, Button, Alert
} from 'react-native';
import { FAB, Switch } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';


import TaskModel from '../Components/TaskModel';
import Dropdownlist from '../Components/Dropdownlist'
import LoadingScreen from '../Components/ActivityIndicator';


const Dashboard = () => {
  const [showmodal, setShowmodal] = useState(false)
  const [tasks, setTasks] = useState([])
  const [userId, setUserId] = useState()
  const [error, setError] = useState({ key: '', value: '' })
  const [visible, setVisible] = React.useState(false);
  const [curTask, setCurTask] = useState();
  const [selStatus, setSelStatus] = useState();
  const [isloading, setIsLoading] = useState(false)
  const [session, setSession] = useState()
  const [isSwitchOn, setIsSwitchOn] = useState(false);


  const onChangeStatus = (taskId) => {
    Alert.alert(taskId)
  }
  const getUser = async () => {
    const AccessToken = await AsyncStorage.getItem('accessToken');
    console.log('token.....', await AsyncStorage.getItem('accessToken'))
    console.log(`Bearer ${AccessToken.replace(/^"|"$/g, '')}`)

    await axios.get("http://192.168.1.57:5000/api/user", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AccessToken.replace(/^"|"$/g, '')}`, // auth token 
      },
    })
      .then(function (response) {
        console.log(response.data)
        setUserId(response.data.user_id)

      })
      .catch(function (error) {
        console.log(" Gettask error ", error)
      })
  }

  useEffect(() => {
    getUser()
    getTasks()
    getSession()
  }, [])


  useEffect(() => {
    getTasks()
  }, [selStatus])


  const getTasks = async () => {
    setIsLoading(true)
    const header = await AsyncStorage.getItem('accessToken')
    console.log('header', header)
    await axios.get("http://192.168.1.57:5000/api/task", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${header.replace(/^"|"$/g, '')}`, // auth token 
      }

    }).then(function (response) {
      if (!selStatus || selStatus == '1') {
        setTasks(response.data.pendingTasks.concat(response.data.doneTasks))
      } else if (selStatus == '2') {
        setTasks(response.data.pendingTasks)
      } else if (selStatus == '3') {
        setTasks(response.data.doneTasks)
      }
    }).catch(function (error) {
      console.log("Error..........", error)
      setTasks([])
    })
    setIsLoading(false)
  }

  const deleteTask = async (taskId) => {
    const header = await AsyncStorage.getItem('accessToken')
    axios.delete("http://192.168.1.57:5000/api/task/" + taskId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${header.replace(/^"|"$/g, '')}`, // auth token 
      }
    })
      .then(response => {
        console.log("deleted successfully!")
        ToastAndroid.showWithGravity(
          "Task has been deleted successfully",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,)
        getTasks()
      })
  }

  const getSession = async () => {
    const header = await AsyncStorage.getItem('accessToken')
    await axios.get("http://192.168.1.57:5000/api/session", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${header.replace(/^"|"$/g, '')}`, // auth token 
      },
    }).then(function (response) {
      console.log('get session....', response.data.data)
      setSession(response.data.data)
    }).catch(function (error) {
      console.log("Error..........", error)
    })
  }

  const startSession = async () => {
    const header = await AsyncStorage.getItem('accessToken')
    await axios.post("http://192.168.1.57:5000/api/session", null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${header.replace(/^"|"$/g, '')}`, // auth token 
      },
    }).then(function (response) {
      console.log(response.data)
      setSession(response.data.data)
    }).catch(function (error) {
      console.log("Error..........", error)
    })
  }

  const closeSession = async () => {
    const header = await AsyncStorage.getItem('accessToken')
    await axios.put("http://192.168.1.57:5000/api/session-close/" + session.sessionId, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${header.replace(/^"|"$/g, '')}`, // auth token 
      },
    })
      .then(function (response) {
        console.log('response')
        console.log(response)
        setSession()
        getTasks()
        // ToastAndroid.showWithGravity(
        //   "Task has been updated",
        //   ToastAndroid.SHORT,
        //   ToastAndroid.CENTER,)
      })
      .catch(function (error) {
        console.log("Error", error)
      })

  }

  const updateTask = async (createTask) => {
    const header = await AsyncStorage.getItem('accessToken')

    await axios.put("http://192.168.1.57:5000/api/task/" + createTask._id,createTask, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${header.replace(/^"|"$/g, '')}`, // auth token 
      },
    })
      .then(function (response) {
        console.log('response')
        console.log(response)
      
      })
      .catch(function (error) {
        console.log("Error", error)
      })
  }

  const handleOnClickAddOrEditTask = (task) => {
    setCurTask(task);
    setShowmodal(true)
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white', backgroundColor: '#e0ebf1' }}>
      <ScrollView>
        <View style={{ marginLeft: 280 }}>
          <Dropdownlist setSelStatus={setSelStatus} />
        </View>
        <Text style={{ color: 'black', fontSize: 20, position: 'absolute', paddingHorizontal: 10, marginTop: 20 }}> Total task : {tasks ? tasks.length : 0}</Text>
        <View style={{ paddingTop: 20, padding: 10 }}>
          {session && session.sessionId ? (
            <TouchableOpacity onPress={closeSession} style={{
              backgroundColor: '#da214b',
              width: 150,
              height: 30,
              borderRadius: 4,
              elevation: 10
            }}>
              <Text style={styles.cancelButton}  >
                End Session
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startSession} style={{
              backgroundColor: '#47be7e',
              width: 150,
              height: 30,
              borderRadius: 4,
              elevation: 10
            }}>
              <Text style={styles.cancelButton}  >
                Start Session
              </Text>
            </TouchableOpacity>
          )}
          {
            (isloading ?
              (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 250 }}>
                  <LoadingScreen isloading={setIsLoading} />
                </View>
              ) : (
                <View style={{ paddingTop: 20 }}>

                  {tasks && tasks.map((task, index) => {
                    return (
                      <View key={index} style={{ backgroundColor: 'white', borderRadius: 5, paddingHorizontal: 10, borderColor: 'grey', flexDirection: 'column', marginBottom: 10 }}>
                        <TouchableOpacity onPress={() => deleteTask(task._id)}>
                          <FontAwesomeIcon style={{ fontSize: 100, alignSelf: 'flex-end', marginTop: 10, paddingHorizontal: 20 }} icon={faTrashCan} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={() => handleOnClickAddOrEditTask(task)}>
                          <FontAwesomeIcon style={{ fontSize: 100, marginTop: -16, marginLeft: 290, paddingHorizontal: 20 }} icon={faPenToSquare} />
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'flex-start', position: 'absolute' }}>
                          <Switch value={task.status=='DONE'} onValueChange={() => updateTask(task)}  />
                         
                          {console.log("hey", isSwitchOn)}
                        </View>
                        <Text style={{ color: 'grey',position:'relative',paddingHorizontal:30,marginTop:-20 }}> {task.status}</Text>
                        <Text style={{ color: 'black', borderBottomWidth: 1, borderColor: '#e9f2f7', padding: 10, }}>{task.title}</Text>
                        <Text style={{ color: 'grey', padding: 10 }}>{task.description}</Text>

                      </View>
                    )
                  })}

                </View>))
          }

        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 30, right: 30, alignSelf: 'flex-end' }}>
        <View  >
          <FAB
            small
            icon="plus"
            onPress={handleOnClickAddOrEditTask}
          />
        </View>
      </View>
      <TaskModel showmodal={showmodal} setShowmodal={setShowmodal} getTasks={getTasks} task={curTask} setTask={setCurTask} userId={userId} />
    </View>
  )
}
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    backgroundColor: 'white'
  },
  cancelButton: {
    alignSelf: 'center',
    paddingTop: 5,
    color: 'black',

  }
})

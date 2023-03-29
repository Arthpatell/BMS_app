import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput, Modal, ScrollView, TouchableOpacity, ToastAndroid, Alert, ActivityIndicator
} from 'react-native';
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoadingScreen from '../Components/ActivityIndicator'
const TaskModel = (props) => {
  const [title, setTitle] = useState()
  const [id, setId] = useState()
  const [description, setDescription] = useState()
  const [error, setError] = useState({ key: '', value: '' })
  const [isloading, setIsLoading] = useState(false)


  useEffect(() => {
    setError({ key: '', value: '' })
    setId(props?.task?._id);
    setTitle(props?.task?.title)
    setDescription(props?.task?.description)
  }, [props.showmodal])



  const handleSubmitTask = async () => {
    let creatTask = { key: '', value: '' }
    if (!title || title.trim() === '') {
      console.log(title)
      creatTask.key = 'Task'
      creatTask.value = 'required task'
      setError(creatTask)
    }

    else if (!description || description.trim() === '') {
      creatTask.key = 'discription'
      creatTask.value = 'required discription'
      setError(creatTask)
    } else {
      console.log('task.......', title, description)
      const createTask = {
        title: title,
        description: description,
        userId: props.userId
      }
      console.log('createTask.....', createTask)
      if (id && id.trim() != '') {
        await updateTask(createTask)
      } else {
        await addTask(createTask)
      }
      props.getTasks();
    }

    setError(creatTask)
  }

  const addTask = async (createTask) => {
    setIsLoading(true)
    const header = await AsyncStorage.getItem('accessToken')

    await axios.post("http://192.168.1.57:5000/api/task", createTask, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${header.replace(/^"|"$/g, '')}`, // auth token 
      },
    })
      .then(function (response) {
        console.log('response')
        console.log(response)
        ToastAndroid.showWithGravity(
          "Task has been created",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,)
      })
      .catch(function (error) {
        console.log("Error", error)
      })
    setIsLoading(false)
    handleHideModal()
  }

  const updateTask = async (createTask) => {
    const header = await AsyncStorage.getItem('accessToken')

    await axios.put("http://192.168.1.57:5000/api/task/" + id, createTask, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${header.replace(/^"|"$/g, '')}`, // auth token 
      },
    })
      .then(function (response) {
        console.log('response')
        console.log(response)
        handleHideModal()
        ToastAndroid.showWithGravity(
          "Task has been updated",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,)
      })
      .catch(function (error) {
        console.log("Error", error)
      })
  }
  const handleHideModal = () => {
    props.setShowmodal(false)
    props.setTask()
  }

  return (
    <View>

      <Modal
        transparent={true}
        visible={props.showmodal}>


        <View style={styles.modalOuterLayout}>

          <ScrollView>
            <View style={styles.modalInnerLayout}>

              <Text style={styles.creatTask}>
                Create Task
              </Text>
              <View style={styles.borderView}>
              </View>
              <View>
                <Text style={styles.creatTask}>
                  Title
                </Text>
                <TextInput
                  style={styles.titleInput}
                  placeholder={'Enter title here...'}
                  placeholderTextColor='grey'
                  value={title}
                  onChangeText={(text) => setTitle(text)}

                />
                {error.key === 'Task' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.value}</Text>)}
                <Text style={styles.Description}>
                  Description
                </Text>

                <TextInput
                  style={styles.discriptionInput}
                  placeholder={'Enter Description here...'}
                  placeholderTextColor='grey'
                  multiline={true}
                  value={description}
                  numberOfLines={10}
                  onChangeText={(text) => setDescription(text)}
                />
                {error.key === 'discription' && (<Text style={{ color: 'red', alignSelf: 'flex-start', paddingTop: 5 }}>{error.value}</Text>)}
              </View>
              {isloading ? (
                  <LoadingScreen isloading={setIsLoading} />
              ) : (
                <>
                  <View style={styles.submitButtonOuterLayout}>
                    <TouchableOpacity onPress={handleSubmitTask}>
                      <View style={styles.submitButtonInnerLayout}>
                        <Text style={styles.submit}  >
                          Submit
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cancelButtonOuterLayout}>
                    <TouchableOpacity onPress={handleHideModal}>
                      <View style={styles.cancelButtonInnerLayout}>
                        <Text style={styles.cancel}  >
                          Cancel
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>)}
            </View>
          </ScrollView>
        </View>

      </Modal>

    </View>
  )
}

export default TaskModel;

const styles = StyleSheet.create({
  modalOuterLayout: {
    backgroundColor: "#000000aa",
    flex: 1,
  },
  modalInnerLayout: {
    backgroundColor: 'white',
    margin: 50,
    padding: 20,
    borderRadius: 10,
    height:590
  },
  creatTask: {
    color: 'black',
    fontSize: 30
  },
  borderView: {
    borderColor: '#f0f0f0',
    borderWidth: 1
  },
  title: {
    color: "black",
    paddingTop: 20,
    fontSize: 16,
    paddingBottom: 5
  },
  titleInput: {
    height: 50,
    width: 290,
    color: 'black',
    backgroundColor: '#f9f9f9',
    borderColor: 'black',
    alignSelf: 'center',
    borderRadius: 10,
  },
  Description: {
    color: "black",
    paddingTop: 20,
    fontSize: 16,
    paddingBottom: 5
  },
  discriptionInput: {

    width: 290,
    color: 'black',
    backgroundColor: '#f9f9f9',
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 5,
    marginLeft: -10
  },
  submitButtonOuterLayout: {
    paddingTop: 100
  },
  submitButtonInnerLayout: {
    backgroundColor: 'green',
    width: 150,
    height: 30,
    borderRadius: 4,
    alignSelf: 'center'
  },
  submit: {
    alignSelf: 'center',
    paddingTop: 5,
    color: 'white'
  },
  cancelButtonOuterLayout: {
    paddingTop: 20
  },
  cancelButtonInnerLayout: {
    backgroundColor: 'grey',
    width: 150,
    height: 30,
    borderRadius: 4,
    alignSelf: 'center'
  },
  cancel: {
    alignSelf: 'center',
    paddingTop: 5,
    color: 'white'
  }
})
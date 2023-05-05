import {View,Text,StyleSheet, TextInput, TouchableOpacity,Modal} from 'react-native'
import React, { useState } from 'react'
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';

export default function Modals ({route}){
const{ id,task} = route.params;
const [tasks,setTasks] = useState("")
const navigation = useNavigation()
const msgvalid =  txt =>txt && txt.replace(/\s/g, "").length
    async function UpdateTasks(){
      if (tasks == '' || msgvalid(tasks)==0) {
        return false;
      }
        database()
        .ref(`/tasks/${id}`)
        .update({
          task:tasks 
        })
        .then(() => {navigation.goBack()});
    }
    return(
        <View style={{width:'90%',height:'40%',color:'green',borderRadius:15,borderWidth:2,borderColor:'black',alignSelf:'center',top:'25%',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
             
            <TextInput
          style={{
            width: '80%',
            height: 'auto',
            borderRadius: 15,
            borderWidth: 2,
            borderColor: 'grey',
            padding: 10,
            
          }}
          placeholder={'Write Here...'}
          multiline={true}
          placeholderTextColor={'black'}
          onChangeText={setTasks ? setTasks :''}
          value={tasks}
          blurOnSubmit={true}
          ></TextInput>
           <TouchableOpacity
          style={{
            width: '18%',
            height: '15%',
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginTop:'10%'
          }}
          onPress={()=>{UpdateTasks()}}>
          <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
            Edit
          </Text>
        </TouchableOpacity>
        </View>
    )
}
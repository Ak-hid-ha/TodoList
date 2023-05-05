import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Header, {List} from './components/Header';
import uuid from 'react-native-uuid';
import database from '@react-native-firebase/database';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import Modal from './Modals';
import Modals from './Modals';
import { useIsFocused, useNavigation } from '@react-navigation/native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Home() {
  const [note, setNote] = useState('');
  const isFocused = useIsFocused()
  const [AllTasks, setAllTasks] = useState('');
  const [open,setOpen] = useState(false)
  const [Id,setId] = useState('')
  const navigation=useNavigation()


  

  const getAllTasks = async () => {
    await database()
      .ref('tasks/')
      .once('value')
      .then(snapshot => {
        // {console.log("rrrrrrr",snapshot.val())}
        setAllTasks(snapshot.val() ? Object.values(snapshot.val()).sort((a,b) => a.time  < b.time ? 1 : -1) : null );
        })
      
  };
  console.log('vvv', AllTasks);
  useEffect(() => {
    getAllTasks();
  },[isFocused]);

  const msgvalid =  txt =>txt && txt.replace(/\s/g, "").length
  async function AddTasks() {
    if (note == '' || msgvalid(note)==0) {
      return false;
    }
    let data = {
      id: uuid.v4(),
      task: note,
      time : moment().format("dddd, MMM DD at HH:mm:ss a"),
      

    };
    await database()
      .ref('/tasks/' + data.id)
      .set(data)
      .then(() => {
        setNote("")
      });
    getAllTasks();
  }

  async function RemoveTasks(id){
    {console.log("iddd",id)}
    await database().ref(`/tasks/${id}`).set(null);
    
  }


  console.log('vvv222', AllTasks);

  console.log(note);
  return (
    <View style={{width: '100%', height: height}}>
      <Header />
    
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          top: 10,
          justifyContent: 'space-around',
          height: 50,
        }}>
        <TextInput
          style={{
            width: '70%',
            height: 'auto',
            borderRadius: 15,
            borderWidth: 2,
            borderColor: 'grey',
            padding: 10,
            
          }}
          placeholder={note ? note :'Write Here...'}
          multiline={true}
          placeholderTextColor={'black'}
          onChangeText={setNote ? setNote : ''}
          value={note}
          blurOnSubmit={true}
          ></TextInput>
          
        <TouchableOpacity
          style={{
            width: '15%',
            height: '100%',
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => {
            AddTasks();
            getAllTasks();
          }}>
          <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{marginTop: 10}}
        data={AllTasks}
        // keyExtractor={item=>item.id}
        renderItem={({item}) => {
          return (
            <View style={{height:'auto',width:'90%',marginTop:10,alignItems:'center',justifyContent:'center',borderRadius:15,left:20,borderWidth:2,borderColor:'grey'}}>
              
            <View
              style={{
                // paddingHorizontal: 10,
                paddingVertical: 10,
                flexDirection: 'row',
                // justifyContent: 'space-between',

              }}>
                <View style={{width:'65%',flexDirection:'row'}}>
                <Text style={{fontSize: 20, color: 'black'}}> { item.task} </Text>
               
                </View>
                <TouchableOpacity
                style={{
                  width: '15%',
                  height: 35,
                  backgroundColor: 'green',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  right:4
                }}
                onPress={()=>{setOpen(false),navigation.navigate("Modal",{
                  id:item.id
                })}}>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 13}}>
                  Edit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '15%',
                  height: 35,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                onPress={()=>{RemoveTasks(item.id),
              item.id===null ? null :
                getAllTasks()}}>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 13}}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
            </View>
          );
        }}
      />
     
    </View>
  );
}

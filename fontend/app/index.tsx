import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, } from "react-native-safe-area-context";
import Categories from "@/src/components/Categories";
import CreateNewTask from "@/src/components/CreateNewTask";
type ToDOType= {
  id:number;
  title:string;
  isDone:boolean;
}


export default function Index() {
  const [todos,setTodos] = useState<ToDOType[]>([]);
  const [todoText,setTodoText] = useState<string>('');
  const [searchQuery,setSearchQuery]=useState<string>('');
  const [oldTodos,setOldTodos]=useState<ToDOType[]>([]);
  const [modalVisible,setModalVisible]=useState(false);
  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       console.log("Fetching todos from API...");
  //       const res = await fetch("http://192.168.102.105:3001/todos");
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       const data: ToDOType[] = await res.json();
  //       console.log("API response:", data);
  //       setTodos(data);
  //     } catch (err) {
  //       console.error("Fetch error:", err);
  //     }
  //   };
  
  //   fetchTodos();
  // }, []);


  useEffect(()=> {
    const getTodos = async()=>{
      try{
        const todos = await AsyncStorage.getItem("my-todo");
        if(todos != null){
          setTodos(JSON.parse(todos));
          setOldTodos(JSON.parse(todos));
        }
      } catch(error){
        console.log(error);
      }
    }
    getTodos();
  },[]);

  const addTodo = async() =>{
    try{
      const newTodo = {
          id:Math.random(),
          title: todoText,
          isDone:false
      };
      todos.push(newTodo);
      setTodos(todos);
      setOldTodos(todos);
      await AsyncStorage.setItem('my-todo',JSON.stringify(todos));
      setTodoText('');
      Keyboard.dismiss();
    }
    catch(error){
      console.log(error);
    }
  }

  const deleteTodo = async (id:number) =>{
    try{
      const newTodos = todos.filter((todo)=>todo.id !== id);
      await AsyncStorage.setItem("my-todo",JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    }catch(error){
      console.log(error);
    }
  }

  const handleDone = async(id:number) =>{
    try{
      const newTodos = todos.map(todo=>{
        if(todo.id == id){
          todo.isDone =!todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo",JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    }catch (error){
      console.log(error);
    }
  }

  const onSearch = (query:string) =>{
    if(query == '' ){
      setTodos(oldTodos);
    }else{
    const filteredTodos = todos.filter((todo)=>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setTodos(filteredTodos);
  }
  };

  useEffect(()=>{
    onSearch(searchQuery);
  },[searchQuery]);

  const [createNewTask,setCreateNewTask] = useState<boolean>(false);

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.header}>
      <TouchableOpacity onPress={() =>{} }>
      <Ionicons name = "menu" size = {30} color = "black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() =>{} }>
      <Image 
      source = {require("../assets/images/icon.png")}
      style = {{ width: 40, height:40, borderRadius:20}}
      />
      </TouchableOpacity>
     </View>

      {/* Categories */}
     <Categories/>

      <FlatList 
      data = {[...todos].reverse()} 
      keyExtractor = {(item) => item.id.toString()} 
      renderItem = {({item}) => 
      <TodoItem todo = {item} 
                deleteToDo={deleteTodo} 
                handleDone={handleDone} 
      />}
      />

      <KeyboardAvoidingView 
      style = {styles.footer} 
      behavior="padding" 
      keyboardVerticalOffset={18}
      >
        <TextInput 
          placeholder="Add New ToDo " 
          value = {todoText}
          onChangeText ={(text)=>setTodoText(text)} 
          style = {styles.newTodoInput}
          autoCorrect = {false}
        />

        <TouchableOpacity 
          style = {styles.addButton} 
          onPress = {()=>setModalVisible(true)}
        >
          <Ionicons name = "add" size={34} color = {'#fff'}/>
        </TouchableOpacity>

          <CreateNewTask
          visible={modalVisible}
          onClose={()=>setModalVisible(false)}
          />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


const TodoItem = ({
    todo,
    deleteToDo,
    handleDone,
    }:{
      todo:ToDOType;
      deleteToDo:(id:number)=>void;
      handleDone:(id:number)=>void;
    }) =>(
    <View style = {styles.todocontainer}>
    <View style = {styles.todoInforcontainer}>
      <Checkbox 
        value = {todo.isDone}
        onValueChange={() => handleDone(todo.id)}
        color = {todo.isDone ? "#4630EB" : undefined}  
      />
        <Text 
        style = {(
          styles.todoText,
          todo.isDone&&{textDecorationLine:"line-through"}
          )}
        >
          {todo.title}
        </Text> 
    </View>

    <TouchableOpacity 
      onPress={()=>{
        deleteToDo(todo.id);
        alert('deleted ' + todo.id);
      }}>

        <Ionicons name = "trash" size = {24} color = 'red'/>

    </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todocontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    padding:16,
    borderRadius:10,
    marginBottom:20,
  },
  todoInforcontainer:{
    flexDirection:'row',
    gap:10,
    alignItems:'center',
  },
  todoTitle:{
    fontSize:18,
  },
  todoText:{
    fontSize:16,
    color:'#333',
  },
  footer:{
  flexDirection :'row',
  alignItems:'center',
  justifyContent:'space-between',
  },
  newTodoInput:{
  flex :1,
  backgroundColor:'#fff',
  padding:16,
  borderRadius:10,
  fontSize:16,
  color:'#333',
  },
  addButton:{
    backgroundColor:'#4630EB',
    padding:8,
    borderRadius:10,
    marginLeft:20
  }

})



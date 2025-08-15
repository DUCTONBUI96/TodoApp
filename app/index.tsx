import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, } from "react-native-safe-area-context";


const todoData = [
   {id: 1, title:"to do 1" , isDone: false},
   {id: 2, title:"to do 2" , isDone: false},
   {id: 3, title:"to do 3" , isDone: false},
   {id: 4, title:"to do 4" , isDone: false},
   {id: 5, title:"to do 5" , isDone: false},
   {id: 6, title:"to do 6" , isDone: false},
   {id: 7, title:"to do 7" , isDone: true},
   {id: 8, title:"to do 8" , isDone: false},
   {id: 9, title:"to do 9" , isDone: false},
]

export default function Index() {
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

     <View style = {styles.searchBar}>
      <Ionicons name="search" size={24} color = {'#333'} />

      <TextInput 
      placeholder="Search" 
      style={styles.searchInput} 
      clearButtonMode="always"
      />
     </View>

      <FlatList 
      data = {todoData} 
      keyExtractor = {(item) => item.id.toString()} 
      renderItem = {({item}) => 
      
      <View style = {styles.todocontainer}>
        <View style = {styles.todoInforcontainer}>
          <Checkbox value = {item.isDone}/>
            <Text>{item.title}</Text> 
        </View>

        <View>
          <Ionicons name = "trash" size = {24} color = 'red'/>
        </View>
      </View>
      }
      />

    </SafeAreaView>
  );
}

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

  searchBar: { 
    flexDirection: "row",
    backgroundColor: "#fff",
    padding : 16,
    borderRadius : 10,
    gap : 10,
    marginBottom:20,
  },
  searchInput:{
    flex:1,
    fontSize:14,
    color:'#333',
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
  }

})

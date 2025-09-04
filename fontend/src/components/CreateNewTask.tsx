import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Modal,ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchEventType } from 'react-native-gesture-handler/lib/typescript/TouchEventType';


//Interface for the data of the create new task
interface CreateTaskData {
    title: string;
    description: string;
    categoryId: number;
    priorityId: number;
    deadline: string;
    subtasks: string[];
    tags: string;
    hasReminders: boolean;
  }

interface SubTask{
    id:number;
    title:string;
    isDone:boolean;
}  

interface Category{
    id:number;
    name:string;
    count:number;
}

interface Priority{
    id:number;
    name:string;
    level:number;
    color:string;
}

const CreateNewTask: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
    const [taskTitle,SetTaskTitle]  = useState('');
    const [des,SetDes]              = useState('');
    const [priority,SetPriority]    = useState('');
    const [catagory,SetCatagoris]   = useState('General');
    const [subtask,SetSubtask]      = useState('');
    const [tag,SetTag]              = useState('');
    const [deadline,SetDeadline]    = useState('');
    const [Enabled,SetEnable]       = useState(false);

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >      
            <View style= {styles.modalOverPlay}>
                <View style = {styles.modalContent}>
                {/*header*/}
                    <View style = {styles.header}> 
                        <Text style={styles.title} >Create New Task</Text>
                        {/* button close */}
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Text style={styles.closeButtonText}>x</Text>
                        </TouchableOpacity>
                    </View>

                {/* ScrollView để cuộn nội dung */}
                <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Task Title Input*/}
                    <View style ={styles.inputcontainer} >
                        <Text style = {styles.label}>
                            Task Title <Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={styles.textInput}
                            value={taskTitle}
                            onChangeText={SetTaskTitle}
                            placeholder="What do you want to accomplish?"
                            placeholderTextColor="#999"
                            multiline={false}
                        />
                    </View>
                {/*Description Input */}
                    <View style = {styles.inputcontainer}>
                        <Text style={styles.label}> Description</Text>
                        <TextInput
                        style={[styles.textInput,styles.textArea]}
                        value={des}
                        onChangeText={SetDes}
                        placeholder="Add more details about this task..."
                        placeholderTextColor="#999"
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical='top'
                        />
                    </View>
                {/*Priotity and Category*/}
                    <View style={styles.rowContainer}>
                        {/*priority */}
                        <View style={styles.halfContainer}>
                            <Text style={styles.label}>Priority</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownText}>
                                    {priority||'select..'}
                                </Text>
                                <Text style={styles.dropdownArrow}>▼</Text>
                            </TouchableOpacity>
                        </View>
                        {/*Category */}
                        <View style={styles.halfContainer}>
                            <Text style={styles.label}>Category</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={styles.dropdownText}>
                                    {catagory}
                                </Text>
                                <Text style={styles.dropdownArrow}>▼</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                {/* SubTask */}
                    <View style={styles.inputcontainer}>
                        <View style={styles.LabelSubTask}>
                            <Text style={styles.label}>SubTasks</Text>
                            <TouchableOpacity style={styles.addButton}>
                                <Text style={styles.addButtonText}>+ Add</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            value={subtask}
                            onChangeText={SetSubtask}
                            placeholder="Subtask..."
                            placeholderTextColor="#999"
                        />
                    </View>
                {/* Tag and deadline */}
                    {/* Tag */}
                    <View style={styles.rowContainer}>
                        <View style={styles.halfContainer}>
                            <Text style={styles.label}>Tags</Text>
                            <TextInput
                                style={styles.textInput}
                                value={tag}
                                onChangeText={SetTag}
                                placeholder="e.g . urgent,important"
                                placeholderTextColor="#999"
                            />
                        </View>
                    {/* Dealine */}
                        <View style={styles.halfContainer}>
                            <Text style={styles.label}>Deadline</Text>
                            <TouchableOpacity style={styles.dropdown}>
                                <Text style={[styles.dropdownText,styles.placeholderStyle]}>
                                    {deadline||'dd/mm/yyyy'}
                                </Text>
                                <Text style={styles.dateIcon}>📅</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* reminder */}
                    <View style={styles.inputcontainer}>
                        <View>
                            <Text style={styles.label}>Reminder</Text>
                            <TouchableOpacity 
                            style={[styles.toggleContainer,Enabled&&styles.toggleActive]}
                            onPress={()=>SetEnable(!Enabled)}
                            >
                               <View style={[styles.toggleCircle,Enabled&&styles.toggleCircleActive]}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                {/* Action Button */}
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.createButton}
                        >
                            <Text style={styles.createButtonText}>Create Task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
const  styles = StyleSheet.create({
    modalOverPlay:{
        flex:1,
        backgroundColor:'rgbs(0,0,0,0.5',// Nền đen mờ 50%
        justifyContent: 'center', // Căn giữa modal theo chiều dọc
        alignItems: 'center', // Căn giữa modal theo chiều ngang
    },
    modalContent:{
        backgroundColor:'white',
        padding:24,
        borderRadius:10,
        width:'90%',
        maxHeight:'80%',
        elevation:8, //Đổ bóng android
        shadowColor:'#000',
        shadowOffset: { width: 0, height: 4 }, // Vị trí bóng iOS
        shadowOpacity: 0.3, // Độ đậm bóng iOS
        shadowRadius: 8, // Độ mờ bóng iOS
    },
    scrollContainer:{
        // flex:1,
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:16,
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        flex:1,
        color:'#4CAF50',
    },
    closeButton:{
        width:32,
        height:32,
        borderRadius:16,
        backgroundColor:'#f0f0f0',
        justifyContent:'center',
        alignItems:'center',
    },
    closeButtonText:{
        fontSize:16,
        color:"#666",
        fontWeight:'bold',
    },
    inputcontainer:{
        marginBottom:20,  
    },

    LabelSubTask:{
        fontSize:16,            
        fontWeight:'600',
        color:'#333',
        marginBottom:8,  
        justifyContent:'space-between',
        flexDirection:'row',
    },
    required:{
        color:'#ff4444',
    },
    label:{
        fontSize:16,            
        fontWeight:'600',
        color:'#333',
        marginBottom:8,         //khoảng cách giữa label và input 
    },
    textInput:{
        borderWidth:1,          // Đường viền dày 1px
        borderColor:'#ddd',     // Màu viền xám nhạt
        borderRadius:8,         // Bo góc input 8px
        paddingHorizontal:16,   //Khoảng cách trái phải trong input
        paddingVertical:12,     //Khoảng cách trên dưới trong input
        fontSize:16,
        backgroundColor:'#fff',
        color:'#333',
        minHeight:48,           //Chiều cao của input
    },
    textArea:{
        minHeight:100,          // Chiều cao tối thiểu cho textarea 100px
        maxHeight:150,          // Chiều cao tối đa 150px
        textAlignVertical:'top',// Căn text từ trên xuống (Android)
    },
    rowContainer:{
        flexDirection:'row',            //Xếp 2 dropdown ngang hàng
        justifyContent:"space-between", //Cách đều 2 bên
        marginBottom:20,                //Khoảng cách dưới
    },
    halfContainer:{
        flex:1,
        marginHorizontal:5,     //Khoảng cách giữa 2 dropdown là 10px(5x2)
    },
    dropdown:{
        borderWidth:1,      
        borderColor:'#ddd',
        borderRadius:8,
        paddingHorizontal:16,           //Khoảng cách trái phải 16px
        paddingVertical:12,             //Khoảng cách trên dưới 12px
        backgroundColor:'#fff',
        minHeight:48,       
        flexDirection:'row',            // Xếp Text với mũi tên nằm ngang
        justifyContent:'space-between', //Text trái, mũi tên bên phải
        alignItems:'center',            //Căn giữa theo chiều dọc 
    },
    dropdownText:{
        fontSize:16,
        color:'#333',
        flex:1,
    },
    dropdownArrow:{
        fontSize:12,
        color:'#666',
        marginLeft:8,
    },
    addButton:{
        backgroundColor:'#4CaF50',
        paddingHorizontal:12,
        paddingVertical:6,
        borderRadius:4,
    },
    addButtonText:{
        color:'white',
        fontSize:12,
        fontWeight:'600',
    },
    placeholderStyle:{
        color:'#999',
    },
    dateIcon:{
        fontSize:16,
        marginLeft:8,
    },
    labelWithToggle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    toggleContainer:{
        width:50,
        height:26,
        borderRadius:13,
        backgroundColor:'#ddd',
        padding:2,
        justifyContent:'center'
    },
    toggleActive:{
        backgroundColor:'#4CAF50'
    },
    toggleCircle:{
        width:22,
        height:22,
        borderRadius:11,
        backgroundColor:'white',
        alignSelf:'flex-start',
    },
    toggleCircleActive:{
        alignSelf:'flex-end'
    },
    actionContainer:{
        flexDirection:'row',
        paddingHorizontal:24,
        paddingVertical:20,
        borderTopWidth:1,
        borderTopColor:'#f0f0f0',
        gap:12,
    },
    cancelButton:{
        flex:1,
        paddingVertical:14,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#ddd',
        backgroundColor:'white',
        alignItems:'center'
    },
    cancelButtonText:{
        color:'#666',
        fontSize:16,
        fontWeight:'600'
    },
    createButton:{
        flex:1,
        paddingVertical:14,
        borderRadius:8,
        elevation:2,
        backgroundColor:"#4CAF50",
        alignItems:'center',
        shadowColor: '#4CAF50', // Màu bóng iOS
        shadowOffset: { width: 0, height: 2 }, // Vị trí bóng iOS
        shadowOpacity: 0.3, // Độ đậm bóng iOS
        shadowRadius: 4, // Độ mờ bóng iOS
    },
    createButtonText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold',
    },
});

export default CreateNewTask;
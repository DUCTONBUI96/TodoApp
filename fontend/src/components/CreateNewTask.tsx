import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

const CreateNewTask: React.FC = () => {
    return (
        <View>
            <Text>Create New Task</Text>
        </View>
    );
};
export default CreateNewTask;
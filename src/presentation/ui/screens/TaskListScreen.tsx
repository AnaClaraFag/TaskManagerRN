import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import { RootStackParamList } from '@/presentation/navigation/types';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useTaskStore } from '@/di/AppModule';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export function TaskListScreen({ navigation }: Props) {
    const {tasks, loadTasks, toggleTaskCompletion, deleteTask} = useTaskStore();

    useEffect(() => {
        loadTasks();
        const unsubscribe = navigation.addListener('focus', loadTasks)
        return unsubscribe;
    }, [navigation])
   
    return (
        <View style={styles.container}>
            <Text style={styles.headerSubtitle}>To do list</Text>
            <FlatList
                data = {tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                   
                    <TaskItem task={item} 
                    onToggleComplete={toggleTaskCompletion} 
                    onPress = {(id) => navigation.navigate('TaskDetail', { id })}
                    onDelete ={deleteTask} />
                )
                }
                contentContainerStyle={{ paddingBottom: 80}}
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('TaskForm', {})}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
   container: { flex: 1, backgroundColor: '#fff' },
   headerSubtitle: { fontSize: 14, fontWeight: '600', color: '#5E5CE6', marginTop: 8},
   listContent: { paddingHorizontal: 20, paddingBottom: 100 },
  fab: { 
    position: 'absolute',
     right: 24, 
     bottom: 32, 
     width: 56, 
     height: 56, 
     borderRadius: 18, 
    backgroundColor: '#E9E7FB', 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4 },
  fabText: { color: '#5E5CE6', fontSize: 28, lineHeight: 30 , fontWeight: '400' },
});
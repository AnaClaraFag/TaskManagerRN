import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Touchable, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { TaskItem } from '../components/TaskItem';
import { Task } from '../../core/data/model/Task';
import { RootStackParamList } from '@/navigation/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTaskStore } from '@/core/di/AppModule';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskForm'>;

export function TaskFormScreen({ navigation, route }: Props) {
    const { id } = route.params ?? {}
    const isEditing = !!id;

    const { selectedTask, loadTaskDetails, createTask, updateTask } = useTaskStore();

    useEffect(() => {
        if(isEditing) loadTaskDetails(id);
    }, [id])

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if(isEditing && selectedTask){
            setTitle(selectedTask.title);
            setDescription(selectedTask.description)
        }
    }, [selectedTask])

    const handleSave = async () => {
        try {
            if(isEditing){
                await updateTask(id, title, description)
            } else {
                await createTask(title, description)
            }
            navigation.goBack();
        }catch(e){
            console.log('Erro ao salvar', e)
            Alert.alert('Erro ao salvar', (e as Error).message)
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.label}>Título</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Ex: Comprar leite"
                placeholderTextColor= 'B0B0B8'
                />

            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Optional"
                placeholderTextColor= 'B0B0B8'
                multiline
            />
            <View style={styles.spacer}/>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>
                {isEditing ? 'Salvar alterações' : 'Criar tarefa'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 12 },
    input: { 
        backgroundColor: '#FFFFFF',
        borderWidth: 1, 
        borderColor: '#EDEDF2', 
        borderRadius: 12,
        paddingVertical: 12, 
        paddingHorizontal: 14,
        fontSize: 16,
        color: '#1A1A1A'},
    textArea: { height: 110, textAlignVertical: 'top' },
    saveButton: {
        backgroundColor: '#5E5CE6',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
  },
    saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
    cancelButton: {
        backgroundColor: '#F5F5F7',
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 12,
    },
    cancelButtonText: { color: '#8A8A8E', fontSize: 16, fontWeight: '600' },
    spacer: { height: 20 },
})
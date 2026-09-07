import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation/types';
import { Feather } from '@expo/vector-icons';
import { useTaskStore } from '@/core/di/AppModule';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export function TaskDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { selectedTask, loadTaskDetails, deleteTask } = useTaskStore();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
          loadTaskDetails(id)

    });
    return unsubscribe;
  }, [id, navigation])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedTask?.title}</Text>
      <Text style={styles.description}>{selectedTask?.description}</Text>
      <Text style={styles.status}>{selectedTask?.isCompleted}</Text>
    <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('TaskForm', { id })}
      >
          <Feather name="edit-2" size={16} color="#FFFFFF" />

        <Text style={styles.editButtonText}>  Editar tarefa</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() =>{
          deleteTask
        navigation.goBack()
      }}>
        <Text style={styles.deleteButtonText}>Excluir tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 },
  description: { fontSize: 16, color: '#444', marginBottom: 20 },
  status: { fontSize: 14, color: '#6650A4', fontWeight: '600' },
  deleteButton: { marginTop: 40, borderWidth: 1, borderColor: '#D32F2F', borderRadius: 8, padding: 14, alignItems: 'center' },
  deleteButtonText: { color: '#D32F2F', fontWeight: '700' },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5E5CE6',
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 24,
    gap: 8,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
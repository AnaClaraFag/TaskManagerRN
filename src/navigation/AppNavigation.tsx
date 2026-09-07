import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator, type NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { TaskListScreen } from '@/ui/screens/TaskListScreen';
import { TaskDetailScreen } from '@/ui/screens/TaskDetailScreen';
import { TaskFormScreen } from '@/ui/screens/TaskFormScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList"
        screenOptions={{
            headerStyle: { backgroundColor: '#6650A4' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
        }}>
            <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Minhas Tarefas' }} />
            <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Detalhes' }} />
            <Stack.Screen name="TaskForm" component={ TaskFormScreen} options={({ route }) => ({ title: route.params?.id ? 'Editar Tarefa' : 'Nova Tarefa' })} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
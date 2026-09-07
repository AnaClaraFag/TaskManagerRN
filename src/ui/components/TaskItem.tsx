import React from "react";
import { Task }from "../../core/data/model/Task"
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface Props{
    task: Task;
    onToggleComplete: (taskId: string) => void;
    onPress: (taskId: string) => void;
    onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onToggleComplete, onPress, onDelete }: Props) {
  return (
  <TouchableOpacity style = {styles.container} onPress={() => onPress(task.id)}>
    <TouchableOpacity
        style={[styles.checkbox, task.isCompleted && styles.checkboxChecked]}
        onPress={() => onToggleComplete(task.id)}
      >
        {task.isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    <View style = {styles.content}>
        <Text style = {[styles.title, task.isCompleted && styles.titleCompleted]}>{task.title}</Text>
        {task.description ? (
            <Text style = {styles.description} numberOfLines={1}>{task.description}</Text>
        ) : null}
        <View
          style={[
            styles.statusChip,
            task.isCompleted ? styles.statusChipDone : styles.statusChipPending,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              task.isCompleted ? styles.statusTextDone : styles.statusTextPending,
            ]}
          >
            {task.isCompleted ? 'Done' : 'Pending'}
          </Text>
        </View>
    </View>
     <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.deleteButton}>
        <Text style={styles.deleteIcon}>🗑</Text>
      </TouchableOpacity>
  </TouchableOpacity>
);
}

const styles = StyleSheet.create({
    container: { flexDirection: "row", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
    checkbox: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: '#D8D8E0',
        marginRight: 14,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
  },   
    checkboxChecked: {
        backgroundColor: '#5E5CE6',
        borderColor: '#5E5CE6',
  },
    checkmark: { color: '#fff', fontSize: 14, fontWeight: '700' },
    content: { flex: 1 },
    title: { fontSize: 16, fontWeight: '600' },
    titleCompleted: { textDecorationLine: 'line-through', color: '#999' },
    description: { fontSize: 13, color: '#666', marginTop: 2 },
    statusChip: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 10,
  },
  statusChipDone: { backgroundColor: '#DCF5E3' },
  statusChipPending: { backgroundColor: '#E9E7FB' },
  statusText: { fontSize: 13, fontWeight: '600' },
  statusTextDone: { color: '#2E7D46' },
  statusTextPending: { color: '#5E5CE6' },
  deleteButton: { padding: 6, marginTop: 2 },
  deleteIcon: { fontSize: 16, opacity: 0.4 },

})
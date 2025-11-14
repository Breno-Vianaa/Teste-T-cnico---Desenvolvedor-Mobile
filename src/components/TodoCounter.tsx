// RNToDoApp/src/components/TodoCounter.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Todo } from '../types/Todo';

// Propriedades esperadas pelo componente TodoCounter
interface TodoCounterProps {
  todos: Todo[]; // Lista completa de tarefas
}

/**
 * Componente funcional para exibir o contador de tarefas.
 * Mostra o total, concluídas e pendentes.
 */
const TodoCounter: React.FC<TodoCounterProps> = ({ todos }) => {
  // 1. Cálculo do total de tarefas
  const total = todos.length;
  // 2. Cálculo de tarefas concluídas
  const completed = todos.filter(todo => todo.isCompleted).length;
  // 3. Cálculo de tarefas pendentes
  const pending = total - completed;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumo das Tarefas</Text>
      <View style={styles.statsContainer}>
        {/* Contador de Total */}
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        {/* Contador de Concluídas */}
        <View style={styles.statBox}>
          <Text style={[styles.statValue, styles.completedValue]}>{completed}</Text>
          <Text style={styles.statLabel}>Concluídas</Text>
        </View>
        {/* Contador de Pendentes */}
        <View style={styles.statBox}>
          <Text style={[styles.statValue, styles.pendingValue]}>{pending}</Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
      </View>
    </View>
  );
};

// Estilos específicos para o componente TodoCounter
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  completedValue: {
    color: '#4CAF50', // Verde para concluídas
  },
  pendingValue: {
    color: '#FF9800', // Laranja para pendentes
  },
  statLabel: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
});

export default TodoCounter;

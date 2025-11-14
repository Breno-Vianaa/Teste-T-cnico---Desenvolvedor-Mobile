// RNToDoApp/src/components/TodoItem.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Todo } from '../types/Todo';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Propriedades esperadas pelo componente TodoItem
interface TodoItemProps {
  todo: Todo; // O compromisso a ser exibido
  onToggle: (id: number) => void; // Função para alternar o status
  onDelete: (id: number) => void; // Função para deletar o compromisso
}

/**
 * Componente funcional para exibir um item da lista de compromissos.
 * Inclui o título, status, data de criação e, agora, a data e hora do compromisso.
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  // Função para confirmar a exclusão do compromisso
  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir o compromisso: "${todo.title}"?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => onDelete(todo.id), // Chama a função de exclusão se confirmado
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // Formata a data e hora do compromisso para exibição
  const formattedAppointmentDate = new Date(todo.appointmentDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Formata a data de criação para exibição (mantido para referência)
  const formattedCreationDate = new Date(todo.createdAt).toLocaleDateString('pt-BR');

  return (
    <View style={styles.itemContainer}>
      {/* Área clicável para alternar o status do compromisso */}
      <TouchableOpacity
        style={styles.toggleArea}
        onPress={() => onToggle(todo.id)} // Alterna o status ao clicar
      >
        {/* Ícone de status */}
        <Icon
          name={todo.isCompleted ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={todo.isCompleted ? '#4CAF50' : '#757575'}
        />
        {/* Conteúdo principal: Título e Data/Hora do Compromisso */}
        <View style={styles.contentContainer}>
          <Text
            style={[
              styles.title,
              todo.isCompleted && styles.completedTitle, // Aplica estilo de riscado se concluída
            ]}
          >
            {todo.title}
          </Text>
          {/* Exibe a data e hora do compromisso */}
          <Text style={styles.appointmentDateText}>
            <Icon name="schedule" size={12} color="#00BCD4" /> {formattedAppointmentDate}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Botão de exclusão */}
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Icon name="delete" size={20} color="#F44336" /> {/* Ícone de lixeira vermelho */}
      </TouchableOpacity>
    </View>
  );
};

// Estilos específicos para o componente TodoItem (revisados)
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  toggleArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    marginLeft: 10,
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  appointmentDateText: {
    fontSize: 12,
    color: '#00BCD4', // Cor ciano para destaque da data
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
});

export default TodoItem;
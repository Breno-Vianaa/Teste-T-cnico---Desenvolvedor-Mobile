// RNToDoApp/src/screens/TodoScreen.tsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Todo } from '../types/Todo';
import { loadTodos, saveTodos } from '../services/StorageService';
import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';
import TodoCounter from '../components/TodoCounter';
import { GlobalStyles } from '../styles/GlobalStyles';

/**
 * Tela principal da aplicação de Agenda/Compromissos.
 * Gerencia o estado dos compromissos, a persistência e as ações.
 */
const TodoScreen: React.FC = () => {
  // Estado principal para armazenar a lista de compromissos
  const [todos, setTodos] = useState<Todo[]>([]);
  // Estado para indicar se os compromissos estão sendo carregados do AsyncStorage
  const [isLoading, setIsLoading] = useState(true);

  // =================================================================================
  // 1. Lógica de Persistência (Carregar e Salvar)
  // =================================================================================

  // useEffect para carregar os compromissos do AsyncStorage na montagem do componente
  useEffect(() => {
    const fetchTodos = async () => {
      const storedTodos = await loadTodos();
      setTodos(storedTodos);
      setIsLoading(false); // Finaliza o carregamento
    };

    fetchTodos();
  }, []); // Array de dependências vazio: executa apenas uma vez na montagem

  // useEffect para salvar os compromissos no AsyncStorage sempre que o estado 'todos' mudar
  useEffect(() => {
    // Evita salvar antes do carregamento inicial
    if (!isLoading) {
      saveTodos(todos);
    }
  }, [todos, isLoading]); // Depende de 'todos' e 'isLoading'

  // =================================================================================
  // 2. Funções de Manipulação de Compromissos
  // =================================================================================

  /**
   * Adiciona um novo compromisso à lista.
   * @param title O título do novo compromisso.
   * @param appointmentDate A data e hora do compromisso (timestamp).
   */
  const handleAddTodo = useCallback((title: string, appointmentDate: number) => {
    // Cria um novo objeto de compromisso
    const newTodo: Todo = {
      id: Date.now(), // Usa o timestamp como ID único
      title,
      isCompleted: false,
      createdAt: Date.now(),
      appointmentDate, // Novo campo de data/hora do compromisso
    };

    // Atualiza o estado, adicionando o novo compromisso
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  /**
   * Alterna o status de conclusão de um compromisso.
   * @param id O ID do compromisso a ser alternado.
   */
  const handleToggleTodo = useCallback((id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }, []);

  /**
   * Remove um compromisso da lista.
   * @param id O ID do compromisso a ser removido.
   */
  const handleDeleteTodo = useCallback((id: number) => {
    // Filtra a lista, removendo o compromisso com o ID correspondente
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // =================================================================================
  // 3. Lógica de Ordenação (Compromissos)
  // =================================================================================

  /**
   * Memoiza a lista de compromissos ordenados.
   * Ordena por data do compromisso (mais próximo primeiro) e, em seguida,
   * por status (incompleto primeiro).
   */
  const sortedTodos = useMemo(() => {
    // Cria uma cópia para não modificar o estado diretamente
    const sorted = [...todos];

    sorted.sort((a, b) => {
      // 1. Prioriza incompletos (incompletos vêm antes dos completos)
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      // 2. Ordena por data do compromisso (mais antigo/próximo primeiro)
      return a.appointmentDate - b.appointmentDate;
    });

    return sorted;
  }, [todos]); // Recalcula sempre que a lista de 'todos' mudar

  // =================================================================================
  // 4. Renderização
  // =================================================================================

  if (isLoading) {
    // Exibe um indicador de carregamento enquanto os compromissos são carregados
    return (
      <View style={[GlobalStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Carregando Agenda...</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.header}>Minha Agenda de Compromissos</Text>

      {/* Componente para adicionar novos compromissos */}
      <TodoInput onAddTodo={handleAddTodo} />

      {/* Componente para exibir o contador de compromissos */}
      <TodoCounter todos={todos} />

      {/* Lista de compromissos (ordenada) */}
      <FlatList
        data={sortedTodos} // Usa a lista ordenada
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        )}
        // Exibe uma mensagem se a lista estiver vazia
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>Nenhum compromisso agendado. Adicione um!</Text>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// Estilos específicos para a tela
const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#9E9E9E',
  },
  listContent: {
    paddingBottom: 20, // Espaçamento inferior para a lista
  },
});

export default TodoScreen;
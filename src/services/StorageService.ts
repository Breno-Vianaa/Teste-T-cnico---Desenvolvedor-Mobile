// RNToDoApp/src/services/StorageService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo } from '../types/Todo';

// Chave única para armazenar as tarefas no AsyncStorage
const STORAGE_KEY = '@RNToDoApp:todos';

/**
 * Função para carregar a lista de tarefas salvas no AsyncStorage.
 * @returns Uma Promise que resolve para um array de tarefas (Todo[]).
 */
export const loadTodos = async (): Promise<Todo[]> => {
  try {
    // Tenta obter o valor armazenado pela chave
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    // Se houver valor, faz o parse e retorna. Caso contrário, retorna um array vazio.
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // Em caso de erro (ex: erro de leitura), loga e retorna array vazio
    console.error('Erro ao carregar tarefas:', e);
    return [];
  }
};

/**
 * Função para salvar a lista de tarefas no AsyncStorage.
 * @param todos O array de tarefas (Todo[]) a ser salvo.
 * @returns Uma Promise vazia.
 */
export const saveTodos = async (todos: Todo[]): Promise<void> => {
  try {
    // Converte o array de tarefas para string JSON
    const jsonValue = JSON.stringify(todos);
    // Salva a string JSON no AsyncStorage
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    // Em caso de erro (ex: erro de escrita), loga
    console.error('Erro ao salvar tarefas:', e);
  }
};

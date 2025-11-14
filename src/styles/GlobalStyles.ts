// RNToDoApp/src/styles/GlobalStyles.ts

import { StyleSheet } from 'react-native';

/**
 * Estilos globais básicos para a aplicação.
 * Utiliza cores simples e um layout de container centralizado.
 */
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    backgroundColor: '#F5F5F5', // Fundo claro
    paddingTop: 40, // Espaçamento superior para evitar a barra de status
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  // Estilo para o texto de status (concluído/pendente)
  statusText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
});

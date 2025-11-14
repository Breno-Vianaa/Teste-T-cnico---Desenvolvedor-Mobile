// RNToDoApp/App.tsx

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TodoScreen from './src/screens/TodoScreen';

/**
 * Componente principal da aplicação.
 * Envolve a tela principal em um SafeAreaView para garantir que o conteúdo
 * não seja obscurecido por barras de status ou entalhes em dispositivos móveis.
 */
const App = () => {
  return (
    // SafeAreaView garante que o conteúdo seja renderizado em uma área segura
    <SafeAreaView style={styles.container}>
      {/* Define a cor da barra de status para se adequar ao tema claro */}
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      {/* Renderiza a tela principal da lista de tarefas */}
      <TodoScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Cor de fundo consistente
  },
});

export default App;

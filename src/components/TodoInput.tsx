// RNToDoApp/src/components/TodoInput.tsx

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

// Propriedades esperadas pelo componente TodoInput
interface TodoInputProps {
  // A função agora recebe o título e a data/hora do compromisso (timestamp)
  onAddTodo: (title: string, appointmentDate: number) => void;
}

/**
 * Componente funcional para o campo de input e botão de adicionar compromisso.
 * Inclui seleção de data e hora para agendamento.
 */
const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  // Estado local para armazenar o título do compromisso
  const [title, setTitle] = useState('');
  // Estado para armazenar a data e hora selecionadas (inicializa com a data atual)
  const [date, setDate] = useState(new Date());
  // Estado para controlar a visibilidade do seletor de data/hora
  const [showPicker, setShowPicker] = useState(false);
  // Estado para controlar se o seletor deve mostrar data ou hora
  const [mode, setMode] = useState<'date' | 'time'>('date');

  // Função chamada quando o valor do seletor de data/hora muda
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // O seletor é fechado após a seleção no Android/iOS
    setShowPicker(Platform.OS === 'ios'); // No iOS, o picker é persistente, no Android, ele fecha

    if (selectedDate) {
      setDate(selectedDate); // Atualiza a data/hora selecionada
    }

    // Se estiver no Android e for a seleção de data, abre o seletor de hora em seguida
    if (Platform.OS === 'android' && mode === 'date' && event.type !== 'dismissed') {
      setMode('time');
      setShowPicker(true);
    } else if (Platform.OS === 'android' && mode === 'time') {
      // Após selecionar a hora no Android, volta para o modo 'date' para a próxima vez
      setMode('date');
    }
  };

  // Função para abrir o seletor de data
  const showDatepicker = () => {
    setShowPicker(true);
    setMode('date');
  };

  // Função chamada ao pressionar o botão de adicionar
  const handleAdd = () => {
    // 1. Validação: Não permite título vazio
    if (title.trim() === '') {
      Alert.alert('Atenção', 'O título do compromisso não pode ser vazio.');
      return;
    }

    // 2. Validação: Não permite agendar no passado (opcional, mas útil para agenda)
    if (date.getTime() < Date.now() - 60000) { // 60s de margem
      Alert.alert('Atenção', 'Não é possível agendar compromissos no passado.');
      return;
    }

    // 3. Chama a função de adicionar, passando o título e o timestamp da data/hora
    onAddTodo(title.trim(), date.getTime());

    // 4. Limpa o campo de input e reseta a data para o momento atual
    setTitle('');
    setDate(new Date());
  };

  // Formata a data e hora para exibição no botão
  const formattedDateTime = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.container}>
      {/* Campo de input para o título do compromisso */}
      <TextInput
        style={styles.input}
        placeholder="Título do Compromisso..."
        placeholderTextColor="#9E9E9E"
        value={title}
        onChangeText={setTitle}
        returnKeyType="done"
      />

      {/* Botão para selecionar Data e Hora */}
      <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
        <Icon name="event" size={20} color="#FFF" />
        <Text style={styles.dateButtonText}>{formattedDateTime}</Text>
      </TouchableOpacity>

      {/* Seletor de Data/Hora */}
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode} // Alterna entre 'date' e 'time'
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}

      {/* Botão para adicionar o compromisso */}
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Icon name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

// Estilos específicos para o componente TodoInput (revisados)
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que os itens quebrem a linha
    paddingHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  input: {
    width: '100%', // Ocupa a largura total
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#00BCD4', // Cor ciano para destaque de data
    borderRadius: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  dateButtonText: {
    color: '#FFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#4CAF50', // Cor verde para adicionar
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default TodoInput;
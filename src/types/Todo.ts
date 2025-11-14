// RNToDoApp/src/types/Todo.ts

/**
 * Interface que define a estrutura de um Compromisso (Agenda Item).
 * O nome foi mantido como 'Todo' para consistência com o projeto original,
 * mas agora representa um compromisso agendado.
 * @property id - Identificador único do compromisso (timestamp).
 * @property title - Título/descrição do compromisso.
 * @property isCompleted - Status de conclusão do compromisso.
 * @property createdAt - Data de criação do registro (timestamp).
 * @property appointmentDate - Data e hora do compromisso (timestamp). NOVO CAMPO
 */
export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: number;
  appointmentDate: number; // Timestamp do compromisso
}
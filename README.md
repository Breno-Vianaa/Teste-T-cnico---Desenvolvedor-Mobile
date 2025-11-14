> Este arquivo foi gerado para documentar o projeto RNToDoApp e substituir o README padrão.

# RNToDoApp: Aplicativo de Agenda de Compromissos (Agenda App)

## Descrição do Projeto

Este é um aplicativo básico de **Agenda e Gerenciamento de Compromissos** desenvolvido em **React Native CLI** utilizando **TypeScript**. O projeto foi revisado para focar no agendamento de compromissos com data e hora, mantendo todos os requisitos obrigatórios de persistência de dados e organização de código, com comentários inline detalhados para fins de aprendizado.

## Tecnologias Utilizadas

*   **React Native CLI**: Estrutura principal para desenvolvimento de aplicativos móveis nativos.
*   **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript.
*   **React Hooks**: Utilização de `useState`, `useEffect`, `useCallback` e `useMemo`.
*   **AsyncStorage**: Biblioteca para persistência de dados.
*   **`react-native-vector-icons`**: Para ícones visuais.
*   **`@react-native-community/datetimepicker`**: Para seleção nativa de data e hora.

## Funcionalidades Implementadas

*   **Agendamento Completo:** Adicionar compromissos com título, data e hora.
*   **Persistência:** Dados salvos localmente com AsyncStorage.
*   **Ordenação:** Compromissos ordenados por data e hora (mais próximos primeiro).
*   **Controle de Status:** Marcar compromissos como concluídos.
*   **Exclusão:** Remover compromissos com confirmação.

## Estrutura de Pastas

```
RNToDoApp/
├── src/
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── styles/
│   └── types/
└── ...
```

## Instruções para Rodar o Aplicativo (Execução via USB)

Este projeto requer a configuração do ambiente de desenvolvimento nativo (Android Studio).

### Pré-requisitos Essenciais

1.  **Node.js** e **npm** instalados.
2.  **React Native CLI** configurado.
3.  **JDK 17** (ou superior) instalado e a variável de ambiente **`JAVA_HOME`** configurada corretamente.
4.  **Android Studio** instalado.
5.  **Cabo USB** para conectar o celular ao computador.

### Configuração do Celular (Android)

Para rodar o app no seu celular físico, você deve ativar o modo desenvolvedor e a depuração USB:

1.  **Ativar o Modo Desenvolvedor:**
    *   Vá em `Configurações` > `Sobre o Telefone`.
    *   Toque em `Número da Versão` (ou similar) **7 vezes** até ver a mensagem "Você agora é um desenvolvedor!".
2.  **Ativar a Depuração USB:**
    *   Vá em `Configurações` > `Sistema` > `Opções do Desenvolvedor`.
    *   Ative a opção **Depuração USB**.
3.  **Conexão USB:** Conecte o celular ao computador e selecione a opção **Transferência de Arquivos** (MTP) para a conexão USB.

### Passos de Execução

1.  **Navegue até o diretório do projeto:**
    ```bash
    cd RNToDoApp
    ```

2.  **Instale as dependências do Node:**
    ```bash
    npm install
    ```

3.  **Verifique a Conexão do Dispositivo (Opcional, mas Recomendado):**
    *   Em um terminal, execute: `adb devices`
    *   Seu dispositivo deve aparecer listado com o status `device`. Se aparecer `unauthorized`, aceite a permissão de depuração USB no seu celular.

4.  **Inicie o Servidor Metro (Passo 1 de 2):**
    *   Abra um terminal e inicie o servidor Metro. **Mantenha este terminal aberto.**
    ```bash
    npx react-native start
    ```

5.  **Execute o Aplicativo no Celular (Passo 2 de 2):**
    *   Abra um **NOVO terminal** e execute o comando para compilar e instalar o app no seu celular:
    ```bash
    npx react-native run-android
    ```
    *   **Aguarde:** A primeira compilação pode levar alguns minutos. O terminal mostrará o progresso do Gradle.
    *   Ao finalizar, o aplicativo será instalado e aberto automaticamente no seu celular.

### Solução de Problemas de Conexão (Se o App Abrir, mas Ficar em Tela Branca)

Se o aplicativo abrir, mas não carregar o JavaScript (tela branca ou erro de rede), o celular não está conseguindo acessar o servidor Metro no seu computador.

1.  **Verifique a Rede:** Seu celular e computador devem estar na **mesma rede Wi-Fi**.
2.  **Configurar o IP do Servidor (Se a Rede Wi-Fi não funcionar):**
    *   Descubra o endereço IP local do seu computador (Ex: `192.168.1.10`).
    *   No seu celular, abra o **Menu do Desenvolvedor** (agite o celular).
    *   Vá em **"Settings"** (Configurações).
    *   Selecione **"Debug server host & port for device"**.
    *   Digite o IP do seu computador seguido da porta do Metro: `seu_ip_aqui:8081` (Ex: `192.168.1.10:8081`).
    *   Volte e selecione **"Reload"** (Recarregar).

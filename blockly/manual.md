# Manual Completo - SomosChat Script

Guia de referência para todos os elementos do Editor de Blocos.

## 1. Introdução

Bem-vindo ao **Editor Visual SomosChat Script**. Esta ferramenta permite que você crie fluxos conversacionais complexos arrastando e soltando blocos, sem precisar escrever código manualmente.

### Visão Geral do Editor

A interface é dividida em duas áreas principais:

![Interface do Editor](/editor_overview_1767460495584.png)

1.  **Menu de Blocos (Toolbox)**: À esquerda, você encontra todos os blocos disponíveis organizados por categorias coloridas (ex: *Mensagens*, *Fluxo*, *Memória*).
2.  **Área de Trabalho (Workspace)**: A grande área quadriculada onde você constrói seu script. É um espaço infinito; você pode arrastar para mover a visão ou usar a roda do mouse para zoom.

---

### Como Usar

#### Manipulando Blocos
*   **Adicionar**: Clique em uma categoria no menu e arraste um bloco para a área de trabalho.
*   **Conectar**: Aproxime um bloco do outro até ver uma linha amarela de destaque. Solte para conectar. O "click" sonoro confirma o encaixe.
*   **Mover**: Clique e arraste qualquer bloco (ou grupo de blocos) para reorganizar.

#### Gerenciando Blocos (Menu de Contexto)
Ao clicar com o **Botão Direito** em qualquer bloco, você abre um menu de opções especiais:

![Menu de Contexto](/block_context_menu_1767460511334.png)

*   **Duplicar**: Cria uma cópia exata do bloco e seus conteúdos.
*   **Adicionar Comentário**: Permite escrever notas pessoais no bloco (aparece um ícone de `?`).
*   **Desabilitar Bloco**: O bloco fica cinza e é *ignorado* na geração do script. Útil para testes sem precisar deletar a lógica.
*   **Deletar Bloco**: Remove o bloco. (Atalho: Selecione e aperte `Delete` ou `Backspace`).

> [!TIP]
> **Dica**: Use `Ctrl+Z` para desfazer e `Ctrl+Y` para refazer ações.

---

### Gestão do Projeto

Para garantir a segurança do seu trabalho, utilize a barra de ferramentas no topo da página:

![Barra de Ferramentas](/project_toolbar_1767460523676.png)

*   **Exportar Projeto**: Salva todo o seu trabalho atual em um arquivo `.xml` no seu computador. Faça isso regularmente como backup.
*   **Importar Projeto**: Carrega um arquivo `.xml` salvo anteriormente.
    > [!WARNING]
    > **Atenção**: Importar um projeto **substitui** tudo que está na área de trabalho atual. Salve seu trabalho antes de importar outro!
*   **Visualizar Código**: Abre uma janela para ver o script final gerado, pronto para copiar e usar no SomosChat.

---

## 2. Elementos do Toolbox (Menu de Blocos)

### Interação (Verde Escuro)
Blocos responsáveis pela comunicação direta com o usuário.

#### 💬 Escrever Mensagem
Envia um texto simples para o chat.
- **Uso**: Bloco principal para falar com o usuário.
- **Entrada**:
    - `Texto`: Conteúdo da mensagem.

---

#### 📋 Menu de Opções (`::opc`)
Cria um menu de opções dinâmico. As opções são carregadas a partir de um **Grupo de Listas** pré-definido na tela "Listas" do sistema.
- **Campos e Configurações**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Gravar em (%)** | Variável de memória onde a escolha do usuário será salva. |
    | **Lista** | Selecione o Grupo de Lista que contém as opções a serem exibidas. |
    | **Ir para** | Cena de destino para onde o fluxo irá após a seleção. |
    | **Ordem** | Ordenação dos itens: Crescente, Decrescente ou Aleatório. |
    | **Tipo** | O que exibir: `Numérico (1-n)` ou `Nome da Opção` (texto). |
    | **Formato** | Máscara de exibição (Padrão: `:op - :txt`). `:op` é o índice/número, `:txt` é a descrição. |
    | **Separador** | Como dividir as opções: Quebra de Linha, Espaço ou Vírgula. |
    | **Opção Extra** | Adiciona um item fixo ao final (ex: "Sair" ou "Voltar"). Aceita texto ou variável. |
    | **Ir para Extra** | Cena específica caso o usuário escolha a Opção Extra. |

---

#### ↩️ Quebra de Linha
Insere um pulo de linha (`\n`) dentro do mesmo balão de mensagem.
- **Dica**: Use dentro de um bloco "Juntar Texto" para formatar mensagens longas.

---

#### 🗨️ Quebra de Mensagem (`:br`)
Força a divisão da fala em dois balões separados.
- **Efeito**: O robô envia o primeiro texto, e em seguida envia um segundo balão imediatamente.

---

#### 🔗 Juntar Texto
Concatena (une) múltiplos pedaços de informação em uma única mensagem.
- **Uso Comum**: Montar frases que misturam texto fixo com variáveis.
    - *Exemplo*: "Olá " + `%nome%` + ", tudo bem?"

---

#### 📎 Mensagem + Variável Binário
Envia uma mensagem acompanhada de um anexo (mídia) que está carregado em memória.
- **Entrada**:
    - `Texto`: Legenda da mídia.
    - `Variável`: Nome da variável que contém o arquivo (ex: `%arquivo_pdf%`).

---

#### 📍 Localização
Envia um pino de localização geográfica (mapa) para o usuário.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Descrição** | Nome do local (ex: "Sede da Empresa"). |
    | **Latitude** | Coordenada Latitude (ex: `-23.5505`). |
    | **Longitude** | Coordenada Longitude (ex: `-46.6333`). |

### Fluxo (Roxo)
Blocos que controlam a lógica, decisões e pausas na conversa.

#### 🔀 Se / Então / Senão
Bloco de decisão principal. Executa caminhos diferentes dependendo de uma condição. Por padrão, ele vem apenas com o caminho "Verdadeiro" (Então).

- **Estrutura Padrão**: **SE** a condição for verdadeira -> Executa os blocos internos.
- **Como adicionar o "Senão" (Else)**:
    1.  Clique no ícone de **engrenagem azul** no canto superior esquerdo do bloco.
    2.  Uma pequena janela (bolha) aparecerá com dois blocos: "Se" e "Senão".
    3.  Arraste o bloco **"Senão"** para dentro do bloco **"Se"** na janela da bolha.
    4.  O bloco principal no workspace ganhará automaticamente a nova boca para o caminho "Senão".

> [!NOTE]
> Essa interface "Mutator" ajuda a manter o script limpo, exibindo apenas o que você realmente está usando.

---

#### ⚖️ Condição (Lógica)
Monta a regra para o bloco "Se".
- **Parâmetros**:
    - `Valor A`: Primeiro dado para comparação.
    - `Operador`: (`==` Igual, `!=` Diferente, `>` Maior, etc).
    - `Valor B`: Segundo dado para comparação.
- **Combinação**: Use os blocos **"Lógica e/ou"** para criar regras complexas (ex: `Idade > 18 E Nome != ""`).

---

#### ⏳ Pausar (`:t`)
Interrompe a execução por um tempo determinado antes de continuar.
- **Entrada**:
    - `Segundos`: Tempo de espera (ex: `5`).
- **Uso**: Dar tempo para o usuário ler uma mensagem longa antes de enviar a próxima.

---

#### 🏁 Enviar mensagem (Saída)
Define uma ação final para o fluxo ou envia uma mensagem de encerramento.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Mensagem** | Texto final a ser enviado. |
    | **Ação** | Comportamento após envio: `{end}` (Encerrar), `{true}` (Continuar), `{false}` (Repetir). |

---

#### 🛡️ Ignorar estas entradas
Define uma lista de valores que o robô deve considerar "inválidos" na resposta do usuário, forçando uma repetição ou ignorando a entrada.
- **Uso**: Filtrar respostas vazias ou comandos de sistema específicos.

---

#### ⏱️ Checar limite da sessão
Verifica tecnicamente se o tempo da sessão do usuário expirou (`::lmt`).
- **Variáveis Relacionadas**:
    - **Valor do Limite**: Retorna a configuração de timeout da sessão.

### Memória (Rosa/Roxo Claro)
Gerenciamento de dados, variáveis e contexto.

#### 💾 Definir Variável de Sessão (`%`)
Grava um dado que persiste durante **toda a conversa** do usuário.
- **Entrada**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Nome da Variável** | Identificador único (ex: `nome_cliente`). |
    | **Valor** | O dado a ser salvo (Texto, Número ou outra Variável). |

---

#### ⚡ Definir Variável de Cena (`$`)
Grava um dado temporário, válido apenas para a **cena/etapa atual**.
- **Uso**: Cálculos intermediários ou contadores temporários que não precisam ser salvos no banco de dados.

---

#### 🗑️ Limpar Variáveis
Apaga todas as variáveis da sessão atual (`::clm`).
- **Atenção**: O usuário perderá todo o contexto acumulado. Use com cuidado (ex: opção "Reiniciar conversa").

---

#### 🔍 Acessar Variáveis
Blocos para ler valores armazenados.
*   **%% Variável de Sessão %%**: Retorna o valor de uma variável salva (`%nome%`).
*   **$ Variável de Sistema $**: Acessa contadores internos ou metadados da plataforma (`$id$`, `$origem$`).

---

#### 🔢 Formatadores Numéricos
Transforma como o número é exibido no texto.
*   **Variável Fracionada (`:f`)**: Garante formato decimal com ponto (ex: `10.5`).
*   **Variável Moeda (`:money`)**: Formata como valor monetário local (ex: `R$ 10,50`).

---

#### 📅 Formatador de Data (`:format`)
Formata uma data armazenada seguindo um padrão.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Variável** | Nome da variável contendo a data. |
    | **Formato** | Máscara de saída (ex: `dd/MM/yyyy HH:mm`). |

---

#### 🧩 Leitor JSON (`@`)
Navega dentro de um objeto JSON complexo armazenado em uma variável.
- **Estrutura**: `%var_json@propriedade:subpropriedade%`
- **Exemplo**: Se a variável `%api_result%` tem `{ "user": { "id": 99 } }`, use Propriedade `user` e Subpropriedade `id` para pegar `99`.

---

#### 🛠️ Utilitários de Texto
*   **Limpar texto (`:unescape`)**: Remove caracteres de controle que podem quebrar integrações.
*   **Pegar Índice (`:N`)**: Se a variável for uma lista separada por vírgulas, pega o item na posição N.


### Usuário (Marrom/Cobre)
Ferramentas de autenticação, registro e gestão de perfil.

#### 👤 Registrar Usuário (`::reg`)
Cria ou identifica um usuário na base de dados do sistema.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Ref 1 (Obrigatório)** | Identificador primário (ex: CPF, Email, Telefone). |
    | **Ref 2 (Opcional)** | Identificador secundário para validação extra. |
- **Retorno**:
    - Verifica a variável `$reg_erro$`. Se for `1`, houve falha no registro.
    - O status do login pode ser conferido em `%login_ref%`.

---

#### 🔐 Autenticação
Controle de acesso (Login/Logout).
*   **Autenticar (`::lgn`)**: Efetua o login do usuário baseado nas referências cadastradas.
*   **Deslogar (`::lgf`)**: Encerra a sessão autenticada, mas mantém as variáveis de sessão ativas.

---

#### ✏️ Atualizar Dados (`::set`)
Grava informações específicas no perfil do usuário no banco de dados.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Campo** | Nome do campo no banco (ex: `email`, `endereco`). |
    | **Valor** | Novo dado a ser gravado. |
- **Confirmação**:
    - A variável de sistema `$set_retorno$` conterá o resultado da operação.

---

#### 👓 Ler Dados (`::get`)
Recupera uma informação do perfil do usuário para uma variável de sessão.
- **Entrada**:
    - `Campo`: Nome do campo a ser lido (ex: `saldo_pontos`).
    - `Variável`: Onde salvar o valor lido (ex: `%meu_saldo%`).

---

#### 🚫 Banir Usuário (`::ban`)
Bloqueia temporariamente o usuário por excesso de tentativas ou comportamento suspeito.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Tentativas** | Número máximo de erros permitidos antes do ban. |
    | **Tempo (s)** | Duração do bloqueio em segundos. |
    | **Ação** | O que fazer ao banir (ex: `{end}` para encerrar conversa). |

---

#### 🗑️ Remover Registro (`::urg`)
Exclui permanentemente o usuário da base de dados.
- **Uso**: Implementação de "Direito ao Esquecimento" (LGPD) ou limpeza de base.

---

### Dados (Laranja/Cobre)
Manipulação de tabelas auxiliares e formulários de pesquisa.

#### 📊 Tabelas Auxiliares
Sistema para armazenar e consultar dados estruturados fora da sessão (ex: Tabela de Preços, Catálogo).

*   **Gravar na Tabela (`::tab`)**:
    Grava a memória atual do bot (JSON) em uma tabela vinculada a um registro. Esta memória contém todas as informações coletadas na interação e retornos de APIs, permitindo consultas posteriores.
    - **Entrada**:
        - `Tabela`: Lista suspensa com as tabelas disponíveis.
        - `Identificador do registro`: Chave única da linha (Texto, `%variavel_sessao%` ou `$variavel_sistema$`).
        - `URL Externa (Opcional)`: URL para disparo ou referência externa.
    - **Retorno**:
        - A variável de sistema **`Status da Gravação/Leitura (Tabela)`** (`$tabretorno$`) retornará `1` para sucesso ou `0` para falha.

*   **Ler da Tabela (`::gtb`)**:
    Busca o conteúdo (JSON da memória do bot) gravado anteriormente em uma tabela e o salva em uma variável de sessão.
    - **Parâmetros**:
        - `Tabela`: Lista suspensa para escolher a tabela de origem.
        - `Identificador do registro`: Chave única usada na gravação.
        - `Nome da variável de sessão`: Onde o JSON resultante será armazenado (ex: `%resultado%`).
    - **Retorno**:
        - A variável de sistema **`Status da Gravação/Leitura (Tabela)`** (`$tabretorno$`) retornará `1` se o registro foi encontrado ou `0` se não foi encontrado.

---

#### 📝 Iniciar Formulário (`::frm`)
Gera links únicos para formulários externos (ex: Pesquisa de Satisfação) vinculados à sessão atual.

1.  **Iniciar Formulário**: O bloco `::frm` permite selecionar um formulário pré-configurado a partir de uma lista suspensa.
2.  **Obter Dados**:
    *   **GUID do Formulário**: Variável de sistema `$formguid$` retornando o ID único gerado.
    *   **URL do Formulário**: Variável de sistema `$formurl$` retornando o link clicável para enviar ao usuário.

### Integrações (Verde Claro)
Conectividade com sistemas externos (APIs, Webhooks e geração de arquivos).

#### 🌐 Chamar API Rest (`::api`)
Realiza uma requisição HTTP para um serviço externo.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Método** | Verbo HTTP (`GET`, `POST`, `PUT`, `DELETE`). |
    | **URL** | Endereço do endpoint (ex: `https://api.meusite.com/v1/user`). |
- **Retorno**:
    - **Status (`$api_status$`)**: `1` para Sucesso (200 OK), `0` para Erro.
    - **Resposta (`%api_retorno%`)**: Contém o corpo (JSON/Texto) da resposta.

---

#### 🔑 Definir Token (`::api`)
Configura o cabeçalho de autorização para as *próximas* chamadas de API.
- **Entrada**:
    - `Valor`: Geralmente `Bearer <seu_token>` ou `Basic <hash>`.

---

#### 📡 Webhook (`::whk`)
Envia **todos** os dados da sessão atual ("dump") para uma URL externa via POST.
- **Uso**: Integração passiva para logs ou analytics em tempo real.

---

#### 📄 Gerar PDF (`::pdf`)
Cria um documento PDF dinâmico e salva em uma variável de memória.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Variável** | Onde o arquivo PDF será salvo (ex: `%meu_contrato%`). |
    | **Nome** | Nome final do arquivo (ex: `contrato.pdf`). |
    | **Fonte** | Conteúdo HTML ou URL para converter. |
    | **Config** | Charset (`UTF-8`), Orientação (`Retrato`) e Papel (`A4`). |

---

#### 📥 Download de Arquivo (`::gbn`)
Baixa um arquivo público da internet para uma variável de memória.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **URL** | Endereço direto do arquivo. |
    | **Variável** | Onde o arquivo será salvo (ex: `%foto_perfil%`). |

### Matemática (Azul)
Execução de cálculos e operações lógicas.

#### 🧮 Calcular (Fórmula) (`::mth`)
Realiza operações matemáticas entre números ou variáveis.
- **Estrutura**: Composto por dois valores e um operador.
    - `Valor A` + `Valor B`
    - `Valor A` * `Valor B`
- **Agrupamento**: Use o bloco **"( )"** para definir prioridade nas operações (ex: `(A+B) * C`).
- **Variável de Retorno (Opcional)**: Clique no ícone de engrenagem (mutator) para adicionar o campo "Guardar em (%)". Isso permite definir um nome customizado para a variável que receberá o resultado (ex: `%total_vendas%`), em vez de usar apenas o padrão `$mthretorno$`.

---

#### 🔢 Resultado do Cálculo
Variável de sistema que armazena o resultado da **última** operação matemática realizada.
- **Variável**: `$mthretorno$`
- **Exemplo**:
    1.  Bloco Calcular: `10 + 5`
    2.  Bloco Mensagem: "O resultado é `$mthretorno$`" (Exibirá: "O resultado é 15").

---

#### ➕ Aritmética e Números
Blocos básicos para construção de fórmulas.
*   **Número**: Insere um valor fixo (int ou float).
*   **Operações**: Soma `+`, Subtração `-`, Multiplicação `*`, Divisão `/`. (O script não suporta Potência `^`).

### Texto (Laranja Claro)
Manipulação avançada de strings e textos.

#### 🔡 Manipulação Básica
Funções para cortar e analisar textos.
*   **Nota**: As operações salvam o resultado automaticamente na variável de sistema `%var_txt_result%`.

*   **Tamanho do Texto (`::len`)**: Conta quantos caracteres o texto possui.
*   **Esquerda / Início (`::esq`)**: Pega os primeiros **N** caracteres do texto.
*   **Direita / Final (`::dir`)**: Pega os últimos **N** caracteres do texto.
*   **Subsequência (`::sbt`)**: Extrai um pedaço específico do meio do texto.
    - *Exemplo*: De "Bananas", pegar a partir da letra 3, pegar 3 letras -> "nan".

---

#### 🔁 Substituição (`::rpl`)
Troca todas as ocorrências de um termo por outro.
- **Parâmetros**:
    | Campo | Descrição |
    | :--- | :--- |
    | **Texto** | O conteúdo original onde será feita a busca. |
    | **Buscar** | O termo ou palavra que você quer remover. |
    | **Trocar por** | O novo termo que será inserido no lugar. |

---

#### 📤 Resultado de Texto
Variável que armazena o retorno da última função de texto executada.
- **Variável**: `%var_txt_result%`
- **Fluxo de Uso**:
    1.  Use um bloco **Esquerda** para pegar o primeiro nome.
    2.  Use o bloco **Resultado de Texto** dentro de um `::msg` para mostrar o nome cortado.

### Templates (Cinza/Ouro)
Atalhos de conteúdo pré-definido. Permite inserir mídias e arquivos que já estão cadastrados na Galeria do Sistema.

#### 🗄️ Conceito: Galeria
Estes blocos não enviam o arquivo diretamente (binário), mas sim uma **referência** (ID) para um conteúdo hospedado na plataforma.
- **Formato Gerado**: `@@tipo[id]` (ex: `@@img[10]`).

---

#### 🖼️ Mídia Visual
*   **Imagem (`sc_sys_img`)**: Envia uma foto única.
*   **Grupo de Imagens (`sc_sys_gim`)**: Envia um carrossel ou álbum de fotos.

---

#### 📁 Arquivos e Documentos
*   **Arquivo (`sc_sys_arq`)**: Envia documentos gerais (PDF, DOC, ZIP).
*   **Grupo de Arquivos (`sc_sys_gaq`)**: Envia múltiplos documentos de uma vez.

---

#### 🔊 Áudio e Voz
*   **Áudio (`sc_sys_aud`)**: Envia um arquivo de som (MP3/OGG).

---

#### 📇 Contatos
*   **V-Card (`sc_sys_vcd`)**: Envia um cartão de contato virtual (VCF) que pode ser salvo na agenda do celular do usuário.

---

#### 💬 Modelos de Texto
*   **Modelo Msg (`sc_sys_msg`)**: Insere um texto padrão cadastrado (snippet), útil para avisos legais, saudações padrão ou textos repetitivos.

## 3. Gestão de Projetos
Ferramentas essenciais para salvar, carregar e exportar o seu trabalho.

### 📤 Exportar Projeto (Backup)
Salva todo o estado atual do seu editor em um arquivo no seu computador.
- **Formato**: Arquivo `.xml` (ex: `projeto_chatbot.xml`).
- **Uso**: Crie backups regulares para não perder sua lógica.
- **Conteúdo**: O arquivo XML salva a posição visual dos blocos, comentários e configurações.

---

### 📥 Importar Projeto
Carrega um backup anterior para continuar editando.
- **Atenção ⚠️**: Esta ação **apaga e substitui** tudo que está na tela no momento.
- **Recomendação**: Exporte o trabalho atual antes de importar outro, caso queira guardar uma versão.

---

### 👁️ Visualizar Código Gerado
Gera o "Script Final" traduzido a partir dos seus blocos.
- **Quando usar**: Quando você terminar a lógica e quiser colocar no SomosChat.
- **Ação**: Copie o texto exibido na janela e cole no campo "Script" dentro da plataforma SomosChat.
- **Atalho**: Clique com o botão direito no fundo da tela (Workspace) e escolha "Visualizar Script".

## 4. Referência de Variáveis

Abaixo, uma lista das variáveis de sistema e de sessão padrão mais utilizadas.

### ⚙️ Variáveis de Sistema ($)
São variáveis geradas automaticamente pela plataforma.

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| $session_id$ | ID único da sessão atual. | 1337 |
| $user_id$ | ID do usuário na plataforma. | 3 |
| $user_name$ | Nome original do perfil do usuário. | Paulo Corcino |
| $user_username$ | Identificador do usuário (ex: telefone). | 557199999999@c.us |
| $bot_name$ | Nome do Bot em execução. | Atendimento Bot |
| $data$ | Data atual (formato local). | 18/07/2020 |
| $hora$ | Hora atual (HH). |  7 |
| $diasemana$ | Dia da semana (1=Dom, 7=Sáb). | 2 |
| $periododia$ | Saudação (1=Manhã, 2=Tarde, 3=Noite). | 1 |
| $input$ | Último texto enviado pelo usuário. | Olá |

### 💾 Variáveis de Sessão Padrão (%)
Variáveis de memória que podem estar disponíveis dependendo do contexto.

| Variável | Descrição |
| :--- | :--- |
| %user_phone% | Telefone do usuário (WhatsApp). |
| %user_email% | Email do usuário (se cadastrado). |
| %binario% | Conteúdo de um arquivo recebido (Objeto;Binário). |

---

## 5. Recursos Avançados

### 📥 Link Direto para Binários
Os arquivos armazenados na plataforma Somos Chat (Imagens, Áudios, Documentos) possuem um ID único. É possível montar uma URL pública para baixá-los diretamente:

**Formato da URL**:
`	ext
https://[url_da_plataforma]/[seu_app]/getfile.rule?sys=BOT&arquivo=[ID_DO_ARQUIVO]
`

**Exemplo Prático**:
https://app.somos.chat/somos/getfile.rule?sys=BOT&arquivo=3e8400173f662f24caaa_jpeg

### 📚 Documentação da API
Para integrações avançadas e consumo da API da própria plataforma Somos Chat, consulte a documentação técnica oficial no Postman:

[🔗 Acessar Documentação da API (Postman)](https://documenter.getpostman.com/view/10627449/TVYF8yP1)


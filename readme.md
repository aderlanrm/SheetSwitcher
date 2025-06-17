# SheetSwitcher

*Leia isto em [Português](readme.md) | Lea esto en [Español](README_ES.md) | Read this in [English](README_EN.md)*

Extensão para Qlik Sense que permite a alternância automática entre abas (pastas) locais ou navegação para link específico configurado.

## Características

- **Navegação Automática**: Alterna automaticamente entre as abas locais ou recarrega link externo em intervalos definidos
- **Navegação por Link Único**: Configure um link para navegação/atualização automática na mesma aba
- **Timer Contínuo**: Funciona continuamente mesmo quando a aba perde o foco
- **Auto-inicialização**: Inicia automaticamente conforme configurado
- **Controle Manual**: Botões para iniciar/parar a apresentação
- **Tela Cheia via F11**: Simula a tecla F11 para ativar modo tela cheia
- **Interface Minimalista**: Timer compacto que inicia minimizado e pode ser arrastado
- **Personalização Visual**: Estilos customizáveis para diferentes elementos

## Instalação

1. Baixe os arquivos da extensão
2. Coloque na pasta de extensões do Qlik Sense: 
   `C:\Users\[usuario]\Documents\Qlik\Sense\Extensions\SheetSwitcher\`
3. Reinicie o Qlik Sense Desktop ou atualize o browser no Qlik Sense Server

## Como Usar

### Modo Básico (Navegação entre Pastas)
1. Adicione a extensão SheetSwitcher em uma das suas pastas
2. Configure o tempo desejado entre as alternâncias (em segundos)
3. Ative/desative a opção de tela cheia conforme necessário
4. Clique em "Iniciar" para começar a apresentação automática

### Modo Avançado (Navegação com Link)
1. Adicione a extensão SheetSwitcher em uma das suas pastas
2. Configure o tempo desejado entre as alternâncias (em segundos)
3. Na seção "Link de Navegação", adicione a URL do aplicativo
4. A extensão iniciará automaticamente (se configurado)
5. O timer navegará para o link na mesma aba no intervalo configurado

## Configurações

### Configurações Básicas
- **Intervalo**: Tempo em segundos entre cada mudança de pasta/link
- **Tela Cheia (F11)**: Simula a tecla F11 para ativar/desativar modo tela cheia
- **Iniciar automaticamente sempre**: Inicia automaticamente ao carregar a página

### Link de Navegação
- **Link URL**: Campo de texto para inserir uma URL específica
- Quando um link está configurado, a navegação será para o link ao invés das pastas locais
- O link é carregado na mesma aba, substituindo o conteúdo atual

### Estilos
- Personalização de cores e fontes para diferentes elementos
- Configurações separadas para objeto, caixa de controle e título

## Funcionalidades

- Timer visível com contagem regressiva
- Navegação automática entre pastas ou para link específico
- Controle de tela cheia via simulação F11
- Interface arrastável e que inicia minimizada
- Timer contínuo (não pausa quando aba perde foco)
- Navegação na mesma aba para links configurados
- Indicação visual do modo ativo (Pastas ou Link)

## Versão

Versão atual: 1.4.2

### Changelog v1.4.2
- 🔧 **Melhoria de UX**: Timer agora inicia minimizado por padrão
- 🔧 **Interface mais limpa**: Menos intrusivo na tela inicial
- 🔧 **Comportamento otimizado**: Interface mais discreta

### Changelog v1.4.1
- 🐛 **Correção do F11**: Melhorada a simulação da tecla F11 com sequência completa (keydown + keyup)
- 🐛 **Correção do timer contínuo**: Removida a pausa automática quando a aba perde foco
- 🐛 **Correção de comportamento**: Timer agora funciona consistentemente em background

### Changelog v1.4.0
- ✨ **Link único**: Mudança para permitir apenas um link ao invés de múltiplos
- ✨ **Navegação na mesma aba**: Links agora são carregados na mesma aba
- ✨ **Fullscreen por F11**: Substituída API por simulação da tecla F11
- 🔧 **Interface simplificada**: Removida opção "auto-start com links"
- 🔧 **Código mais limpo**: Removido gerenciamento de múltiplas abas

### Changelog v1.3.0
- ✨ **Nova funcionalidade**: Opção para iniciar automaticamente sempre, não apenas com links
- 🔧 **Melhoria**: Inicialização automática em tela cheia com timer minimizado
- 🎯 **Otimização**: Experiência sem interação para apresentações automáticas

### Changelog v1.2.2
- 🐛 **Correção crítica**: Timer agora mantém funcionamento correto durante fullscreen
- 🎯 **Correção específica**: Timer não pausa mais ao entrar em fullscreen iniciado pela extensão
- 🔧 **Melhoria**: Controle aprimorado para distinguir fullscreen da extensão vs. mudança de aba
- 📋 **Logs**: Logging detalhado para debugging de problemas de visibilidade

### Changelog v1.2.1
- 🐛 **Correção crítica**: Timer não pausa mais incorretamente ao sair do fullscreen
- 🔧 **Melhoria**: Eventos de fullscreen agora são detectados corretamente
- 🎯 **Otimização**: Controle refinado de visibilidade para evitar pausas desnecessárias
- 📋 **Interface**: Indicadores visuais para estados de navegação e fullscreen

### Changelog v1.2.0
- ✨ **Nova funcionalidade**: Navegação automática entre links externos
- ✨ **Otimização**: Gerenciamento de abas do navegador para melhor performance
- ✨ **Auto-start**: Inicialização automática quando há links configurados
- 🔧 **Melhoria**: Interface atualizada com indicação do modo ativo
- 📝 **Configuração**: Nova seção para configurar links de navegação

## Autor

Aderlan | [bideaz.in](https://www.bideaz.com.br)

Se você achou este projeto útil e ele te ajudou a criar dashboards mais dinâmicos no Qlik Sense, considere me pagar um café!

### 💰 PIX

Você pode fazer uma doação via PIX para apoiar o desenvolvimento contínuo desta e outras extensões para Qlik Sense:

```
chave: pix@bideaz.in
```

Para acessar o QR code do PIX, visite: [https://www.bideaz.com.br/pix](https://www.bideaz.com.br/pix)

### 💳 PayPal

Também é possível fazer uma doação via PayPal usando o mesmo e-mail:

```
pix@bideaz.in
```

Qualquer valor é bem-vindo e me ajuda a manter projetos de código aberto como este!

<p align="center">
🙏 Sua contribuição faz a diferença! 🙏
</p>

## Visão Geral

A extensão **SheetSwitcher** permite alternar automaticamente entre pastas no Qlik Sense, com funcionalidades de controle de tempo, efeitos visuais, tela cheia e personalização completa da interface.

### 💯 Compatibilidade Universal

- ✅ **Funciona em qualquer navegador** compatível com Qlik Sense (Chrome, Firefox, Edge, Safari)
- ✅ **Sem necessidade de extensões de navegador** ou complementos adicionais
- ✅ **Compatível com todas as versões do Qlik Sense:**
  - Qlik Sense Cloud
  - Qlik Sense Enterprise
  - Qlik Sense Desktop 
- ✅ **Plug & Play:** instale e use imediatamente, sem configurações complexas

## Funcionalidades

## Funcionalidades

- ⏱️ **Timer Global:** 
  - Intervalo configurável por aba
  - Contagem regressiva em formato MM:SS
  - Timer contínuo que não pausa quando aba perde foco
  - Inicia minimizado por padrão

- 🎮 **Controles:**
  - Botão Iniciar/Parar com feedback visual
  - Minimização automática ao iniciar
  - Clique no título para minimizar/maximizar
  - Arrastar e soltar em qualquer posição da tela

- 🖥️ **Interface:**
  - Caixa de controle global sempre visível
  - Posição inicial centralizada no topo
  - Timer minimalista quando minimizado
  - Interface discreta que inicia minimizada
  - Cursor pointer para melhor usabilidade

- 🔄 **Navegação:**
  - Troca automática de pastas (modo pastas)
  - Navegação para link único na mesma aba (modo link)
  - Loop contínuo ao chegar ao final
  - Modo tela cheia via simulação F11
  - Timer sincronizado entre contextos

## Estrutura de Arquivos

```
SheetSwitcher/
├── SheetSwitcher.qext      # Metadados da extensão
├── SheetSwitcher.js        # Lógica principal
├── style.css               # Estilos personalizados
└── README.md               # Documentação
```

## Propriedades Configuráveis

### Configurações
- **Intervalo (segundos):** tempo entre trocas de pasta ou recarregamento de link
- **Tela cheia (F11):** simula tecla F11 para ativar/desativar modo tela cheia
- **Iniciar automaticamente sempre:** inicia automaticamente ao carregar a página

### Link de Navegação
- **Link URL:** URL única para navegação automática na mesma aba

### Estilos
#### Instância
- Tamanho da fonte
- Cor do texto
- Cor de fundo

#### Caixa
- Tamanho da fonte
- Cor do texto
- Cor de fundo

#### Título
- Tamanho da fonte
- Cor do texto
- Cor de fundo

## Uso

1. **Instalação:**
   - Copie a pasta para o diretório de extensões do Qlik Sense

2. **Configuração:**
   - Adicione a extensão em qualquer pasta
   - Configure intervalo e estilos desejados
   - As configurações serão mantidas entre pastas

3. **Operação:**
   - Clique em **Iniciar** para começar (minimiza automaticamente)
   - Arraste a caixa para qualquer posição
   - Clique no título para minimizar/maximizar
   - Clique em **Parar** para interromper

## Instalação do GitHub

```bash
# Clone o repositório
git clone https://github.com/aderlanrm/SheetSwitcher.git

# Vá para o diretório de extensões do Qlik Sense
# Normalmente em C:\Users\[seu-usuario]\Documents\Qlik\Sense\Extensions

# Copie a pasta SheetSwitcher para o diretório de extensões
```

## Requisitos

- Qlik Sense ≥ 3.0.x
- jQuery (incluso no Qlik Sense)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

MIT License - Use livremente em seus projetos

### Licença MIT Explicada de Forma Simples

A licença MIT é como uma regra legal para compartilhar este programa. Imagine que você criou um brinquedo incrível e decidiu compartilhar com seus amigos. A licença MIT é como dizer:

- ✅ Você pode usar meu brinquedo como quiser
- ✅ Você pode modificar meu brinquedo (adicionar mais peças ou mudar as cores)
- ✅ Você pode compartilhar o brinquedo com outros amigos
- ✅ Você pode até usar o brinquedo para criar um projeto na feira de ciências da escola

A única condição é que você mantenha o pequeno cartão que diz quem criou o brinquedo originalmente. Isso é para que todos saibam de onde o brinquedo veio, mesmo depois de muitas pessoas terem brincado com ele!

E o melhor de tudo: se algo quebrar enquanto você estiver brincando, não é culpa de quem criou o brinquedo! Cada um é responsável pela forma como usa.

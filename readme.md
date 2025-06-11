# SheetSwitcher

Extensão para Qlik Sense que permite a alternância automática entre abas (sheets) com controle de tempo personalizável.

## Características

- **Navegação Automática**: Alterna automaticamente entre as abas em intervalos definidos
- **Controle Manual**: Botões para iniciar/parar a apresentação
- **Tela Cheia**: Opção para ativar modo tela cheia durante a apresentação
- **Interface Minimalista**: Timer compacto que pode ser minimizado e arrastado
- **Personalização Visual**: Estilos customizáveis para diferentes elementos

## Instalação

1. Baixe os arquivos da extensão
2. Coloque na pasta de extensões do Qlik Sense: 
   `C:\Users\[usuario]\Documents\Qlik\Sense\Extensions\SheetSwitcher\`
3. Reinicie o Qlik Sense Desktop ou atualize o browser no Qlik Sense Server

## Como Usar

1. Adicione a extensão SheetSwitcher em uma das suas sheets
2. Configure o tempo desejado entre as alternâncias (em segundos)
3. Ative/desative a opção de tela cheia conforme necessário
4. Clique em "Iniciar" para começar a apresentação automática
5. Use o timer no topo da tela para controlar a apresentação

## Configurações

- **Intervalo**: Tempo em segundos entre cada mudança de aba
- **Tela Cheia**: Ativa/desativa o modo tela cheia automático
- **Estilos**: Personalização de cores e fontes para diferentes elementos

## Funcionalidades

- Timer visível com contagem regressiva
- Navegação automática entre sheets
- Controle de tela cheia integrado
- Interface arrastável e minimizável
- Pausa e retomada da apresentação

## Versão

Versão atual: 1.1.3

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

A extensão **SheetSwitcher** permite alternar automaticamente entre pastas (sheets) no Qlik Sense, com funcionalidades de controle de tempo, efeitos visuais, tela cheia e personalização completa da interface.

### 💯 Compatibilidade Universal

- ✅ **Funciona em qualquer navegador** compatível com Qlik Sense (Chrome, Firefox, Edge, Safari)
- ✅ **Sem necessidade de extensões de navegador** ou complementos adicionais
- ✅ **Compatível com todas as versões do Qlik Sense:**
  - Qlik Sense Cloud
  - Qlik Sense Enterprise
  - Qlik Sense Desktop 
- ✅ **Plug & Play:** instale e use imediatamente, sem configurações complexas

## Funcionalidades

- ⏱️ **Timer Global:** 
  - Intervalo configurável por aba
  - Contagem regressiva em formato MM:SS
  - Mantém última configuração entre pastas
  - Persiste configurações mesmo sem instância

- 🎮 **Controles:**
  - Botão Iniciar/Parar com feedback visual
  - Minimização automática ao iniciar
  - Clique no título para minimizar/maximizar
  - Arrastar e soltar em qualquer posição da tela

- 🖥️ **Interface:**
  - Caixa de controle global sempre visível
  - Posição inicial centralizada no topo
  - Timer minimalista quando minimizado
  - Efeito hover no título
  - Arredondamento e sombreamento suaves
  - Cursor pointer para melhor usabilidade

- 🎨 **Personalização:**
  - Cores e fontes totalmente configuráveis
  - Estilos separados para:
    - Instância do objeto
    - Caixa de controle
    - Título/Timer
  - Persistência de estilos personalizados

- 🔄 **Navegação:**
  - Troca automática de pastas
  - **Navegação inteligente:** pula pastas ocultas, respeitando apenas sheets visíveis
  - Loop contínuo ao chegar ao final
  - Modo tela cheia opcional (F11)
  - Timer sincronizado entre pastas

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
- **Intervalo (segundos):** tempo entre trocas de pasta
- **Tela cheia (F11):** ativa/desativa modo tela cheia automático

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

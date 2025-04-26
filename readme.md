# SheetSwitcher Qlik Sense Extension

**Versão:** 1.0.0  
**Autor:** Aderlan | bideaz.in  
**Licença:** MIT

## Visão Geral

A extensão **SheetSwitcher** permite alternar automaticamente entre pastas (sheets) no Qlik Sense, com funcionalidades de controle de tempo, efeitos visuais, tela cheia e personalização completa da interface.

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

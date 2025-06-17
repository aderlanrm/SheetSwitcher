define([
  "qlik",
  "jquery",
  "text!./style.css"
], function (qlik, $, cssContent) {
  // Injeta CSS personalizado
  $("<style>").html(cssContent).appendTo("head");
  // Versão da extensão (deve ser atualizada quando a versão no qext for alterada)
  var EXTENSION_NAME = "SheetSwitcher";
  var EXTENSION_VERSION = "1.4.2";  // Configuração global 
  if (!window.sheetSwitcherConfig) {
    window.sheetSwitcherConfig = {
      isPlaying: false,
      tempo: 10,
      fullscreen: true,
      remainingTime: 10,
      timer: null,
      lastUpdatedSheetId: null,
      minimized: true, // Inicia minimizada por padrão
      link: '', // Um único link ao invés de array
      autoStartAlways: true, // Nova configuração para iniciar automaticamente
      isTabActive: true, // Controla se esta aba está ativa
      pausedByNavigation: false, // Pausado devido à navegação para nova aba
      visibilitySetup: false, // Controla se os listeners já foram configurados
      isExitingFullscreen: false, // Flag para indicar que está saindo do fullscreen
      fullscreenListenersSetup: false, // Controla se os listeners de fullscreen foram configurados
      isNavigating: false, // Flag para indicar que está navegando para nova aba
      fullscreenInitiatedByExtension: false, // Flag para indicar que o fullscreen foi iniciado pela extensão
      styles: {
        instance: { fontSize: '12px', color: 'rgba(0,0,0,1)', background: 'rgba(255,255,255,1)' },
        container: { fontSize: '13px', color: 'rgba(0,0,0,1)', background: 'rgba(255,255,255,1)' },
        header:    { fontSize: '14px', color: 'rgba(51,51,51,1)', background: 'rgba(238,238,238,1)' }
      }
    };  }
  // Controle de visibilidade da aba (simplificado - não pausa timer)
  function setupTabVisibilityControl() {
    var cfg = window.sheetSwitcherConfig;    // Listener para mudança de visibilidade da página (apenas para log)
    document.addEventListener('visibilitychange', function() {
      cfg.isTabActive = !document.hidden;
      console.log('SheetSwitcher: Visibilidade mudou - isTabActive:', cfg.isTabActive);
      // Timer continua rodando independente da visibilidade
    });

    // Listener para foco da janela (apenas para controle de estado)
    window.addEventListener('focus', function() {
      cfg.isTabActive = true;
    });    window.addEventListener('blur', function() {
      cfg.isTabActive = false;
    });
  }

  // Configurar listeners para eventos de fullscreen (simplificado para F11)
  function setupFullscreenListeners() {
    var cfg = window.sheetSwitcherConfig;
    
    if (cfg.fullscreenListenersSetup) {
      return; // Já configurado
    }
    
    console.log('SheetSwitcher: Listeners simplificados configurados (modo F11)');
    cfg.fullscreenListenersSetup = true;
  }

  // Pausa o timer sem alterar o estado isPlaying
  function pauseTimer() {
    var cfg = window.sheetSwitcherConfig;
    if (cfg.timer) {
      clearInterval(cfg.timer);
      cfg.timer = null;
    }
  }

  // Formata segundos para MM:SS
  function formatTime(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }  // Navega para próximo item (sheet ou link)
  function navigateToNext() {
    var cfg = window.sheetSwitcherConfig;
    
    if (cfg.link && cfg.link.trim()) {
      // Navegação para o link configurado
      openOrSwitchToTab(cfg.link);
    } else {
      // Navegação padrão entre pastas locais
      qlik.navigation.nextSheet();
    }
  }  // Navega para o link na mesma aba
  function openOrSwitchToTab(url) {
    var cfg = window.sheetSwitcherConfig;
    
    // Marcar que estamos iniciando navegação para evitar pausar timer imediatamente
    cfg.isNavigating = true;
    
    try {
      // Navega para o URL na mesma aba/janela
      window.location.href = url;
      console.log('SheetSwitcher: Navegando na mesma aba para:', url);
      
      // Remove flag de navegação após breve delay
      setTimeout(function() {
        cfg.isNavigating = false;
      }, 300);
      
    } catch (e) {
      console.log('SheetSwitcher: Erro ao navegar para:', url, e);
      
      // Remove flag de navegação em caso de erro
      setTimeout(function() {
        cfg.isNavigating = false;
      }, 500);
    }
  }
  // Inicia timer automático baseado nas configurações
  function checkAutoStart() {
    var cfg = window.sheetSwitcherConfig;
    
    // Verifica se deve iniciar automaticamente apenas com autoStartAlways
    var shouldAutoStart = cfg.autoStartAlways;
    
    if (shouldAutoStart && !cfg.isPlaying) {
      // Inicia automaticamente
      setTimeout(function() {
        cfg.isPlaying = true;
        cfg.remainingTime = cfg.tempo;
        cfg.pausedByNavigation = false;
        startTimer(); // A verificação de fullscreen agora está dentro de startTimer
        cfg.minimized = true;
        $('#sheetSwitcherGlobalContent').hide();
        renderGlobal();
      }, 1000); // Delay de 1 segundo para garantir que a página carregou
    }
  }// Inicia/Reinicia timer global
  function startTimer() {
    var cfg = window.sheetSwitcherConfig;
    
    if (cfg.timer) {
      clearInterval(cfg.timer);
    }
    
    // Verifica se deve ativar fullscreen quando o timer inicia
    if (cfg.fullscreen) {
      console.log('SheetSwitcher: Ativando fullscreen (F11) ao iniciar timer');
      toggleFullscreen(true).then(function(success) {
        if (!success) {
          console.log('SheetSwitcher: Erro ao simular F11');
        }
      });
    }
    
    cfg.timer = setInterval(function () {
      // Timer continua rodando independente da visibilidade da aba
      cfg.remainingTime--;
      if (cfg.remainingTime <= 0) {
        navigateToNext();
        cfg.remainingTime = cfg.tempo;
      }
      renderGlobal();
    }, 1000);
  }// Alterna fullscreen simulando tecla F11
  function toggleFullscreen(enable) {
    var cfg = window.sheetSwitcherConfig;
    
    return new Promise(function(resolve, reject) {
      try {
        // Múltiplas tentativas de simular F11
        var events = [
          // Evento keydown
          new KeyboardEvent('keydown', {
            key: 'F11',
            code: 'F11',
            keyCode: 122,
            which: 122,
            bubbles: true,
            cancelable: true,
            view: window
          }),
          // Evento keyup
          new KeyboardEvent('keyup', {
            key: 'F11',
            code: 'F11',
            keyCode: 122,
            which: 122,
            bubbles: true,
            cancelable: true,
            view: window
          })
        ];
        
        console.log('SheetSwitcher: Simulando sequência completa F11 (keydown + keyup)');
        
        // Dispara keydown
        document.dispatchEvent(events[0]);
        window.dispatchEvent(events[0]);
        
        // Pequeno delay e depois keyup
        setTimeout(function() {
          document.dispatchEvent(events[1]);
          window.dispatchEvent(events[1]);
          
          // Tenta também no elemento body
          if (document.body) {
            document.body.dispatchEvent(events[0]);
            setTimeout(function() {
              document.body.dispatchEvent(events[1]);
            }, 50);
          }
          
          console.log('SheetSwitcher: Sequência F11 completada');
          resolve(true);
        }, 50);
        
      } catch (error) {
        console.log('SheetSwitcher: Erro ao simular F11:', error.message);
        resolve(false);
      }
    });
  }

  // Verifica se fullscreen está disponível (sempre retorna true para simulação F11)
  function checkFullscreenSupport() {
    console.log('SheetSwitcher: Usando simulação F11 - sempre disponível');
    return true;
  }

  // Verifica se está em iframe
  function isInIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  // Adicionar após as funções existentes e antes do renderGlobal
  function enableDragging(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var isDragging = false;
    
    element.mousedown(function(e) {
      e.preventDefault();
      isDragging = true;
      pos3 = e.clientX;
      pos4 = e.clientY;
      
      // Remove transformação ao iniciar arrasto
      $(this).css({
        'transform': 'none',
        'left': $(this).offset().left + 'px'
      });
      
      $(document).mousemove(function(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        var newTop = element.offset().top - pos2;
        var newLeft = element.offset().left - pos1;
        
        // Limita movimento dentro da janela
        newTop = Math.max(0, Math.min(newTop, $(window).height() - element.outerHeight()));
        newLeft = Math.max(0, Math.min(newLeft, $(window).width() - element.outerWidth()));
        
        element.css({
          'top': newTop + 'px',
          'left': newLeft + 'px'
        });
      });
      
      $(document).mouseup(function() {
        isDragging = false;
        $(document).off('mousemove mouseup');
      });
    });
  }

  // Remover completamente a função centerContainer

  // Cria ou atualiza o container global
  function renderGlobal() {
    var cfg = window.sheetSwitcherConfig;
    if (!$('#sheetSwitcherGlobalContainer').length) {
      var html = ''
        + '<div id="sheetSwitcherGlobalContainer" '  
        + 'style="position:fixed; top:8px; left:50%; transform:translateX(-50%); z-index:9999;">'
        + '<div id="sheetSwitcherGlobalHeader" '       
        + 'style="display:flex; align-items:center; justify-content:center; padding:5px 10px; border-radius:3px; cursor:pointer;">'
        + '<span id="sheetSwitcherTitle" '             
        + 'style="text-align:center;"></span>'
        + '</div>'
        + '<div id="sheetSwitcherGlobalContent" style="padding:5px; display:none;"></div>' // Inicia oculto
        + '</div>';
      $('body').append(html);

      // Habilita arrastar na caixa global
      enableDragging($('#sheetSwitcherGlobalContainer'));
      
      // Evento de clique no header para minimizar/maximizar
      $('body').on('click', '#sheetSwitcherGlobalHeader', function (e) {
        if (e.which === 1 && !$(this).data('dragging')) {
          cfg.minimized = !cfg.minimized;
          $('#sheetSwitcherGlobalContent').toggle(!cfg.minimized);
          renderGlobal();
        }
      });
    }

    // Aplica estilos
    $('#sheetSwitcherGlobalContainer').css({
      'background-color': cfg.styles.container.background,
      'color': cfg.styles.container.color,
      'font-size': cfg.styles.container.fontSize,
      'border': '1px solid #ccc',
      'border-radius': '3px',
      'box-shadow': '0 2px 4px rgba(0,0,0,0.1)',
      'overflow': 'hidden',
      'width': 'auto',
      'white-space': 'nowrap'
    });

    // Atualiza header e título
    $('#sheetSwitcherGlobalHeader').css({
      'background-color': cfg.styles.header.background,
      'transition': 'background-color 0.2s'
    }).hover(
      function() { $(this).css('background-color', 'rgba(0,0,0,0.1)'); },
      function() { $(this).css('background-color', cfg.styles.header.background); }
    );    // Título sempre com a mesma cor
    $('#sheetSwitcherTitle')
      .text(cfg.minimized ? formatTime(cfg.remainingTime) : 'Timer')
      .css({
        'color': cfg.styles.header.color,
        'font-size': cfg.styles.header.fontSize,
        'font-weight': 'bold'
      });      // Conteúdo interno
    var btnText = cfg.isPlaying ? 'Parar' : 'Iniciar';
    var modoAtual = cfg.link ? ' (Link)' : ' (Pasta)';
    var proximoTexto = cfg.link ? 
      'carregar link' : 'próxima página';
    
    // Adiciona indicadores de estado especiais
    var estadoEspecial = '';
    if (cfg.isExitingFullscreen) {
      estadoEspecial = ' <small style="color:orange;">[saindo fullscreen]</small>';
    } else if (cfg.isNavigating) {
      estadoEspecial = ' <small style="color:blue;">[navegando]</small>';
    }
    
    var contentHtml = ''
      + '<button id="sheetSwitcherGlobalBtn" class="lui-button" ' 
      + 'style="font-size:' + cfg.styles.container.fontSize + '; '
      + 'color:' + cfg.styles.container.color + '; '
      + 'background:' + cfg.styles.container.background + ';">'
      + btnText + modoAtual + '</button>'
      + '<span style="margin:0 10px;">' 
      + formatTime(cfg.remainingTime) + ' para ' + proximoTexto + estadoEspecial + '</span>'
      + '<div style="text-align:center; margin:5px 0;">' + EXTENSION_NAME + ' v' + EXTENSION_VERSION + '</div>';
    $('#sheetSwitcherGlobalContent').html(contentHtml);

    // Controla a visibilidade do conteúdo baseado no estado minimized
    $('#sheetSwitcherGlobalContent').toggle(!cfg.minimized);    // Modifica o evento de clique do botão
    $('#sheetSwitcherGlobalBtn').off('click').on('click', function () {
      if (!cfg.isPlaying) {
        cfg.isPlaying = true;
        cfg.remainingTime = cfg.tempo;
        startTimer(); // A verificação de fullscreen agora está dentro de startTimer
        // Minimiza ao iniciar
        cfg.minimized = true;
        $('#sheetSwitcherGlobalContent').hide();
      } else {
        cfg.isPlaying = false;
        clearInterval(cfg.timer);
        cfg.timer = null;
        if (cfg.fullscreen) { 
          toggleFullscreen(false).then(function(success) {
            if (!success) {
              console.log('SheetSwitcher: Erro ao sair do fullscreen');
            }
          });        }
      }
      renderGlobal();
    });
  }

  return {
    definition: {
      type: 'items',
      component: 'accordion',
      items: {
        Configuracoes: {
          label: 'Configurações',
          type: 'items',
          items: {
            tempo: {
              ref: 'props.tempo',
              label: 'Intervalo (segundos)',
              type: 'number',
              defaultValue: 10
            },
            fullscreen: {
              ref: 'props.fullscreen',
              label: 'Tela cheia (F11)',
              type: 'boolean',
              defaultValue: true
            },
            autoStartAlways: {
              ref: 'props.autoStartAlways',
              label: 'Iniciar automaticamente',
              type: 'boolean',
              defaultValue: true
            }
          }
        },
        Links: {
          label: 'Link de Navegação',
          type: 'items',
          items: {
            linksInfo: {
              type: 'string',
              component: 'text',
              label: 'Configure um link para navegação automática. Se nenhum link for configurado, a navegação será entre pastas locais.'
            },
            link: {
              ref: 'props.link',
              label: 'Link URL',
              type: 'string',
              defaultValue: ''
            }
          }
        },
        Estilos: {
          label: 'Estilos',
          type: 'items',
          items: {
            instance: {
              label: 'Instância',
              type: 'items',
              items: {
                fontSize: {
                  ref: 'props.styles.instance.fontSize',
                  label: 'Fonte (Objeto)',
                  type: 'string',
                  defaultValue: '12px'
                },
                color: {
                  ref: 'props.styles.instance.color',
                  label: 'Cor do texto (Objeto)',
                  type: 'string',
                  defaultValue: 'rgba(0,0,0,1)'
                },
                background: {
                  ref: 'props.styles.instance.background',
                  label: 'Fundo (Objeto)',
                  type: 'string',
                  defaultValue: 'rgba(255,255,255,1)'
                }
              }
            },
            container: {
              label: 'Caixa',
              type: 'items',
              items: {
                fontSize: {
                  ref: 'props.styles.container.fontSize',
                  label: 'Fonte (Caixa)',
                  type: 'string',
                  defaultValue: '13px'
                },
                color: {
                  ref: 'props.styles.container.color',
                  label: 'Cor do texto (Caixa)',
                  type: 'string',
                  defaultValue: 'rgba(0,0,0,1)'
                },
                background: {
                  ref: 'props.styles.container.background',
                  label: 'Fundo (Caixa)',
                  type: 'string',
                  defaultValue: 'rgba(255,255,255,1)'
                }
              }
            },
            header: {
              label: 'Título',
              type: 'items',
              items: {
                fontSize: {
                  ref: 'props.styles.header.fontSize',
                  label: 'Fonte (Título)',
                  type: 'string',
                  defaultValue: '14px'
                },
                color: {
                  ref: 'props.styles.header.color',
                  label: 'Cor do texto (Título)',
                  type: 'string',
                  defaultValue: 'rgba(51,51,51,1)'
                },
                background: {
                  ref: 'props.styles.header.background',
                  label: 'Fundo (Título)',
                  type: 'string',
                  defaultValue: 'rgba(238,238,238,1)'
                }
              }
            }
          }
        }      }
    },
    paint: function ($element, layout) {
      // Atualiza configurações
      var cfg = window.sheetSwitcherConfig;
      cfg.fullscreen = layout.props.fullscreen !== false;  // default true
      cfg.autoStartAlways = layout.props.autoStartAlways !== false; // default true
      
      // Processa link único
      cfg.link = (layout.props.link || '').trim();
      
      // Atualiza estilos
      var s = layout.props.styles || {}, st = cfg.styles;
      if (s.instance) {
        st.instance.fontSize = s.instance.fontSize || st.instance.fontSize;
        st.instance.color    = s.instance.color    || st.instance.color;
        st.instance.background = s.instance.background || st.instance.background;
      }
      if (s.container) {
        st.container.fontSize = s.container.fontSize || st.container.fontSize;
        st.container.color    = s.container.color    || st.container.color;
        st.container.background = s.container.background || st.container.background;
      }
      if (s.header) {
        st.header.fontSize = s.header.fontSize || st.header.fontSize;
        st.header.color    = s.header.color    || st.header.color;
        st.header.background = s.header.background || st.header.background;
      }

      // Atualiza tempo se em nova folha com instância
      var currentId = qlik.navigation.getCurrentSheetId();
      var tempoInst = layout.props.tempo;
      if (currentId && cfg.lastUpdatedSheetId !== currentId) {
        cfg.tempo = tempoInst;
        cfg.remainingTime = tempoInst;
        cfg.lastUpdatedSheetId = currentId;
        if (cfg.isPlaying) {
          clearInterval(cfg.timer);
          startTimer();
        }
      }      // Renderiza global
      renderGlobal();      // Inicializa controle de visibilidade (apenas uma vez)
      if (!cfg.visibilitySetup) {
        setupTabVisibilityControl();
        setupFullscreenListeners(); // Adiciona listeners de fullscreen
        cfg.visibilitySetup = true;
      }

      // Verifica auto-start para links
      checkAutoStart();      // Exibe mensagem local
      var modoNavegacao = cfg.link ? 
        'navegação para link configurado: ' + cfg.link : 
        'navegação entre pastas locais';
        // Informações sobre abas (apenas se há link)
      var infoAbas = '';
      if (cfg.link) {
        infoAbas = '<br>Modo: navegação na mesma aba para o link configurado';
      }
      
      // Informações sobre contexto (iframe, fullscreen)
      var infoContexto = '';
      if (cfg.fullscreen) {
        infoContexto = '<br><small style="color:blue;">ℹ️ Usando simulação F11 para fullscreen</small>';
        if (isInIframe()) {
          infoContexto += '<br><small style="color:blue;">ℹ️ Executando em iframe</small>';
        }
      }
      
      var localHtml = '<div style="padding:10px; ' +
        'font-size:' + st.instance.fontSize + '; ' +
        'color:' + st.instance.color + '; ' +
        'background:' + st.instance.background + ';">' +
        'Tempo configurado: ' + cfg.tempo + ' segundos.<br>' +
        'Modo: ' + modoNavegacao + '.' + infoAbas + infoContexto +
        '</div>';
      $element.html(localHtml);
      return qlik.Promise.resolve();
    }
  };
});

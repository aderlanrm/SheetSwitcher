define([
  "qlik",
  "jquery",
  "text!./style.css"
], function (qlik, $, cssContent) {

  // Injeta CSS personalizado
  $("<style>").html(cssContent).appendTo("head");

  // Versão da extensão (deve ser atualizada quando a versão no qext for alterada)
  var EXTENSION_VERSION = "1.0.0";

  // Configuração global
  if (!window.sheetSwitcherConfig) {
    window.sheetSwitcherConfig = {
      isPlaying: false,
      tempo: 10,
      fullscreen: true,
      remainingTime: 10,
      timer: null,
      lastUpdatedSheetId: null,
      minimized: false,
      styles: {
        instance: { fontSize: '12px', color: 'rgba(0,0,0,1)', background: 'rgba(255,255,255,1)' },
        container: { fontSize: '13px', color: 'rgba(0,0,0,1)', background: 'rgba(255,255,255,1)' },
        header:    { fontSize: '14px', color: 'rgba(51,51,51,1)', background: 'rgba(238,238,238,1)' }
      }
    };
  }

  // Formata segundos para MM:SS
  function formatTime(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  // Inicia/Reinicia timer global
  function startTimer() {
    if (window.sheetSwitcherConfig.timer) {
      clearInterval(window.sheetSwitcherConfig.timer);
    }
    window.sheetSwitcherConfig.timer = setInterval(function () {
      var cfg = window.sheetSwitcherConfig;
      cfg.remainingTime--;
      if (cfg.remainingTime <= 0) {
        qlik.navigation.nextSheet();
        cfg.remainingTime = cfg.tempo;
      }
      renderGlobal();
    }, 1000);
  }

  // Alterna fullscreen via Fullscreen API
  function toggleFullscreen(enable) {
    if (enable) {
      var elem = document.documentElement;
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
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
        + '<div id="sheetSwitcherGlobalContent" style="padding:5px;"></div>'
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
    );

    // Título sempre com a mesma cor
    $('#sheetSwitcherTitle')
      .text(cfg.minimized ? formatTime(cfg.remainingTime) : 'Timer v' + EXTENSION_VERSION)
      .css({
        'color': cfg.styles.header.color,
        'font-size': cfg.styles.header.fontSize,
        'font-weight': 'bold'
      });

    // Conteúdo interno
    var btnText = cfg.isPlaying ? 'Parar' : 'Iniciar';
    var contentHtml = ''
      + '<button id="sheetSwitcherGlobalBtn" class="lui-button" ' 
      + 'style="font-size:' + cfg.styles.container.fontSize + '; '
      + 'color:' + cfg.styles.container.color + '; '
      + 'background:' + cfg.styles.container.background + ';">'
      + btnText + '</button>'
      + '<span style="margin:0 10px;">' 
      + formatTime(cfg.remainingTime) + ' para próxima página</span>';
    $('#sheetSwitcherGlobalContent').html(contentHtml);

    // Modifica o evento de clique do botão
    $('#sheetSwitcherGlobalBtn').off('click').on('click', function () {
      if (cfg.fullscreen) { toggleFullscreen(!cfg.isPlaying); }
      if (!cfg.isPlaying) {
        cfg.isPlaying = true;
        cfg.remainingTime = cfg.tempo;
        startTimer();
        // Minimiza ao iniciar
        cfg.minimized = true;
        $('#sheetSwitcherGlobalContent').hide();
      } else {
        cfg.isPlaying = false;
        clearInterval(cfg.timer);
        cfg.timer = null;
        if (cfg.fullscreen) { toggleFullscreen(false); }
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
        }
      }
    },
    paint: function ($element, layout) {
      // Atualiza fullscreen e estilos
      var cfg = window.sheetSwitcherConfig;
      cfg.fullscreen = layout.props.fullscreen !== false;  // default true
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
      }

      // Renderiza global
      renderGlobal();

      // Exibe mensagem local
      var localHtml = '<div style="padding:10px; ' +
        'font-size:' + st.instance.fontSize + '; ' +
        'color:' + st.instance.color + '; ' +
        'background:' + st.instance.background + ';">' +
        'Tempo configurado nesta pasta: ' + cfg.tempo + ' segundos.' +
        '</div>';
      $element.html(localHtml);
      return qlik.Promise.resolve();
    }
  };
});

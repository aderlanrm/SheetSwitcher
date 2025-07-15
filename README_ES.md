# Extensión SheetSwitcher para Qlik Sense

**Versión:** 1.4.7  
**Autor:** Aderlan | bideaz.in  
**Licencia:** MIT

*Leia isto em [Português](readme.md) | Read this in [English](README_EN.md)*

## ☕ Apoya este Proyecto

Si encontraste útil este proyecto y te ayudó a crear dashboards más dinámicos en Qlik Sense, ¡considera invitarme a un café!

### 💳 PayPal

Puedes hacer una donación vía PayPal usando el siguiente correo:

```
pix@bideaz.in
```

### 💰 PIX

También puedes usar PIX (sistema de pago brasileño) para apoyar el desarrollo continuo de esta y otras extensiones para Qlik Sense:

```
clave: pix@bideaz.in
```

Para acceder al código QR de PIX, visita: [https://www.bideaz.com.br/pix](https://www.bideaz.com.br/pix)

¡Cualquier cantidad es bienvenida y me ayuda a mantener proyectos de código abierto como este!

<p align="center">
🙏 ¡Tu contribución marca la diferencia! 🙏
</p>

## Visión General

La extensión **SheetSwitcher** permite cambiar automáticamente entre hojas en Qlik Sense o navegar a un enlace específico configurado, con funcionalidades de control de tiempo, simulación de pantalla completa F11 y personalización completa de la interfaz.

### 💯 Compatibilidad Universal

- ✅ **Funciona en cualquier navegador** compatible con Qlik Sense (Chrome, Firefox, Edge, Safari)
- ✅ **Sin necesidad de extensiones de navegador** ni complementos adicionales
- ✅ **Compatible con todas las versiones de Qlik Sense:**
  - Qlik Sense Cloud
  - Qlik Sense Enterprise
  - Qlik Sense Desktop
- ✅ **Plug & Play:** instala y usa inmediatamente, sin configuraciones complejas

## Características

- ⏱️ **Temporizador Global:**
  - Intervalo configurable por hoja
  - Cuenta regresiva en formato MM:SS
  - Temporizador continuo que no se pausa cuando la pestaña pierde el foco
  - Inicia minimizado por defecto

- 🎮 **Controles:**
  - Botón Iniciar/Detener con feedback visual
  - Minimización automática al iniciar
  - Clic en el título para minimizar/maximizar
  - Arrastrar y soltar en cualquier posición de la pantalla

- 🖥️ **Interfaz:**
  - Caja de control global siempre visible
  - Posición inicial centrada en la parte superior
  - Temporizador minimalista cuando está minimizado
  - Interfaz discreta que inicia minimizada
  - Cursor pointer para mejor usabilidad
  - 🌍 **Soporte Multiidioma:** Interfaz automática en Portugués, Inglés o Español basada en la configuración de idioma de Qlik Sense

- 🔄 **Navegación:**
  - Cambio automático de hojas (modo hojas)
  - Navegación a enlace único en la misma pestaña (modo enlace)
  - Bucle continuo al llegar al final
  - Modo pantalla completa vía simulación F11
  - Temporizador sincronizado entre contextos

## Estructura de Archivos

```
SheetSwitcher/
├── SheetSwitcher.qext      # Metadatos de la extensión
├── SheetSwitcher.js        # Lógica principal
├── style.css               # Estilos personalizados
└── README.md               # Documentación
```

## Propiedades Configurables

### Configuración
- **Intervalo (segundos):** tiempo entre cambios de hoja o recarga de enlace
- **Pantalla completa (F11):** simula la tecla F11 para activar/desactivar modo pantalla completa
- **Iniciar automáticamente siempre:** inicia automáticamente al cargar la página
- **Clicar botones animator:** clica automáticamente en botones animator al iniciar timer

### Navegación por Enlace
- **URL del Enlace:** URL única para navegación automática en la misma pestaña

### Estilos
#### Instancia
- Tamaño de fuente
- Color de texto
- Color de fondo

#### Caja
- Tamaño de fuente
- Color de texto
- Color de fondo

#### Título
- Tamaño de fuente
- Color de texto
- Color de fondo

## Uso

1. **Instalación:**
   - Copia la carpeta al directorio de extensiones de Qlik Sense

2. **Configuración:**
   - Añade la extensión a cualquier hoja
   - Configura el intervalo y estilos deseados
   - Las configuraciones se mantendrán entre hojas

3. **Operación:**
   - Haz clic en **Iniciar** para comenzar (minimiza automáticamente)
   - Arrastra la caja a cualquier posición
   - Haz clic en el título para minimizar/maximizar
   - Haz clic en **Detener** para interrumpir

## Instalación desde GitHub

```bash
# Clona el repositorio
git clone https://github.com/aderlanrm/SheetSwitcher.git

# Ve al directorio de extensiones de Qlik Sense
# Normalmente en C:\Users\[tu-usuario]\Documents\Qlik\Sense\Extensions

# Copia la carpeta SheetSwitcher al directorio de extensiones
```

## Requisitos

- Qlik Sense ≥ 3.0.x
- jQuery (incluido en Qlik Sense)

## Contribución

¡Las contribuciones son bienvenidas! Siéntete libre de abrir issues o enviar pull requests.

## Historial de Versiones

### Versión 1.4.7
- 🌍 **Soporte Multiidioma**: Interfaz automática en Portugués, Inglés o Español
- 🔧 **Detección de Idioma**: Detecta automáticamente el idioma configurado en Qlik Sense
- 🌐 **Traducción Completa**: Todas las cadenas de la interfaz traducidas en tres idiomas
- 📋 **API Qlik Sense**: Utiliza `getLocaleInfo()` para detectar configuración de locale

### Versión 1.4.6
- 🔧 **Configuración Predeterminada**: "Mostrar Timer" ahora viene habilitado por defecto
- 🔧 **UX Mejorada**: Timer visual aparece por defecto para mejor usabilidad
- 📋 **Interfaz**: Los usuarios pueden deshabilitar el timer si desean una interfaz más limpia

### Versión 1.4.5
- 🔧 **Configuración Predeterminada**: "Iniciar Automáticamente" ahora viene desmarcado por defecto
- 🔧 **Interfaz**: "Mostrar Menú Flotante" ahora viene deshabilitado por defecto
- 🔧 **UX Mejorada**: Extensión más discreta por defecto, requiriendo activación manual
- 📋 **Información Visual**: Indicador de estado del menú flotante en la interfaz local

## Licencia

Licencia MIT - Úsalo libremente en tus proyectos

### Licencia MIT Explicada de Forma Simple

La licencia MIT es como una regla legal para compartir este programa. Imagina que creaste un juguete increíble y decidiste compartirlo con tus amigos. La licencia MIT es como decir:

- ✅ Puedes usar mi juguete como quieras
- ✅ Puedes modificar mi juguete (añadir más piezas o cambiar los colores)
- ✅ Puedes compartir el juguete con otros amigos
- ✅ Puedes incluso usar el juguete para crear un proyecto en la feria de ciencias de tu escuela

La única condición es que mantengas la pequeña tarjeta que dice quién creó el juguete originalmente. Esto es para que todos sepan de dónde vino el juguete, ¡incluso después de que muchas personas hayan jugado con él!

Y lo mejor de todo: si algo se rompe mientras estás jugando, ¡no es culpa de quien creó el juguete! Cada uno es responsable de cómo lo usa.
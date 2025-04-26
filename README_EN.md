# SheetSwitcher Qlik Sense Extension

**Version:** 1.0.0  
**Author:** Aderlan | bideaz.in  
**License:** MIT

*Leia isto em [Português](readme.md)*

## ☕ Support this Project

If you found this project useful and it helped you create more dynamic dashboards in Qlik Sense, consider buying me a coffee!

### 💳 PayPal

You can make a donation via PayPal using the following email:

```
pix@bideaz.in
```

### 💰 PIX

You can also use PIX (Brazilian payment system) to support the continuous development of this and other Qlik Sense extensions:

```
key: pix@bideaz.in
```

To access the PIX QR code, visit: [https://www.bideaz.com.br/pix](https://www.bideaz.com.br/pix)

Any amount is welcome and helps me maintain open source projects like this one!

<p align="center">
🙏 Your contribution makes a difference! 🙏
</p>

## Overview

The **SheetSwitcher** extension allows you to automatically switch between sheets in Qlik Sense, with time control features, visual effects, full screen mode, and complete interface customization.

### 💯 Universal Compatibility

- ✅ **Works in any browser** compatible with Qlik Sense (Chrome, Firefox, Edge, Safari)
- ✅ **No need for browser extensions** or additional add-ons
- ✅ **Compatible with all Qlik Sense versions:**
  - Qlik Sense Cloud
  - Qlik Sense Enterprise
  - Qlik Sense Desktop
- ✅ **Plug & Play:** install and use immediately, without complex configurations

## Features

- ⏱️ **Global Timer:**
  - Configurable interval per sheet
  - Countdown timer in MM:SS format
  - Maintains last settings between sheets
  - Settings persist even without an instance

- 🎮 **Controls:**
  - Start/Stop button with visual feedback
  - Automatic minimization when started
  - Click on title to minimize/maximize
  - Drag and drop anywhere on the screen

- 🖥️ **Interface:**
  - Global control box always visible
  - Initial position centered at the top
  - Minimalist timer when minimized
  - Hover effect on title
  - Smooth rounding and shadows
  - Pointer cursor for better usability

- 🎨 **Customization:**
  - Fully configurable colors and fonts
  - Separate styles for:
    - Object instance
    - Control box
    - Title/Timer
  - Custom style persistence

- 🔄 **Navigation:**
  - Automatic sheet switching
  - Continuous loop when reaching the end
  - Optional full screen mode (F11)
  - Timer synchronized between sheets

## File Structure

```
SheetSwitcher/
├── SheetSwitcher.qext      # Extension metadata
├── SheetSwitcher.js        # Main logic
├── style.css               # Custom styles
└── README.md               # Documentation
```

## Configurable Properties

### Settings
- **Interval (seconds):** time between sheet changes
- **Full screen (F11):** enable/disable automatic full screen mode

### Styles
#### Instance
- Font size
- Text color
- Background color

#### Box
- Font size
- Text color
- Background color

#### Title
- Font size
- Text color
- Background color

## Usage

1. **Installation:**
   - Copy the folder to the Qlik Sense extensions directory

2. **Configuration:**
   - Add the extension to any sheet
   - Configure desired interval and styles
   - Settings will be maintained between sheets

3. **Operation:**
   - Click **Start** to begin (automatically minimizes)
   - Drag the box to any position
   - Click on the title to minimize/maximize
   - Click **Stop** to interrupt

## GitHub Installation

```bash
# Clone the repository
git clone https://github.com/aderlanrm/SheetSwitcher.git

# Go to the Qlik Sense extensions directory
# Usually at C:\Users\[your-username]\Documents\Qlik\Sense\Extensions

# Copy the SheetSwitcher folder to the extensions directory
```

## Requirements

- Qlik Sense ≥ 3.0.x
- jQuery (included in Qlik Sense)

## Contribution

Contributions are welcome! Feel free to open issues or send pull requests.

## License

MIT License - Use freely in your projects

### MIT License Explained Simply

The MIT license is like a legal rule for sharing this program. Imagine you created an amazing toy and decided to share it with your friends. The MIT license is like saying:

- ✅ You can use my toy however you want
- ✅ You can modify my toy (add more pieces or change the colors)
- ✅ You can share the toy with other friends
- ✅ You can even use the toy to create a project for your school science fair

The only condition is that you keep the small card that says who originally created the toy. This is so everyone knows where the toy came from, even after many people have played with it!

And best of all: if something breaks while you're playing with it, it's not the creator's fault! Everyone is responsible for how they use it.
# ⚡ vt-smite-it

A League of Legends inspired Smite timing game built with Vanilla JavaScript and component-based architecture.

## 🎮 Game Overview

Test your precision and timing skills in this LoL-inspired mini-game! Secure epic objectives like Baron Nashor and Dragons by timing your Smite perfectly. Compete against AI junglers with different skill levels and prove you have what it takes to be a pro jungler.

### Features

- **3 Epic Objectives**: Baron Nashor, Red Dragon, Green Dragon
- **3 Game Phases**: Early (Lv 4-10), Mid (Lv 11-15), Late (Lv 16-18)
- **3 Difficulty Levels**: Iron, Platinum, Master
- **Authentic LoL Experience**: Real smite damage values and health scaling
- **Keyboard Controls**: Smite with `D`, `Space`, or `Enter` keys
- **Mobile Friendly**: Responsive design for all devices
- **Share Results**: Share your victories on social media

## 🏗️ Architecture

Built with modern component-based architecture using Vanilla JavaScript:

```
public/
├── index.html              # Clean semantic HTML structure
├── css/
│   ├── style.css          # Main game styles
│   └── hidden.css         # Utility classes
└── js/
    ├── main.js            # Application entry point
    ├── app.js             # Main app controller
    ├── base/
    │   ├── base-listener.js    # Event system base class
    │   └── base-component.js   # Component base class
    ├── components/
    │   ├── setup-component.js  # Game setup UI
    │   ├── game-component.js   # Main game logic
    │   └── modal-component.js  # Result modal
    └── utils/
        └── helpers.js          # DOM utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (for development server)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vt-smite-it
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## 🎯 How to Play

1. **Choose Your Settings**
   - Select difficulty (Iron/Platinum/Master)
   - Pick your objective (Baron/Red Dragon/Green Dragon)
   - Choose game phase (Early/Mid/Late)

2. **Time Your Smite**
   - Watch the health bar decrease as teams fight
   - Click the Smite button or press `D`/`Space`/`Enter`
   - Secure the objective before the enemy jungler!

3. **Master the Timing**
   - **Too Early**: Enemy jungler steals it
   - **Too Late**: Teams kill it before you can smite
   - **Perfect**: You secure the objective! 🏆

## 🎮 Game Mechanics

### Smite Damage
- **Early Game**: 600 true damage
- **Mid Game**: 900 true damage  
- **Late Game**: 1200 true damage

### Objective Health
| Objective | Early | Mid | Late |
|-----------|-------|-----|------|
| Baron Nashor | 8,000 | 12,000 | 18,000 |
| Red Dragon | 6,000 | 9,000 | 13,000 |
| Green Dragon | 6,000 | 9,000 | 13,000 |

### Difficulty Levels
- **Iron**: 30% enemy accuracy, 2s reaction time
- **Platinum**: 70% enemy accuracy, 1s reaction time  
- **Master**: 90% enemy accuracy, 0.5s reaction time

## 🔧 Technical Details

### Component System
Each UI component extends `BaseComponent` and follows these principles:
- **Encapsulation**: Components manage their own DOM and state
- **Event-driven**: Communication through custom events
- **Reusable**: Components can be easily moved or modified
- **Testable**: Isolated logic for easy unit testing

### Key Components
- **SetupComponent**: Handles game configuration
- **GameComponent**: Core game logic and UI
- **ModalComponent**: Results display and sharing

### Event Flow
```
SetupComponent → 'start-game' → App → GameComponent
GameComponent → 'game-ended' → App → ModalComponent  
ModalComponent → 'restart-game'/'play-again' → App
```

## 🎨 Styling

The game uses a League of Legends inspired color scheme:
- **Primary Gold**: `#c8aa6e` (LoL gold accent)
- **Background Dark**: `#0a1428` to `#1e2328` (Rift blue)
- **Text Light**: `#cdbe91` (Readable gold)
- **Accent Brown**: `#463714` (Border accent)

### Health Bar Colors
- **Baron**: Purple gradient (`#8b4a9c` to `#a855c7`)
- **Red Dragon**: Red gradient (`#dc2626` to `#ef4444`)
- **Green Dragon**: Green gradient (`#16a34a` to `#22c55e`)

## 📱 Mobile Support

- Touch-friendly interface
- Responsive design for all screen sizes
- Native share API integration
- Optimized for portrait orientation

## 🔧 Development

### Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Adding New Components
1. Create component file in `js/components/`
2. Extend `BaseComponent`
3. Implement `createDOM()` method
4. Add event listeners and emit events
5. Register in `app.js`

### Code Style
- ES6+ modules
- Component-based architecture
- Event-driven communication
- Semantic HTML
- BEM-style CSS classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Roadmap

- [ ] Sound effects and music
- [ ] Leaderboard system
- [ ] Additional objectives (Elder Dragon, Herald)
- [ ] Multiplayer mode
- [ ] Statistics tracking
- [ ] Achievement system
- [ ] Custom themes

## 🙏 Acknowledgments

- Inspired by League of Legends by Riot Games
- Built with modern web technologies
- Community feedback and suggestions

---

**Ready to test your smite skills?** 🎮⚡

*Can you outplay the enemy jungler and secure the objective?*
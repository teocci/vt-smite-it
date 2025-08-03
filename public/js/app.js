/**
 * Main App Controller
 */
import SetupComponent from './components/setup-component.js'
import GameComponent from './components/game-component.js'
import ModalComponent from './components/modal-component.js'

export default class App {
    constructor() {
        this.init()
    }

    init() {
        this.setupComponents()
        this.bindEvents()
        this.render()
    }

    setupComponents() {
        const main = document.querySelector('main')

        this.setupComponent = new SetupComponent(main)
        this.gameComponent = new GameComponent(main)
        this.modalComponent = new ModalComponent(main)
    }

    bindEvents() {
        // Setup component events
        this.setupComponent.on('start-game', (settings) => {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            this.startGame(settings)
        })

        // Game component events
        this.gameComponent.on('game-ended', (data) => {
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbb')
            this.showModal(data)
        })

        // Modal component events
        this.modalComponent.on('restart-game', () => {
            console.log('ccccccccccccccccccccccccccccccccc')
            this.restartGame()
        })

        this.modalComponent.on('play-again', () => {
            this.playAgain()
        })
    }

    render() {
        // Add components to main
        // this.setupComponent.holderWithDomUpdate = main
        // this.gameComponent.holderWithDomUpdate = main
        // this.modalComponent.holderWithDomUpdate = main
    }

    startGame(settings) {
        console.log({settings})
        this.setupComponent.hide()
        this.gameComponent.startGame(settings)
    }

    showModal(data) {
        this.modalComponent.show(data)
    }

    restartGame() {
        this.gameComponent.restart()
    }

    playAgain() {
        this.gameComponent.reset()
        this.setupComponent.show()
    }
}
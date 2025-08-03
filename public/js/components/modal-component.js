/**
 * Modal Component
 */
import BaseComponent from '../base/base-component.js'
import {createButton, createDiv} from '../utils/helpers.js'

export default class ModalComponent extends BaseComponent {
    static TAG = 'modal-component'

    constructor($element) {
        super($element)

        this.createDOM()
        this.hide()
    }

    createDOM() {
        const modal = createDiv('modal')
        const modalContent = createDiv('modal-content')

        this.modalTitle = createDiv('modal-title', 'Game Over')
        this.modalMessage = createDiv('modal-message', 'SECURED! You got the objective!')

        const modalButtons = createDiv('modal-buttons')

        this.restartBtn = createButton('modal-btn primary', '', () => {
            this.emit('restart-game')
            this.hide()
        })
        this.restartBtn.innerHTML = '🔄 Restart<br><small style="opacity: 0.8;">Same settings</small>'

        this.playAgainBtn = createButton('modal-btn', '', () => {
            this.emit('play-again')
            this.hide()
        })
        this.playAgainBtn.innerHTML = '🎮 Play Again<br><small style="opacity: 0.8;">Change settings</small>'

        this.shareBtn = createButton('modal-btn', '', () => {
            this.shareResult()
        })
        this.shareBtn.innerHTML = '📱 Share<br><small style="opacity: 0.8;">Social media</small>'

        modalButtons.appendChild(this.restartBtn)
        modalButtons.appendChild(this.playAgainBtn)
        modalButtons.appendChild(this.shareBtn)

        modalContent.appendChild(this.modalTitle)
        modalContent.appendChild(this.modalMessage)
        modalContent.appendChild(modalButtons)

        modal.appendChild(modalContent)
        this.domWithHolderUpdate = modal
    }

    show({message, isWin, gameState}) {
        this.currentGameState = gameState
        this.modalMessage.textContent = message
        this.modalMessage.className = 'modal-message ' + (isWin ? 'win' : 'lose')
        super.show()
    }

    hide() {
        super.hide()
    }

    shareResult() {
        if (!this.currentGameState) return

        const message = this.modalMessage.textContent
        const difficulty = this.currentGameState.difficulty.charAt(0).toUpperCase() + this.currentGameState.difficulty.slice(1)
        const objectiveNames = {
            'baron': 'Baron Nashor',
            'red-dragon': 'Red Dragon',
            'green-dragon': 'Green Dragon',
        }
        const objective = objectiveNames[this.currentGameState.objective] || 'Unknown'

        const shareText = `🎮 Smite It - LoL Objective Game\n\n${message}\n\nObjective: ${objective}\nDifficulty: ${difficulty}\nSmite Damage: ${this.currentGameState.playerSmiteDamage}\n\nCan you time your smite better? 🔥`

        if (navigator.share) {
            navigator.share({
                title: 'Smite It - LoL Game Result',
                text: shareText,
                url: window.location.href,
            })
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Result copied to clipboard!')
            }).catch(() => {
                // Final fallback - show in alert
                alert(shareText)
            })
        }
    }
}
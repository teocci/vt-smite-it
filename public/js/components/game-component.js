/**
 * Game Component
 */
import BaseComponent from '../base/base-component.js'
import {createButton, createDiv} from '../utils/helpers.js'

const TRIGGER_KEYS = new Set(['KeyD', 'Space', 'Enter'])

export default class GameComponent extends BaseComponent {
    static TAG = 'game-component'

    $smPlayer
    $smEnemy
    $level
    $difficulty

    constructor($element) {
        super($element)

        this.gameState = this.initGameState()

        this.createDOM()
        this.hide() // Hidden by default
    }

    initGameState() {
        window.onkeydown = event => {
            this.keyHandler(event)
        }
        return {
            currentHealth: 0,
            maxHealth: 0,
            difficulty: 'iron',
            objective: 'baron',
            gamePhase: 'early',
            smPlayer: 0,
            smEnemy: 0,
            gameLevel: 7,
            isGameActive: false,
            damageInterval: null,
        }
    }

    createDOM() {
        const $wrapper = createDiv('game-area game-part')

        // Context info
        const $damageInfo = createDiv('damage-info')
        $damageInfo.append(this.createInfoRow('Your Smite:', '600', '$smPlayer', 'sm-player'))
        $damageInfo.append(this.createInfoRow('Enemy Smite:', '600', '$smEnemy', 'sm-enemy'))
        $damageInfo.append(this.createInfoRow('Game Level:', '7', '$level', 'game-level'))
        $damageInfo.append(this.createInfoRow('Difficulty:', 'Iron', '$difficulty', 'game-difficulty'))

        // Objective info
        const $objectiveInfo = createDiv('objective-info')
        this.$objective = createElement('div', 'objective-name', 'Baron Nashor')

        const $healthContainer = createDiv('health-container')
        this.$health = createDiv('health-number', '8000')

        const $healthBarBg = createDiv('health-bar-bg')
        this.$healthBar = createDiv('health-bar baron-health')

        const $healthDivisions = createDiv('health-divisions')
        for (let i = 0; i < 5; i++) {
            $healthDivisions.append(createDiv('division'))
        }

        $healthBarBg.append(this.$healthBar, $healthDivisions)
        $healthContainer.append(this.$health, $healthBarBg)
        $objectiveInfo.append(this.$objective, $healthContainer)

        // Smite container
        const $smiteContainer = createDiv('smite-container')
        this.$smiteButton = createButton('smite-button', '⚡', () => {
            this.playerSmite()
        })
        $smiteContainer.append(this.$smiteButton)

        $wrapper.append($damageInfo, $objectiveInfo, $smiteContainer)

        this.domWithHolderUpdate = $wrapper
    }

    createInfoRow(label, value, attribute, id) {
        const row = createDiv('info-row')

        const $value = createDiv('i-value', value)
        $value.id = id

        this[attribute] = $value

        row.append(createDiv('i-label', label), $value)

        return row
    }

    startGame(settings) {
        this.gameState.difficulty = settings.difficulty
        this.gameState.objective = settings.objective
        this.gameState.gamePhase = settings.gamePhase

        this.setupGameData()
        this.updateUI()
        this.show()

        this.gameState.isGameActive = true
        this.startDamageSimulation()
        this.scheduleEnemySmite()
    }

    setupGameData() {
        const objectiveData = {
            'baron': {
                name: 'Baron Nashor',
                healthClass: 'baron-health',
                baseHealth: {early: 8000, mid: 12000, late: 18000},
            },
            'red-dragon': {
                name: 'Red Dragon',
                healthClass: 'red-dragon-health',
                baseHealth: {early: 6000, mid: 9000, late: 13000},
            },
            'green-dragon': {
                name: 'Green Dragon',
                healthClass: 'green-dragon-health',
                baseHealth: {early: 6000, mid: 9000, late: 13000},
            },
        }

        const smiteData = {
            early: {damage: 600, icon: '⚡'},
            mid: {damage: 900, icon: '⚡⚡'},
            late: {damage: 1200, icon: '⚡⚡⚡'},
        }

        // Set game level
        const levelRanges = {
            early: [4, 10],
            mid: [11, 15],
            late: [16, 18],
        }
        const [min, max] = levelRanges[this.gameState.gamePhase]
        this.gameState.gameLevel = Math.floor(Math.random() * (max - min + 1)) + min

        // Set health and damage
        const objData = objectiveData[this.gameState.objective]
        this.gameState.maxHealth = objData.baseHealth[this.gameState.gamePhase]
        this.gameState.currentHealth = this.gameState.maxHealth

        const smiteInfo = smiteData[this.gameState.gamePhase]
        this.gameState.smPlayer = smiteInfo.damage
        this.gameState.smEnemy = smiteInfo.damage

        this.objectiveData = objData
        this.smiteInfo = smiteInfo
    }

    updateUI() {
        this.$objective.textContent = this.objectiveData.name
        this.$smPlayer.textContent = this.gameState.smPlayer
        this.$smEnemy.textContent = this.gameState.smEnemy
        this.$level.textContent = this.gameState.gameLevel
        this.$difficulty.textContent = this.gameState.difficulty.charAt(0).toUpperCase() + this.gameState.difficulty.slice(1)
        this.$smiteButton.textContent = this.smiteInfo.icon

        this.updateHealthBar()
    }

    updateHealthBar() {
        const healthPercent = (this.gameState.currentHealth / this.gameState.maxHealth) * 100
        this.$healthBar.style.width = healthPercent + '%'
        this.$healthBar.className = 'health-bar ' + this.objectiveData.healthClass
        this.$health.textContent = this.gameState.currentHealth
    }

    startDamageSimulation() {
        this.gameState.damageInterval = setInterval(() => {
            if (!this.gameState.isGameActive) return

            const baseDamage = this.gameState.gamePhase === 'early' ? 150 :
                this.gameState.gamePhase === 'mid' ? 250 : 350
            const damage = baseDamage + Math.random() * 100

            this.gameState.currentHealth = Math.max(0, this.gameState.currentHealth - Math.floor(damage))
            this.updateHealthBar()

            if (this.gameState.currentHealth <= 0) {
                this.endGame('Enemy team killed the objective!', false)
            }
        }, 200)
    }

    scheduleEnemySmite() {
        const difficultySettings = {
            iron: {accuracy: 0.3, reactionTime: 2000},
            plat: {accuracy: 0.7, reactionTime: 1000},
            master: {accuracy: 0.9, reactionTime: 500},
        }

        const settings = difficultySettings[this.gameState.difficulty]

        const checkForEnemySmite = () => {
            if (!this.gameState.isGameActive) return

            const smiteThreshold = this.gameState.smEnemy + 200

            if (this.gameState.currentHealth <= smiteThreshold) {
                if (Math.random() < settings.accuracy) {
                    setTimeout(() => {
                        if (this.gameState.isGameActive && this.gameState.currentHealth > 0) {
                            this.enemySmite()
                        }
                    }, settings.reactionTime)
                }
            }

            setTimeout(checkForEnemySmite, 100)
        }

        checkForEnemySmite()
    }

    keyHandler(e) {
        if (!this.gameState.isGameActive) return
        if (e.repeat) return

        const tag = e.target.tagName
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return

        if (TRIGGER_KEYS.has(e.code)) {
            // prevent default for Space to avoid page scroll, etc.
            if (e.code === 'Space') e.preventDefault()

            this.playerSmite()
        }
    }

    playerSmite() {
        if (!this.gameState.isGameActive) return

        const remainingHealth = this.gameState.currentHealth - this.gameState.smPlayer

        if (remainingHealth <= 0) {
            this.endGame('SECURED! You got the objective!', true)
        } else {
            this.endGame(`Too early! ${remainingHealth} HP remaining when you smited.`, false)
        }
    }

    enemySmite() {
        if (!this.gameState.isGameActive) return

        const remainingHealth = this.gameState.currentHealth - this.gameState.smEnemy

        if (remainingHealth <= 0) {
            this.endGame('Enemy jungler secured the objective!', false)
        }
    }

    endGame(message, isWin) {
        this.gameState.isGameActive = false
        clearInterval(this.gameState.damageInterval)

        this.$smiteButton.disabled = true
        this.emit('game-ended', {message, isWin, gameState: this.gameState})
    }

    restart() {
        this.$smiteButton.disabled = false
        this.gameState.currentHealth = this.gameState.maxHealth
        this.updateUI()

        this.gameState.isGameActive = true
        this.startDamageSimulation()
        this.scheduleEnemySmite()
    }

    reset() {
        this.gameState.isGameActive = false
        clearInterval(this.gameState.damageInterval)
        this.$smiteButton.disabled = false
        this.hide()
    }
}

function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag)
    if (className) element.className = className
    if (content) element.innerHTML = content
    return element
}
/**
 * Game Setup Component
 */
import BaseComponent from '../base/base-component.js'
import {createButton, createDiv, createLabel, createSelect} from '../utils/helpers.js'

export default class SetupComponent extends BaseComponent {
    static TAG = 'setup-component'

    constructor($element) {
        super($element)

        this.createDOM()
    }

    createDOM() {
        // Header
        const $header = document.querySelector('header')
        const $title = createElement('h1', 'game-title', '⚡ SMITE IT ⚡')
        $header.append($title)

        const $wrapper = createDiv('game-setup game-part')

        // Difficulty row
        const $difficulty = createDiv('setup-row')
        $difficulty.append(createLabel('s-difficulty', 'Difficulty:'))
        this.difficultySelect = createSelect('', 's-difficulty', [
            {value: 'iron', text: 'Iron'},
            {value: 'plat', text: 'Platinum'},
            {value: 'master', text: 'Master'},
        ])
        $difficulty.append(this.difficultySelect)

        // Objective row
        const $objective = createDiv('setup-row')
        $objective.append(createLabel('s-objective', 'Objective:'))
        this.objectiveSelect = createSelect('', 's-objective', [
            {value: 'baron', text: 'Baron Nashor'},
            {value: 'red-dragon', text: 'Red Dragon'},
            {value: 'green-dragon', text: 'Green Dragon'},
        ])
        $objective.append(this.objectiveSelect)

        // Game phase row
        const $phase = createDiv('setup-row')
        $phase.append(createLabel('s-phase', 'Game Phase:'))
        this.phaseSelect = createSelect('', 's-phase', [
            {value: 'early', text: 'Early (Lv 4-10)'},
            {value: 'mid', text: 'Mid (Lv 11-15)'},
            {value: 'late', text: 'Late (Lv 16-18)'},
        ])
        $phase.append(this.phaseSelect)

        // Start button
        this.startButton = createButton(
            'start-btn',
            'START GAME',
            () => {
                this.emit('start-game', this.getSettings())
            },
        )

        $wrapper.append($difficulty,$objective,$phase)
        $wrapper.append(this.startButton)

        this.domWithHolderUpdate = $wrapper
    }

    getSettings() {
        return {
            difficulty: this.difficultySelect.value,
            objective: this.objectiveSelect.value,
            gamePhase: this.phaseSelect.value,
        }
    }
}

function createElement(tag, className = '', content = '') {
    const element = document.createElement(tag)
    if (className) element.className = className
    if (content) element.innerHTML = content
    return element
}
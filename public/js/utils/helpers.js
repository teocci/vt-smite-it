/**
 * Helper utility functions
 */

export function createElement(tag, className = '', content = '') {
    const $element = document.createElement(tag)
    if (className) $element.className = className
    if (content) $element.innerHTML = content
    return $element
}

export function createDiv(className = '', content = '') {
    return createElement('div', className, content)
}

export function createButton(className = '', content = '', onclick = null) {
    const $button = createElement('button', className, content)
    if (onclick) $button.onclick = onclick

    return $button
}

export function createLabel(className = '', id = '', label = '') {
    const $label = createElement('label', className, label)
    if (id) $label.htmlFor = id
    if (label) $label.textContent = label
    return $label
}

export function createSelect(className = '', id = '', options = []) {
    const $select = createElement('select', className)
    if (id) $select.id = id
    options.forEach(option => {
        const $opt = createElement('option', '', option.text)
        $opt.value = option.value
        $select.appendChild($opt)
    })
    return $select
}

export function createSpan(className = '', content = '') {
    return createElement('span', className, content)
}
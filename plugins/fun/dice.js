/**
 * @file plugins/fun/dice.js
 * @description Plugin untuk melempar dadu
 * @author DinoCode Team
 * @version 1.0.0
 */

const { randomInt } = require('../../src/lib/functions');

/**
 * Konfigurasi plugin dice
 * @type {import('../../src/lib/plugins').PluginConfig}
 */
const pluginConfig = {
    name: 'dice',
    alias: ['dadu', 'roll'],
    category: 'fun',
    description: 'Melempar dadu',
    usage: '.dice [jumlah_sisi]',
    example: '.dice 6',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    limit: 0,
    isEnabled: true
};

/**
 * Emoji dadu berdasarkan angka
 * @constant
 */
const DICE_EMOJIS = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅'
};

/**
 * Handler untuk command dice
 * @param {Object} m - Serialized message
 * @param {Object} context - Handler context
 * @returns {Promise<void>}
 */
async function handler(m) {
    const sides = parseInt(m.args[0]) || 6;
    
    if (sides < 2 || sides > 100) {
        await m.reply('❌ Jumlah sisi harus antara 2 - 100!');
        return;
    }
    
    const result = randomInt(1, sides);
    const diceEmoji = sides === 6 && DICE_EMOJIS[result] ? DICE_EMOJIS[result] : '🎲';
    
    let diceText = `${diceEmoji} *Lempar Dadu*\n\n`;
    diceText += `Dadu: ${sides} sisi\n`;
    diceText += `Hasil: *${result}*`;
    
    await m.reply(diceText);
}

module.exports = {
    config: pluginConfig,
    handler
};

/**
 * @file plugins/owner/listowner.js
 * @description Plugin untuk melihat daftar owner bot
 * @author DinoCode Team
 * @version 1.0.0
 */

const config = require('../../config');

/**
 * Konfigurasi plugin listowner
 * @type {import('../../src/lib/plugins').PluginConfig}
 */
const pluginConfig = {
    name: 'listowner',
    alias: ['ownerlist', 'owners'],
    category: 'owner',
    description: 'Melihat daftar owner bot',
    usage: '.listowner',
    example: '.listowner',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    limit: 0,
    isEnabled: true
};

/**
 * Handler untuk command listowner
 * @param {Object} m - Serialized message
 * @param {Object} context - Handler context
 * @returns {Promise<void>}
 */
async function handler(m, { config: botConfig }) {
    const ownerNumbers = botConfig.owner?.number || [];
    
    if (ownerNumbers.length === 0) {
        await m.reply('📋 Tidak ada owner yang terdaftar');
        return;
    }
    
    let listText = `╭─「 👑 OWNER 」─\n`;
    listText += `│\n`;
    
    for (let i = 0; i < ownerNumbers.length; i++) {
        const number = ownerNumbers[i];
        listText += `│ ${i + 1}. ${number}\n`;
    }
    
    listText += `│\n`;
    listText += `╰────────────────\n\n`;
    listText += `📊 Total: ${ownerNumbers.length} owner`;
    
    await m.reply(listText);
}

module.exports = {
    config: pluginConfig,
    handler
};

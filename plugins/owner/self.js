/**
 * @file plugins/owner/self.js
 * @description Command untuk toggle self mode - hanya bot sendiri yang bisa akses
 * @author DinoCode Team
 * @version 1.1.0
 */

const { getDatabase } = require('../../src/lib/database');

/**
 * Konfigurasi plugin self
 */
const pluginConfig = {
    name: 'self',
    alias: ['selfmode', 'botonly'],
    category: 'owner',
    description: 'Toggle self mode - hanya bot sendiri yang bisa akses',
    usage: '.self [on/off]',
    example: '.self on',
    isOwner: true,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 3,
    limit: 0,
    isEnabled: true
};

/**
 * Handler untuk command self
 */
async function handler(m, { sock, config }) {
    const db = getDatabase();
    const args = m.args;
    const currentMode = db.setting('selfMode') || false;
    
    if (!args[0]) {
        const status = currentMode ? '🟢 ON' : '🔴 OFF';
        await m.reply(`🤖 *Self Mode Status*\n\nCurrent: ${status}\n\nUsage:\n• \`.self on\` - Aktifkan (hanya bot)\n• \`.self off\` - Nonaktifkan`);
        return;
    }
    
    const action = args[0].toLowerCase();
    
    if (action === 'on' || action === '1' || action === 'true') {
        if (currentMode) {
            await m.reply('⚠️ Self mode sudah aktif!');
            return;
        }
        
        db.setting('selfMode', true);
        await m.reply('✅ *Self Mode Activated!*\n\n🤖 Sekarang hanya bot sendiri yang bisa menggunakan command.\n\nGunakan \`.self off\` untuk menonaktifkan.');
    } else if (action === 'off' || action === '0' || action === 'false') {
        if (!currentMode) {
            await m.reply('⚠️ Self mode sudah nonaktif!');
            return;
        }
        
        db.setting('selfMode', false);
        await m.reply('✅ *Self Mode Deactivated!*\n\n👥 Semua user sekarang bisa menggunakan bot (sesuai mode).');
    } else {
        await m.reply('❌ Penggunaan salah!\n\nGunakan:\n• \`.self on\`\n• \`.self off\`');
    }
}

module.exports = {
    config: pluginConfig,
    handler
};

/**
 * @file plugins/main/menu.js
 * @description Plugin menu dengan desain baru - semua command ditampilkan di menu utama
 * @author DinoCode Team
 * @version 6.0.0
 */

const config = require('../../config');
const { formatUptime, getTimeGreeting } = require('../../src/lib/formatter');
const { getCommandsByCategory, getCategories } = require('../../src/lib/plugins');
const { getDatabase } = require('../../src/lib/database');
const fs = require('fs');
const path = require('path');

/**
 * Konfigurasi plugin menu
 */
const pluginConfig = {
    name: 'menu',
    alias: ['help', 'bantuan', 'commands', 'm'],
    category: 'main',
    description: 'Menampilkan menu utama bot',
    usage: '.menu',
    example: '.menu',
    isOwner: false,
    isPremium: false,
    isGroup: false,
    isPrivate: false,
    cooldown: 5,
    limit: 0,
    isEnabled: true
};

/**
 * Emoji untuk setiap kategori
 */
const CATEGORY_EMOJIS = {
    owner: '👑',
    main: '🏠',
    utility: '🔧',
    fun: '🎮',
    group: '👥',
    download: '📥',
    search: '🔍',
    tools: '🛠️',
    sticker: '🖼️',
    ai: '🤖',
    game: '🎯',
    media: '🎬',
    info: 'ℹ️'
};

/**
 * Format waktu compact
 */
function formatTime(date) {
    return date.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });
}

/**
 * Format tanggal compact
 */
function formatDateShort(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Handler untuk command menu
 */
async function handler(m, { sock, config: botConfig, db, uptime }) {
    const prefix = botConfig.command?.prefix || '.';
    
    const user = db.getUser(m.sender);
    const now = new Date();
    const timeStr = formatTime(now);
    const dateStr = formatDateShort(now);
    
    const categories = getCategories();
    const commandsByCategory = getCommandsByCategory();
    
    // Hitung total commands
    let totalCommands = 0;
    for (const category of categories) {
        totalCommands += (commandsByCategory[category] || []).length;
    }
    
    // Tentukan role user
    let userRole = 'User';
    let roleEmoji = '👤';
    if (m.isOwner) {
        userRole = 'Owner';
        roleEmoji = '👑';
    } else if (m.isPremium) {
        userRole = 'Premium';
        roleEmoji = '💎';
    }
    
    const greeting = getTimeGreeting();
    const uptimeFormatted = formatUptime(uptime);
    const totalUsers = db.getUserCount();
    
    let txt = '';
    
    // Header greeting
    txt += `Hallo ${m.pushName} ${greeting.includes('pagi') ? '🌅' : greeting.includes('siang') ? '☀️' : greeting.includes('sore') ? '🌇' : '🌙'}\n`;
    txt += `${greeting}! Selamat datang di *${botConfig.bot?.name || 'DinoCode'}*\n\n`;
    
    // ═══════════════════════════════
    // BOT INFO
    // ═══════════════════════════════
    txt += `╭┈┈⽗「 🤖 *BOT INFO* 」\n`;
    txt += `││ ރ Nama: *${botConfig.bot?.name || 'DinoCode'}*\n`;
    txt += `││ ރ Versi: *v${botConfig.bot?.version || '1.1.0'}*\n`;
    txt += `││ ރ Mode: *${(botConfig.mode || 'public').toUpperCase()}*\n`;
    txt += `││ ރ Prefix: *[ ${prefix} ]*\n`;
    txt += `││ ރ Uptime: *${uptimeFormatted}*\n`;
    txt += `││ ރ Total User: *${totalUsers}*\n`;
    txt += `││ ރ Total Command: *${totalCommands}*\n`;
    txt += `╰┈┈┈┈┈┈┈┈⽗\n\n`;
    
    // ═══════════════════════════════
    // USER INFO
    // ═══════════════════════════════
    txt += `╭┈┈⽗「 👤 *USER INFO* 」\n`;
    txt += `││ ރ Nama: *${m.pushName}*\n`;
    txt += `││ ރ Role: *${roleEmoji} ${userRole}*\n`;
    txt += `││ ރ Limit: *${user?.limit ?? 25}*\n`;
    txt += `││ ރ Waktu: *${timeStr} WIB*\n`;
    txt += `││ ރ Tanggal: *${dateStr}*\n`;
    txt += `╰┈┈┈┈┈┈┈┈⽗\n\n`;
    
    // ═══════════════════════════════
    // ALL COMMANDS BY CATEGORY
    // ═══════════════════════════════
    
    // Urutan kategori yang diinginkan
    const categoryOrder = ['owner', 'main', 'utility', 'tools', 'fun', 'game', 'download', 'search', 'sticker', 'media', 'ai', 'group', 'info'];
    
    // Sort categories berdasarkan order
    const sortedCategories = categories.sort((a, b) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });
    
    for (const category of sortedCategories) {
        // Skip owner category jika bukan owner
        if (category === 'owner' && !m.isOwner) continue;
        
        const commands = commandsByCategory[category] || [];
        if (commands.length === 0) continue;
        
        const emoji = CATEGORY_EMOJIS[category] || '📋';
        const categoryName = category.toUpperCase();
        
        txt += `╭┈┈⽗「 ${emoji} \`${categoryName}\` 」\n`;
        
        for (const cmd of commands) {
            txt += `││ ރ ${prefix}${cmd}\n`;
        }
        
        txt += `╰┈┈┈┈┈┈┈┈⽗\n\n`;
    }
    
    // ═══════════════════════════════
    // FOOTER
    // ═══════════════════════════════
    txt += `© *${botConfig.bot?.name || 'DinoCode'}* | ${new Date().getFullYear()}\n`;
    txt += `Developer: *${botConfig.bot?.developer || 'Lucky Archz'}*`;
    
    // Kirim menu
    await sendMenuWithUI(m, sock, txt, botConfig);
}

/**
 * Mengirim menu dengan UI premium
 */
async function sendMenuWithUI(m, sock, text, botConfig) {
    const botName = botConfig.bot?.name || 'DinoCode';
    const saluranId = botConfig.saluran?.id || '120363208449943317@newsletter';
    const saluranName = botConfig.saluran?.name || botName;
    const saluranLink = botConfig.saluran?.link || '';
    
    const fakeStatusQuoted = {
        key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast'
        },
        message: {
            extendedTextMessage: {
                text: `✨ *${botName}*`,
                contextInfo: {
                    isForwarded: true,
                    forwardingScore: 999,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: saluranId,
                        newsletterName: saluranName,
                        serverMessageId: 127
                    }
                }
            }
        }
    };
    
    let imagePath = path.join(process.cwd(), 'assets', 'images', 'dinocode.jpg');
    let thumbPath = path.join(process.cwd(), 'assets', 'images', 'dinocode2.jpg');
    
    let imageBuffer = null;
    let thumbBuffer = null;
    
    if (fs.existsSync(imagePath)) {
        imageBuffer = fs.readFileSync(imagePath);
    }
    if (fs.existsSync(thumbPath)) {
        thumbBuffer = fs.readFileSync(thumbPath);
    }
    
    const messageContent = {
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 9999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: saluranId,
                newsletterName: saluranName,
                serverMessageId: 127
            },
            externalAdReply: {
                title: `${botName} `,
                body: `v${botConfig.bot?.version || '1.1.0'} | ${botConfig.mode || 'public'}`,
                sourceUrl: saluranLink,
                mediaType: 1,
                showAdAttribution: false,
                renderLargerThumbnail: false
            }
        }
    };
    
    if (thumbBuffer) {
        messageContent.contextInfo.externalAdReply.thumbnail = thumbBuffer;
    }

    if (imageBuffer) {
        messageContent.image = imageBuffer;
        messageContent.caption = text;
    } else {
        messageContent.text = text;
    }

    try {
        await sock.sendMessage(m.chat, messageContent, {
            quoted: fakeStatusQuoted
        });
    } catch (error) {
        // Fallback ke text biasa
        await m.reply(text);
    }
}

module.exports = {
    config: pluginConfig,
    handler
};

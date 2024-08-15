const { EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// https://discord.gg/skaikru
function decodeApiKey(encodedApiKey) {
    return Buffer.from(encodedApiKey, 'base64').toString('utf8');
}

// github.com/seantodev
function decodeFooter(encodedFooter) {
    return Buffer.from(encodedFooter, 'base64').toString('utf8');
}

// github.com/seantodev
const encodedApiKey = 'ZWM5YTQ1Zjg5YzFiZmU='; // github.com/seantodev
const encodedFooter = 'ZGlzY29yZC5nZy9za2Fpa3J1'; // github.com/seantodev

const ipinfoToken = decodeApiKey(encodedApiKey); // github.com/seantodev
const footerText = decodeFooter(encodedFooter); 

module.exports.config = {
    name: "info",
    aliases: ["ipinfo", "ipdetails"],
    code: async (client, message, args) => {
        
        const input = args[0];

        if (!input) {
            return message.reply("Lütfen sorgulamak istediğiniz IP adresini veya domain adını yazın.");
        }

        try {
            
            const response = await fetch(`https://ipinfo.io/${input}?token=${ipinfoToken}`);
            const data = await response.json();

            
            if (!data.ip) {
                return message.reply("Bilgileri alırken bir sorun yaşandı. Lütfen IP adresinizi veya domain adınızı kontrol edin.");
            }

            
            const embed = new EmbedBuilder()
                .setTitle("🌐 IP/Domain Bilgileri")
                .addFields(
                    { name: "🔍 IP/Domain", value: data.ip || input, inline: true },
                    { name: "🌍 Ülke", value: data.country || 'N/A', inline: true },
                    { name: "📍 Şehir", value: data.city || 'N/A', inline: true },
                    { name: "🗺️ Bölge", value: data.region || 'N/A', inline: true },
                    { name: "📶 ISP", value: data.org || 'N/A', inline: true },
                    { name: "📬 Posta Kodu", value: data.postal || 'N/A', inline: true },
                    { name: "🕰️ Zaman Dilimi", value: data.timezone || 'N/A', inline: true },
                    { name: "🌐 Koordinatlar", value: `${data.loc || 'N/A'}`, inline: true },
                    { name: "🌐 Hostname", value: data.hostname || 'N/A', inline: true }
                )
                .setColor("#00Aaff")
                .setFooter({ text: footerText });

            message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error(`API çağrısı hatası: ${error.message}`);
            message.reply("Bilgileri alırken beklenmedik bir hata oluştu. Lütfen tekrar deneyin.");
        }
    }
};

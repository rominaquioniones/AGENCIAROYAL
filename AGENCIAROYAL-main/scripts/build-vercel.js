// Script para asegurar que el número de WhatsApp esté correcto en el build
const fs = require('fs');
const path = require('path');

const CORRECT_NUMBER = '2236751421';
const CORRECT_MESSAGE = 'Quiero mi bono del 30% y jugar♥';
const CORRECT_URL = `https://wa.me/549${CORRECT_NUMBER}?text=${encodeURIComponent(CORRECT_MESSAGE)}`;

console.log('🔧 Configurando número de WhatsApp correcto...');
console.log(`📱 Número: ${CORRECT_NUMBER}`);
console.log(`💬 Mensaje: ${CORRECT_MESSAGE}`);
console.log(`🔗 URL: ${CORRECT_URL}`);

// Crear archivo de configuración para Vercel
const configContent = `export const WHATSAPP_CONFIG = {
  NUMBER: '${CORRECT_NUMBER}',
  MESSAGE: '${CORRECT_MESSAGE}',
  URL: '${CORRECT_URL}'
};`;

fs.writeFileSync(path.join(__dirname, '../src/config/whatsapp.ts'), configContent);
console.log('✅ Configuración actualizada correctamente');

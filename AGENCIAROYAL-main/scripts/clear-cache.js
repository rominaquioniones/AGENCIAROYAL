// Script para limpiar caché y forzar actualización
const fs = require('fs');
const path = require('path');

console.log('🧹 Limpiando caché y forzando actualización...');

// Crear archivo de timestamp para forzar actualización
const timestamp = new Date().toISOString();
const cacheBuster = {
  timestamp,
  version: '2.0.0',
  whatsapp_number: '2236751421',
  whatsapp_message: 'Quiero mi bono del 30% y jugar♥'
};

fs.writeFileSync(
  path.join(__dirname, '../src/cache-buster.json'),
  JSON.stringify(cacheBuster, null, 2)
);

console.log('✅ Cache buster creado:', cacheBuster);

// Actualizar package.json con nueva versión
const packagePath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
packageJson.version = '2.0.0';
packageJson.cacheBuster = timestamp;

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
console.log('✅ Package.json actualizado');

console.log('🎯 Listo para deploy - Número: 2236751421, Mensaje: 30%');

#!/bin/bash
echo "🚀 Iniciando build de Angular + Laravel en Railway..."

# 1️⃣ Instalar dependencias del backend (Laravel)
cd movie-catalog-backend
composer install --no-dev --optimize-autoloader

# 2️⃣ Instalar dependencias del frontend (Angular)
cd ../front
npm install
npm run build -- --configuration production

# 3️⃣ Copiar los archivos compilados de Angular al directorio público de Laravel
rm -rf ../movie-catalog-backend/public/*
cp -r dist/front/* ../movie-catalog-backend/public/

# 4️⃣ Volver al backend y arrancar el servidor de Laravel
cd ../movie-catalog-backend
php artisan config:cache
php artisan route:cache
php artisan serve --host=0.0.0.0 --port=$PORT

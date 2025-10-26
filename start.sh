#!/bin/bash
echo "🚀 Iniciando build de Angular + Laravel en Railway..."

# 1️⃣ Instalar dependencias del backend (Laravel)
cd laravel-backend
composer install --no-dev --optimize-autoloader

# 2️⃣ Instalar dependencias del frontend (Angular)
cd ../angular-frontend
npm install
npm run build -- --configuration production

# 3️⃣ Copiar los archivos compilados de Angular al directorio público de Laravel
rm -rf ../laravel-backend/public/*
cp -r dist/* ../laravel-backend/public/

# 4️⃣ Volver al backend y arrancar el servidor de Laravel
cd ../laravel-backend
php artisan config:cache
php artisan route:cache
php artisan serve --host=0.0.0.0 --port=$PORT

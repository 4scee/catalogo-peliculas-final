#!/bin/bash
echo "🚀 Iniciando build de Angular + Laravel en Railway..."

# ───────────────────────────────
# Backend (Laravel)
# ───────────────────────────────
cd movie-catalog-backend

# Copiar .env y generar APP_KEY si no existe
if [ ! -f .env ]; then
    cp .env.example .env
fi
php artisan key:generate --force

# Instalar dependencias de Laravel
composer install --no-dev --optimize-autoloader

# Limpiar caches
php artisan config:cache
php artisan route:cache
php artisan view:cache

# ───────────────────────────────
# Frontend (Angular)
# ───────────────────────────────
cd ../front
npm install
npm run build -- --configuration production

# ───────────────────────────────
# Copiar Angular compilado a public/
# ───────────────────────────────
rm -rf ../movie-catalog-backend/public/*
cp -r dist/front/* ../movie-catalog-backend/public/

# ───────────────────────────────
# Final
# ───────────────────────────────
echo "✅ Build completo. Laravel será servido por Apache en el puerto 80"
# Apache ya arrancará automáticamente porque estamos usando php:8.2-apache
# No necesitamos php artisan serve
tail -f /dev/null


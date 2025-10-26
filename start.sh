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

# Instalar dependencias
composer install --no-dev --optimize-autoloader

# ───────────────────────────────
# Frontend (Angular)
# ───────────────────────────────
cd ../front
npm install
npm run build -- --configuration production

# ───────────────────────────────
# Copiar Angular al public de Laravel
# ───────────────────────────────
rm -rf ../movie-catalog-backend/public/*
cp -r dist/front/* ../movie-catalog-backend/public/

# ───────────────────────────────
# Volver al backend y levantar Laravel
# ───────────────────────────────
cd ../movie-catalog-backend
php artisan config:cache
php artisan route:cache
php artisan serve --host=0.0.0.0 --port=$PORT

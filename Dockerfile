# ───────────────────────────────
# 1️⃣ Imagen base con PHP y Apache
# ───────────────────────────────
FROM php:8.2-apache

# ───────────────────────────────
# 2️⃣ Instalar dependencias del sistema y Node.js
# ───────────────────────────────
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    npm \
    nodejs \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip \
    && apt-get clean

# ───────────────────────────────
# 3️⃣ Instalar Composer globalmente
# ───────────────────────────────
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# ───────────────────────────────
# 4️⃣ Habilitar mod_rewrite para Laravel
# ───────────────────────────────
RUN a2enmod rewrite

# ───────────────────────────────
# 5️⃣ Copiar todo el proyecto al contenedor
# ───────────────────────────────
COPY . /var/www/html

# ───────────────────────────────
# 6️⃣ Configurar directorio de trabajo
# ───────────────────────────────
WORKDIR /var/www/html

# ───────────────────────────────
# 7️⃣ Dar permisos de ejecución a start.sh
# ───────────────────────────────
RUN chmod +x start.sh

# ───────────────────────────────
# 8️⃣ Exponer el puerto 80 (Apache)
# ───────────────────────────────
EXPOSE 80

# ───────────────────────────────
# 9️⃣ Ejecutar start.sh al iniciar el contenedor
# ───────────────────────────────
CMD ["bash", "start.sh"]

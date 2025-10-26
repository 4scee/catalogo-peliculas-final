# 1️⃣ Imagen base con PHP y Apache
FROM php:8.2-apache

# 2️⃣ Instalar dependencias del sistema y Node.js
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    npm \
    nodejs \
    libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip \
    && apt-get clean

# 3️⃣ Instalar Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 4️⃣ Copiar todo el proyecto al contenedor
COPY . /var/www/html

# 5️⃣ Definir directorio de trabajo
WORKDIR /var/www/html

# 6️⃣ Dar permisos de ejecución a start.sh
RUN chmod +x start.sh

# 7️⃣ Ejecutar start.sh al iniciar el contenedor
CMD ["bash", "start.sh"]

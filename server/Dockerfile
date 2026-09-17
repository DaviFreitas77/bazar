
FROM php:8.4

RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_mysql zip pcntl


WORKDIR /var/www/html

COPY composer.json composer.lock ./

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN composer install --no-interaction --optimize-autoloader --no-scripts

COPY . .

RUN composer dump-autoload --optimize --no-scripts

RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

EXPOSE 8000
EXPOSE 8080

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]





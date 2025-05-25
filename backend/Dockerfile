# Usar una imagen ligera de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto en el que corre el backend (ajústalo si usas otro)
EXPOSE 8000

# Ejecutar el servidor
CMD ["npm" , "start"] 
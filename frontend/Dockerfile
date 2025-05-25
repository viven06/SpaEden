# Usa la imagen de Node oficial
FROM node:18

# Establece directorio de trabajo en el contenedor
WORKDIR /app

# Copia todo el frontend al contenedor
COPY package.json package-lock.json ./

# Instala dependencias
RUN npm install

COPY . .

# Expone el puerto por defecto de React
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]

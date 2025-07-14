# Usa un'immagine Nginx leggera
FROM nginx:alpine

# Copia i tuoi file nel percorso predefinito di Nginx
COPY ./ /usr/share/nginx/html

# Espone la porta 80
EXPOSE 80

# Usa il comando predefinito di Nginx
CMD ["nginx", "-g", "daemon off;"]

FROM node:18

# Install multiple OpenJDK versions
RUN apt-get update && \
    apt-get install -y openjdk-8-jre openjdk-11-jre openjdk-17-jre

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"] 
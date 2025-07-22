FROM node:18

# Install dependencies for SDKMAN and Java
RUN apt-get update && apt-get install -y curl zip unzip

# Install SDKMAN
RUN curl -s "https://get.sdkman.io" | bash

# Install OpenJDK 8, 11, and 17 using SDKMAN
RUN bash -c "source /root/.sdkman/bin/sdkman-init.sh && \
    sdk install java 8.0.402-tem && \
    sdk install java 11.0.23-tem && \
    sdk install java 17.0.11-tem"

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"] 
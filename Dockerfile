# Match with my local Node Version
FROM node:16-alpine

WORKDIR /ganoverflow-back

COPY package.json package-lock.json ./

# Dependency Install
RUN npm install

# Copy source code
COPY . .

# 항상 dist갱신
RUN npm run build

# Rebuild native modules in the container
RUN npm rebuild

# PORT (8080) Expose
EXPOSE 8080

# START
ENTRYPOINT npm run start:prod
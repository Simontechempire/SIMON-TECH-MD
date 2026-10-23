FROM node:18-alpine
RUN apk add --no-cache git python3 make g++
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY . .
RUN mkdir -p auth
EXPOSE 3000
CMD ["npm", "start"]

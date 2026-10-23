FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --only=production
COPY . .
RUN mkdir -p auth && echo "keep" > auth/.gitkeep
EXPOSE 3000
CMD ["npm", "start"]

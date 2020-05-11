FROM node:12

COPY .npmrc ./  

# Add package file
COPY package*.json ./

# Install deps
RUN npm i
RUN rm -f .npmrc

# Copy source
COPY . .

# Build dist
RUN npm run build

# Expose port 3000
EXPOSE 5000

CMD ["npm", "run", "start"]

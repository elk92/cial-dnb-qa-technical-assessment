FROM cypress/included:16.0.0

WORKDIR /e2e

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "test"]

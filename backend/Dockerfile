# Stage 1: Build Python dependencies
FROM python:3.9-alpine AS builder

WORKDIR /backend

COPY requirements.txt ./
RUN pip install --user --no-cache-dir -r requirements.txt

# Upgrade pip
RUN pip install --user --no-cache-dir --upgrade pip

# Stage 2: Final image with Node.js and copied Python dependencies
FROM pytorch/pytorch

WORKDIR /backend

COPY --from=builder /root/.local /root/.local
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN apk add --no-cache python3-dev py3-pip py3-numpy py3-opencv \
    && python3 -m ensurepip \
    && python3 -m pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir torchvision \
    && npm i

CMD ["node", "app.js"]

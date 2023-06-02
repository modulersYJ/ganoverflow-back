
# 0602 - 깃허브액션 워크플로 이벤트 트리거 변경
REF: https://hyperconnect.github.io/2021/06/14/auto-deployment.html

before docker-image.yml
```yml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
```


after docker-image.yml
```yml
name: Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2
```
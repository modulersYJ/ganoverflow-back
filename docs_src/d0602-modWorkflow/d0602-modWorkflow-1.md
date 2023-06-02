
# 0602 - 깃허브액션 워크플로 이벤트 트리거 변경
REF: https://hyperconnect.github.io/2021/06/14/auto-deployment.html

REF - 공홈가이드 : https://docs.github.com/ko/github-ae@latest/actions/using-workflows/events-that-trigger-workflows

<br><br>

## 1. 
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

## 2. MERGE PR 규칙 설정
![](./d0602-modWorkflow-3.png)
![](./d0602-modWorkflow-4.png)

## 3-1. workflow 규칙수정 1
![](./d0602-modWorkflow-5.png)

## 3-1. workflow 규칙수정 2
![](./d0602-modWorkflow2-3.png)
![](./d0602-modWorkflow2-4.png)
![](./d0602-modWorkflow2-2.png)

## 3-1. workflow 규칙수정 3 - 완료
![](./d0602-modWorkflow2-1.png)
![](./d0602-modWorkflow2-5.png)
![](./d0602-modWorkflow2-6.png)
![](./d0602-modWorkflow2-8.png)
![](./d0602-modWorkflow2-9.png)
# Container

- 링크: [AWS 강의실](https://www.youtube.com/watch?v=V7a7ipR1Q3A)      

## 컨테이너란?

소프트웨어 어플리케이션을 실행하기 위한 모든 것을 담은 패키지  

집이든, 회사든, 클라우드이든 어느곳에서 실행하더라도 문제가 없음.  

  - ex) Docker, Kubernates  

    - 코드

    - 운영체제

    - 설정 파일

    - 기타 라이브러리 등

![스크린샷 2023-12-05 오후 11 17 37](https://github.com/sonicce99/TIL/assets/87749134/50853cd6-18dd-4b23-ac33-559cafa70b77)


## AWS 컨테이너 서비스

- AWS EKS (Amazon Elastic Kubernetes Service)

    - AWS가 제공하는 Kubernetes를 활용한 컨테이너 관리 시스템  

- AWS ECS (Amazon Elastic Container Service)  

    - 컨테이너화된 애플리케이션의 손쉬운 배포, 관리 및 크기 조정에 도움이 되는 완전 관리형 컨테이너 오케스트레이션 서비스

        - EC2 Mode

        - AWS Fargate (serverless 환경에서 컨테이너 기반의 어플리케이션을 host)  


- AWS Lambda

    - AWS Lambda 함수를 컨테이너 기반 이미지로 배포할 수 있는 기능  

      - AWS Lambda Base Image를 기반으로 이미지를 생성하여 배포  

      - 최대 10GB 사이즈

      - AWS Lambda의 다양한 기능 (이벤트 기반 트리거, 동시성, serverless 활용 등)을 활용하여 컨테이너 기반 코드를 실행하고 싶을 경우 사용   

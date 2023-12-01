# Lambda

- 링크: [AWS 강의실](https://www.youtube.com/watch?v=-BEou7aN7AY)  

## Serverless

- 서버의 관리와 프로비전 없이 코드를 실행할 수 있음

- 사용한 만큼만 비용을 지불 (OnDemand)

- 고가용성과 장애 내구성이 확보되어 있음

- 빠르게 배포하고 업데이트 가능

- Serverless 환경을 잘 활용할 수  있는 아키텍처 필요

    - 병렬 처리

    - 이벤트 기반 아키텍처 등


## Lambda란?

서버를 프로비저닝 또는 관리하지 않고도 실제로 모든 유형의 어플리케이션 or 백엔드 서비스에 대한 코드를 실행할 수 있는 이벤트 중심의 서버리스 컴퓨팅 서비스.

- AWS의 Serverless 컴퓨팅 서비스

    - 코드와 코드를 싱행하기 위한 파일들을 업로드하면 서버 프로비저닝 없이 코드를 실행.

- 다양한 AWS 서비스에서 Lambda를 활용 가능

- 다양한 언어 지원

    - Java, C#, Go, Nod, Python, Ruby ...

- Lambda는 크게 2가지 방법으로 호출함.

    - 이벤트 기반

    - 다른 AWS 서비스 or API Gateway를 통해서 호출.

- 저렴한 가격  


## Lambda의 구성

- Deployment Package

    - 함수의 코드와 코드를 실행하기 위한 런타임으로 구성

    - 용량제한

        - zip파일 : 50MB,
        - unZip파일 : 250MB
        - 콘솔 에디터 사용: 3MB

    - S3에 업로드 가능

    - 컨테이너 이미지, Lambda Layer 등으로 우회 가능


## 트리거

- AWS를 호출하는 서비스

    - API Gateway

    - S3

- 각 서비스에서 호출 시 지정된 양식의 이벤트 내용을 전달

# EBS, Snapshot, AMI

- 링크: [AWS 강의실](https://www.youtube.com/watch?v=N8TB_6AbaM4)

## EBS (Elastic Block Store)

- 가상의 하드드라이브
- 인스턴스 정지 후 재 기동 가능
- EC2와 같은 가용영역에 존재
- 5가지의 타입을 제공 (콜드 HDD와 마그네틱은 HDD임. 나머지는 SSD)

  - 범용 (GP3)
  - 프로비저닝된 IOPS
  - 쓰루풋 최적화 (Throughput Optimized HDD)

  - 콜드 HDD (SC1)
  - 마그네틱 (Standard)

- EC2 인스턴스가 종료되어도 계속 유지 가능

  - EBS(스토리지) 와 EC2는 **네트워크**로 연결되어 있음.

  - EC2를 변경할 때 굉장히 용이함. EBS는 그대로 둔 채 EC2만 변경하면됌.

  - 네트워크로 연결되어 있기 때문에 하나의 EC2에 여러가지의 스토리지를 연결 가능함.

![스크린샷 2024-01-02 오전 11 47 24](https://github.com/sonicce99/TIL/assets/87749134/f0ac11a7-d89e-4a4c-afda-8efcbf49948a)

## Snapshot

- 특정 시간에 EBS 상태의 저장본

  - EBS에 사진을 찍어둔 개념

- 필요시 스냅샷을 통해 특정 시간의 EBS를 복구 가능
- S3에 보관 (EBS에 비해 가격이 쌈)
  - 증분식 저장

## AMI (Amazon Machine Image)

- EC2 인스턴스를 실행하기 위해 필요한 정보를 모은 단위

  - OS, 아키텍쳐 타입 (32-bit or 64-bit), 저장공간 용량 등

- AMI를 사용하여 EC2를 복제하거나 다른 리전 -> 계정으로 전달 가능

- 스냅샷을 기반으로 AMI 구성 가능

### AMI 구성

- 1개 이상의 EBS 스냅샷
- 인스턴스 저장 인스턴스의 경우 루트 볼륨에 대한 탬플릿 (ex. 운영체제, 애플리케이션 서버, 애플리케이션)
- 사용권한
- 블럭 디바이스 매핑 (EC2 인스턴스를 위한 매핑정보 => EBS가 무슨용량으로 몇 개 붙는지)
- 총 2가지의 타입이 있음.

  - EBS 기반

    - EC2와 EBS가 네트워크로 연결되어 있음.

  - 인스턴스 저장 기반
    - EC2 내부에 저장공간이 있음. 속도가 매우 빠르나, EC2 초기화시 데이터도 초기화됨.

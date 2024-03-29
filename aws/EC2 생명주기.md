# EC2 생명주기  

- 링크: [AWS 강의실](https://www.youtube.com/watch?v=PgByr2ZfrsE)  

![스크린샷 2024-01-02 오전 11 18 51](https://github.com/sonicce99/TIL/assets/87749134/51242770-bd43-4963-ac99-8641c034fa2e)

AMI로부터 실행이 되고 나서부터 종료되기까지 EC2가 거치는 과정  

- pending

    - EC2를 가동하기 위해 가상머신에 올라가기 위해 EBS가 준비되는 단계


- running 

    - 실제 사용할 수 있는 상태 

- stopping (중지 / 최대절전)

    - 인스턴스를 잠깐 멈춤 
    - 인스턴스 요금 미청구 (단 EBS요금, 다른 구성요소는 청구됨)  
    - ❗️ 중지 후 재시작시 퍼블릭 IP 변경됨. 
    - EBS를 사용하는 인스턴스만 중지 가능 (인스턴스 저장 인스턴스는 중지 불가)

    - 최대절전모드는 메모리의 내용을 하드디스크에 저장하고 컴퓨터를 종료함. 재시작시 하드디스크에서 다시 메모리에 데이터를 가져와서 사용하는 모드.  

- rebooting 

    - 재부팅시에는 퍼블릭 IP 변동 없음. 

- shutting-down

    - 인스턴스를 종료함.
    - EBS도 종료 할 수 있고, 인스턴스까지 모두 종료 할 수 있다.


![스크린샷 2024-01-02 오전 11 31 39](https://github.com/sonicce99/TIL/assets/87749134/c2334ad5-c156-425b-bd90-e9b7520183b4)

## 활용

- AWS Lambda를 통해 인스턴스를 자동 실행, 중지를 하여 비용을 컨트롤 가능함.  
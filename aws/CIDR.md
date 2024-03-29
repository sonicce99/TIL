# CIDR 블럭 (classless Inter Domain Routing)

- 링크: [AWS 강의실](https://www.youtube.com/watch?v=kYiQGpPVnyI)

## 사전지식

IPv4는 32비트의 숫자로 구성되어 있음. 총 4,294,967,296개가 있다.

이중 588,514,304개는 특정한 목적으로 선점이 되어있다.

따라서 쓸 수 있는 IP 갯수는 4,294,967,296 - 588,514,304 = 3,706,452,992개 밖에 없음.

따라서 충분하지 않기 떄문에 사설 IP가 필요하다.

Gateway만 public IP를 가지고 있고, Gateway와 연결된 나머지는 사설 IP에 연결된다.

![스크린샷 2023-11-30 오후 6 08 02](https://github.com/sonicce99/TIL/assets/87749134/09e81fb9-6ff8-4c77-b497-e302b0d93466)

## 사설 IP 범위

| 이름        | IP 주소 범위                  | 아이피갯수   | 서브넷마스크 |
| ----------- | ----------------------------- | ------------ | ------------ |
| 24비트 블럭 | 10.0.0.0 ~ 10.255.255.255     | 16,777,216개 | 255.0.0.0    |
| 20비트 블럭 | 172.16.0.0 ~ 172.31.255.255   | 1,048,56개   | 255.240.0.0  |
| 16비트 블럭 | 192.168.0.0 ~ 192.168.255.255 | 65536개      | 255.255.0.0  |

![스크린샷 2023-11-30 오후 6 15 36](https://github.com/sonicce99/TIL/assets/87749134/31be1f31-b77d-4b65-8dc0-88a2da55ddf4)

## CIDR란?

Classless Inter-Domain Routing(CIDR)은 인터넷상의 데이터 라우팅 효율성을 향상시키는 IP 주소 할당 방법입니다.

- IP 주소의 영역을 여러 네트워크 영역으로 나누기 위해 IP를 묶는 방식

- 여러개의 사설망을 구축하기 위해 망을 나누는 방법

첫번째 / 마지막 IP는 예약이되어있어 사용이 불가능하다.

- 첫번째 IP는 네트워크 자체를 가르키는 IP

- 마지막 IP는 Broadcast IP

AWS에서는 총 5개의 Address를 예약한다.

- 첫번째: 네트워크 주소

- 두번째: VPC Router

- 세번째: DNS

- 네번째: Future use

- 마지막: Broadcast

![스크린샷 2023-11-30 오후 6 50 57](https://github.com/sonicce99/TIL/assets/87749134/1b9ce63d-b969-4843-97c3-e064acba3662)

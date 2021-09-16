**www : world wide web**

Http : www상에서 정보를 주고 받는 프로토콜
TCP,UDP를 활용함.
HTTP method: GET, POST, PUT, DELETE


**HTTP over SSL**

- HTTP의 보안 강화 버전

- 소켓 통신 시 SSL or TLS Protocol로 세션 데이터를 암호화

- default port:443


**FTP (File Transfer Protocol)**

- 서버와 클라이언트 사이에 파일 전송을 위한 프로토콜

- but, 보안에 매우 취약 (패킷 가로채기, 무차별 대입...)



**SMTP (Simple Mail Transfer Protocol)**

- Internet에서 메일을 보내기 위한 프로토콜



**TCP/IP (Transmission Control Protocol / Internet Protocol)**

- 전송제어 프로토콜 + 송수신 호스트의 패킷 교환을 위한 프로토콜


**TCP**

- 전송제어 프로토콜

- 근거리 통신망이나 인트라넷, 인터넷에 연결된 컴퓨터에서 실행되는 프로그램 간에 일련의 바이트를 안정적으로, 순서대로, 에러없이 교환할 수 있게 함.



**STREAM socket**

- 연결형 스트림 소켓은 두개의 시스템이 연결된 후 데이터를 교환

- 패킷 순서 신경쓰지 않아도 되어 안정적인 데이터 전송 가능



**DATAGRAM socket**

- 비연결형 데이터그램 소켓은 명시적으로 연결되지 않은 상태로 데이터를 주고 받음

- 연결과 해제 과정이 없어 빠른 데이터 교환이 가능

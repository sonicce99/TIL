## HTTP

HTTP는 Hypertext Transfer Protocol의 약자다.

즉 Hypertext 인 HTML을 전송하기 위한 통신규약을 의미한다.

HTTPS에서 마지막의 ```S``` 는 Over Secure Socket Layer의 약자로 Secure라는 말을 통해서 알 수 있듯이 보안이 강화된 HTTP라는 것을 짐작할 수 있다.

## HTTPS 와 SSL

SSL 위에서 https가 돌아간다.

## SSL 과 TLS

같은 말이다. 네스케이프에 의해서 SSL이 발명되었고, 이것이 점차 폭넓게 사용되다가 표준화 기구인 IETF의 관리로 변경되면서 TLS라는 이름으로 바뀌었다. TLS 1.0은 SSL 3.0을 계승한다. 하지만 TLS라는 이름보다 SSL이라는 이름이 훨씬 많이 사용되고 있다.

***

## SSL 디지털 인증서

SSL 인증서는 클라이언트와 서버간의 통신을 제3자가 보증해주는 전자화된 문서다. 클라이언트가 서버에 접속한 직후에 서버는 클라이언트에게 이 인증서 정보를 전달한다. 클라이언트는 이 인증서 정보가 신뢰할 수 있는 것인지를 검증 한 후에 다음 절차를 수행하게 된다.  

## 대칭키 (보통 나 혼자 키를 알고 있을 때 사용)  

SSL의 핵심은 암호화다. 암호를 만드는 행위인 암호화를 할 때는 키(key)가 필요하고 ```대칭키``` 라고 부른다. 이 키에 따라서 암호화된 결과가 달라지기 때문에 키를 모르면 암호를 푸는 행위인 복호화를 할 수 없다.

대칭키는 동일한 키로 암호화와 복호화를 같이 할 수 있는 방식의 암호화 기법을 의미한다. 즉 암호화를 할 때 1234라는 값을 사용했다면 복호화를 할 때 1234라는 값을 입력해야 한다는 것이다.  

이 방식의 단점은 대칭키를 멀리있는 상대방도 알고 있어야 한다는 점이다.  

## 공개키 (대칭키의 단점을 보완한 키)  

대칭키 방식은 단점이 있다. 암호를 주고 받는 사람들 사이에 대칭키를 전달하는 것이 어렵다는 점이다. 대칭키가 유출되면 키를 획득한 공격자는 암호의 내용을 복호화 할 수 있기 때문에 암호가 무용지물이 되기 때문이다. 이런 배경에서 나온 암호화 방식이 공개키방식이다.

2개의 키가 있고 두개의 키 중 하나를 ```비공개키(private key, 개인키, 비밀키라고도 부른다)``` 로하고, 나머지를 ```공개키(public key)``` 로 지정한다.

클라이언트가 서버에 데이터를 요청하면 클라이언트는 자신의 공개키를 서버에 전송하고 서버도 자신의 공개키를 클라이언트에 전송한다. 그럼 클라이언트는 서버에서 준 공개키를 가지고 해당 데이터를 암호화 하여 서버에게 보낸다. 서버는 자신만의 비공개키를 가지고 해당 내용을 복호화한다. 이 과정에서 공개키가 유출된다고해도 비공개키를 모르면 정보를 복호화 할 수 없기 때문에 안전하다. 공개키로는 암호화는 할 수 있지만 복호화는 할 수 없기 때문이다.  

***

## SSL 인증서의 역할

1. 클라이언트가 접속한 서버가 신뢰 할 수 있는 서버임을 보장한다.

2. SSL 통신에 사용할 공개키를 클라이언트에게 제공한다.

### CA

인증서의 역할은 클라이언트가 접속한 서버가 클라이언트가 의도한 서버가 맞는지를 보장하는 역할을 한다. 이 역할을 하는 민간기업들이 있는데 이런 기업들을 CA(Certificate authority) 혹은 Root Certificate 라고 부른다. CA는 아무 기업이나 할 수 있는 것이 아니고 신뢰성이 엄격하게 공인된 기업들만이 참여할 수 있다.


### SSL 인증서의 내용

1. 서비스의 정보 (인증서를 발급한 CA, 서비스의 도메인 등등)

2. 서버 측 공개키 (공개키의 내용, 공개키의 암호화 방법)


### SSL 동작방법

실제 SSL이 동작할 때는 공개키만 사용하지 않고 공개키와 대칭키를 혼합해서 사용한다. 왜냐하면 공개키만 사용하면 암호화 하고 복호화 하는 과정에서 성능을 많이 잡아먹기 때문이다.

따라서 실제 데이터는 대칭키 방식으로 암호화 한다. 대칭키 방식은 비교적 성능을 많이 안잡아 먹기 때문이다. 그러면 상대방도 암호화된 정보를 풀기 위해서 대칭키가 있어야 하는데 바로 이때 공개키 방식을 사용한다.

클라이언트가 서버에 데이터를 요청하고 싶다. 그러면 다음의 3가지 단계를 거친다.

> 악수 -> 전송 -> 세션종료

1. 악수(handshake)  

- 클라이언트와 서버 서로간의 인증서를 주고받는다. (이 안에는 서로의 공개키가 포함되어 있다.)

이때 클라이언트는 서버의 인증서가 CA에 의해서 발급된 것인지 확인하기 위해 클라이언트에 내장된 CA리스트를 확인한다. 이때 인증서가 없다면 사용자에게 경고 메세지를 출력한다. 그리고 인증서 안에 내장된 공개키로 인증서를 복호화하여 정말 증명된 인증서인지 확인한다.


2. 세션

- 실제로 서버와 클라이언트가 데이터를 주고받는 단계이다.

증명된 인증서라면 클라이언트는 서버에 보내고 싶은 데이터를 대칭키 방식으로 암호화한다. 그러면 서버도 암호화된 데이터를 복호화 하기 위해서 대칭키가 필요한데 아까 서로의 인증서를 주고 받았을 때 받은 서버의 공개키로 대칭키를 암호화하여 서버에 전송한다. 서버는 자신만의 비공개키로 해당 대칭키를 복호화하고 서버에 정상적으로 데이터를 가져올 준비가 완료된다.    

3. 세션 종료

- 데이터의 전송이 끝나면 SSL 통신이 끝났음을 서로에게 알려준다. 이 때 통신에서 사용한 대칭키를 폐기한다.

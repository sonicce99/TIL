## LCS (Longest Common Subsequence)  

### LCS 길이 구하기  

```javascript
ACAYKP
CAPCAK
```

여기 2개의 문자열이 있다. 이 2개의 문자열을 비교해서 부분수열 중 가장 긴 공통 수열은 무엇일까?

사람이 봤을 때는 좀 살펴보긴 해야겠지만 이 문제에서는 `ACAK` 가 가장 긴 문자임을 알 수 있다.

하지만 두 문자열의 길이가 매우 길다면? 이걸 어떻게 알 수 있을까?

**당연히 일일히 노가다로 완전탐색 해서 가장 긴 길이가 무엇인지 알아봐야한다.**

그렇지 않고서야 어떤 문자가 어디에 나올지 알고 가장 긴 문자열을 알아낼 수 있곘는가?

일단 노가다를 해보자!

|경우의 수|공통 숫자 갯수|
|------|------|
|[C, A]| 0|
|[C, AC]|1|
|[C, ACA]|1|
|[C, ACAY]|1|
|[C, ACAYK]|1|
|[C, ACAYKP]|1|
|   |   |
|[CA, A]|1|
|[CA, AC]|1|
|[CA, ACA]|2|
|[CA, ACAY]|2|
|[CA, ACAYK]|2|
|[CA, ACAYKP]|2|
|   |   |
|[CAP, A]|1|
|[CAP, AC]|1|
|[CAP, ACA]|2|
|[CAP, ACAY]|2|
|[CAP, ACAYK]|2|
|[CAP, ACAYKP]|3|
|   |   |
|[CAPC, A]|1|
|[CAPC, AC]|2|
|[CAPC, ACA]|2|
|[CAPC, ACAY]|2|
|[CAPC, ACAYK]|2|
|[CAPC, ACAYKP]|3|
|   |   |
|[CAPCA, A]|1|
|[CAPCA, AC]|2|
|[CAPCA, ACA]|3|
|[CAPCA, ACAY]|3|
|[CAPCA, ACAYK]|3|
|[CAPCA, ACAYKP]|3|
|   |   |
|[CAPCAK, A]|1|
|[CAPCAK, AC]|2|
|[CAPCAK, ACA]|3|
|[CAPCAK, ACAY]|3|
|[CAPCAK, ACAYK]|4|
|[CAPCAK, ACAYKP]|4|

이렇게 총 36가지의 경우의 수가 있네요. 일단 표로 봅시다.

<img width="450" alt="스크린샷 2022-11-28 오후 2 01 55" src="https://user-images.githubusercontent.com/87749134/204197919-d9aa9aa2-1a38-414f-89ce-eb00c344e547.png">

위에 그림은 해당 경우의 수를 표로 정리한 것입니다. 2차원 배열에 두 문자열을 매칭하는데 편의상 배열의 일부 부분에 마진값 0을 설정합니다.   

자 하나하나 뜯어보자.

위의 표에서 C 와 A (1,1)를 보세요. 공통되는게 있나요? 없습니다. 따라서 0을 할당합니다.

그 다음 C 와 AC (1,2)를 보세요. 공통되는게 있나요? C 하나가 보이네요 1을 할당합니다.

그 다음 C 와 ACA (1,3)를 보세요. 역시나 C가 공통됩니다. 1을 할당합니다. 그 다음에 ACAY를 볼 필요가 있을까요? 없습니다. 그대로 쭉 1이 할당됩니다.


다음 행을 봅시다.

CA 와 A (2,1)를 보세요. A가 공통됩니다. 1을 할당합니다.

CA 와 AC (2,2)를 보세요. A가 공통되나요 C가 공통되나요? 둘 다 공통됩니다. 가장 긴 공통 수열을 만들어야하는 AC 입장에서 CA를 바라볼 때는 A를 우선 선택해야 다음에 C를 고를 수가 있게되어 A가 우선 공통되고, CA입장에서 AC를 바라볼 때는 C가 우선 공통됩니다. **즉 가장 끝 두 알파벳이 다를 경우 2가지의 경우의 수가 있다는 걸 알 수 있습니다.**

<img width="450" alt="스크린샷 2022-11-28 오후 2 29 09" src="https://user-images.githubusercontent.com/87749134/204200933-42a787d1-a039-4ee3-90ba-4b6f564ba152.png">

**즉 알파벳이 다를 경우에는 해당 위치의 위, 왼쪽을 비교해서 큰 값으로 원하는 위치를 채워주면 됩니다.**

자 다른 예시로 살펴보죠.

CAP 와 AC (3,2) 를 보세요. 여기서 공통된 부분 수열은 무엇일까요? CAP 입장에서 AC를 보면 C가 우선 공통됩니다. 하지만 반대로 AC 입장에서 CAP를 보면? A가 공통됩니다. 둘 다 1개씩 공통되네요. 1을 할당합니다.

<img width="450" alt="스크린샷 2022-11-28 오후 2 34 13" src="https://user-images.githubusercontent.com/87749134/204201574-119c2d0e-a1c7-483f-80a8-7bf59412c469.png">

🌟 정리하면 과거의 값을 저장해 두고 나중에 필요할 때 찾아서 연산하는 것으로 보면 되겠네요. **DP (dynamic-programming)**입니다.

거의 다 알고리즘이 정리되었습니다. 하지만 하나를 더 살펴봐야하죠

우리는 두 알파벳이 다를 경우에 위, 왼쪽을 비교해서 큰 값으로 할당하면 됩니다.

허지만 두 알파벳이 같다면?

예시를 보죠.

<img width="450" alt="스크린샷 2022-11-28 오후 2 38 20" src="https://user-images.githubusercontent.com/87749134/204202095-8bb6c7c5-720f-4d95-b1f7-508bd70dfa1b.png">

(3,4) 의 CA 와 ACA를 보세요. 공통 부분 수열은 무엇일까요? CA 입장에서 ACA를 보면 CA 2개네요. 하지만 ACA입장에서 CA를 보면 A 하나만 존재합니다. 그런데 이렇게 2번 연산 할 필요가 있을까요?

아닙니다.

CA와 ACA는 결국 C와 AC의 값에 1을 더한 것과 같습니다.

**즉 두 문자가 같다면 대각선 위의 값에 1을 더해주면 됩니다.**  

### 정리

1. 문자열A, 문자열B의 한글자씩 비교해봅니다.

2. 두 문자가 다르다면 LCS\[i - 1][j]와 LCS\[i][j - 1] 중에 큰값을 표시합니다.

3. 두 문자가 같다면 LCS\[i - 1][j - 1] 값을 찾아 +1 합니다.

4. 위 과정을 반복합니다.

```javascript
// LCS 길이 구하기 구현체
// 구현상의 편의를 위해 string 앞에 - 를 붙인다. 
const solution = (A, B) => {
  const LCS = Array(A.length + 1).fill(null).map(el => new Array(B.length + 1));
  const string_A = `-${A}`;
  const string_B = `-${B}`;

  for(let j=0; j<=B.length; j++) {

    for(let i=0; i<=A.length; i++) {

      if(i === 0 || j === 0) {
        LCS[i][j] = 0;
      }

      else if(string_A[i] === string_B[j]) {
        LCS[i][j] = LCS[i - 1][j - 1] + 1;
      }

      else {
        LCS[i][j] = Math.max(LCS[i - 1][j], LCS[i][j - 1]);
      }
    }
  }

  return LCS
}
```

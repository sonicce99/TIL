<h1>Git fork 와 clone의 차이점</h1>

<h2>fork</h2>

fork는 다른 사람의 Github repository에서 내가 어떤 부분을 수정하거나 추가 기능을 넣고 싶을 때 해당 respository를 내 Github repository로 그대로 복제하는 기능이다. fork한 저장소는 원본(다른 사람의 github repository)와 연결되어 있다. 여기서 연결 되어 있다는 의미는 original repository에 어떤 변화가 생기면(새로운 commit) 이는 그대로 forked된 repository로 반영할 수 있다. 이 때 fetch나 rebase의 과정이 필요하다.

<img width="500" alt="스크린샷 2021-09-09 오전 12 02 44" src="https://user-images.githubusercontent.com/87749134/132534644-4713983a-9323-4fe9-b4e9-dfba5af0148f.png">

그 후 original repository에 변경 사항을 적용하고 싶으면 해당 저장소에 pull request를 해야한다. pull request가 original repository의 관리자로 부터 승인 되었으면 내가 만든 코드가 commit, merge되어 original 에 반영된다. pull request 하기 전까지는 내 github에 있는 forked repository에만 change가 적용된다.

```
  즉 Repository에 권한이 없는 사용자가 저장소를 fork하고 fork한 자신의 저장소에 변경 사항을 적용한 후 Push한다. 이 후 원래 저장소(original repository)에 내 저장소에 있는 브랜치를 Pull Request 한다. 내가 만든 코드가 ㅇㅋ되면 해당 저장소에 Merge 된다.
```



<h2>clone</h2>

clone은 특정 repository를 내 local machine에 복사하여 새로운 저장소를 만든다. clone한 원본 repository를 remote 저장소 origin으로 가지고 있다. 권한이 없는 경우 해당 저장소로 push 하지 못한다.

또한 기존의 제일 처음 original repository와 연결되지 못한다. 즉 저장소의 commit, 등의 로그를 보지 못함


https://velog.io/@imacoolgirlyo/Git-fork%EC%99%80-clone-%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90-5sjuhwfzgp



***

<h2>Fork 하고 clone 하는 순서</h2>

1. 포크를 한다.

2. Fork한 repository를 내 컴퓨터에 clone 하기

 - $git clone https://github.com/나의_clone한/repository_주소.git

 clone이 성공적으로 완료되면, 디렉토리 아래에 Repository의 이름을 한 폴더가 생겨나며, 그 아래에 repository의 내용이 담겨 있습니다.



3. Remote repository를 확인하기
- $git remote -v



지금은 fork한 repository만 목록에 뜨는 것을 확인할 수 있습니다.
우리가 fork해 온 원본 저장소를 remote repository 목록에 추가하도록 합시다.
추가한 후에 다시 한번 remote repository 목록을 출력해 보면, 아래와 같이 원본 repository가 upstream으로 추가된 것을 확인할 수 있습니다.

upstream으로 추가된 원본 repository가 보이시나요?
위 과정은 최초 1회에 한해 해 주시면 되고, 이후부터 설정된 repository를 최신 상태로 가져오고자 할 때에는 3번부터 진행해 주시면 됩니다.

4. 원본 repository fetch, merge, 이후 fork repository로 push

- $git fetch upstream
- $git merge upstream/master
- $git push

위 세 명령어들은 차례로

원본 repository의 정보를 fetch, 즉 가져오고,
원본 repository의 정보를 합치며,
이를 fork repository로 push합니다.
fetch, merge를 한 번에 수행할 수 있는 명령어 pull도 존재합니다. pull은 fetch를 수행한 이후 즉시 merge하므로 충돌이 일어날 수 있지만, fetch는 바로 변경사항을 반영하지 않으므로 충돌에 대하여 상대적으로 안전합니다. 충돌이 발생할 경우, 충돌을 해결해 주고 다시 commit해 주면 됩니다.



5. 최신 내용이 잘 가져와졌는지 확인하기

push가 잘 되었다면, GitHub 상에서 repository가 최신 상태로 업데이트 되었는지 확인해 봅니다.



출처: https://katfun.tistory.com/entry/git-Fork한-Repository-최신-내용-가져오기 [카펀 코딩 블로그]

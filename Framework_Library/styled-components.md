# styled-component

공식자료 : https://styled-components.com/docs/basics#getting-started

```
npm install styled-components
```

↓ vscode 에서 css 자동완성해주는 Extension 설치

```
vscode-styled-components
```

***

### 기본 사용  

```javascript
import styled from "styled-components";

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const StyledComponentExample = () => {
  // Use Title and Wrapper like any other React component – except they're styled!
  return(
    <Wrapper>
      <Title>
        Hello World!
      </Title>
    </Wrapper>
  );  
}
```

Component 안에 css가 같이 들어가 있음.

### Props 사용  

🌟 props에 따라 다른 색상을 적용할 수 있음.   

```javascript
import styled from "styled-components";

const Button = styled.button`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const StyledComponentExample = () => {

  return(
    <div>
      <Button>Normal</Button>
      <Button primary>Primary</Button>
    </div>
  );
}
```

### 상속  

🌟 style 조차조 상속 할 수 있음.

```javascript
import styled from "styled-components";

// The Button from the last section without the interpolations
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

const StyledComponentExample = () => {

  return(
    <div>
      <Button>Normal Button</Button>
      <TomatoButton>Tomato Button</TomatoButton>
    </div>
  );
}
```

### a 태그  

```javascript
import styled from "styled-components";

const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

const StyledComponentExample = () => {

  return(
    <div>
      <Button>Normal Button</Button>
      <Button as="a" href="#">Link with Button styles</Button>
      <TomatoButton as="a" href="#">Link with Tomato Button styles</TomatoButton>
    </div>
  );
}
```

### 다양한 기능  

as에는 native tags 뿐만 아니라 우리가 원하는 태그 무엇이든지 확장할 수 있다.

```javascript
import styled from "styled-components";

const StyledComponentExample = () => {
  const Button = styled.button`
    display: inline-block;
    color: palevioletred;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
    display: block;
  `;

  const ReversedButton = props => <Button {...props} children={props.children.split('').reverse()} />

  return(
    <div>
      <Button>Normal Button</Button>
      <Button as={ReversedButton}>Custom Button with Normal Button styles</Button>
    </div>
  );
}
```

```javascript
const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.size || "1em",
}))`
  border: 2px solid palevioletred;
  margin: ${props => props.size};
  padding: ${props => props.size};
`;

// Input's attrs will be applied first, and then this attrs obj
const PasswordInput = styled(Input).attrs({
  type: "password",
})`
  // similarly, border will override Input's border
  border: 2px solid aqua;
`;

render(
  <div>
    <Input placeholder="A bigger text input" size="2em" />
    <br />
    {/* Notice we can still use the size attr from Input */}
    <PasswordInput placeholder="A bigger password input" size="2em" />
  </div>
);
```

### 애니매이션 사용  

```javascript
import styled, {keyframes} from "styled-components";

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

render(
  <Rotate>💅🏾</Rotate>
);
```

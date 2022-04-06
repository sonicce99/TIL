# Formik

## What is Formik?

- Formik is a small group of React components and hooks for building forms in React and React Native.

## Formik의 장점

- Getting values in and out of form state

- Validation and error messages

- Handling form submission

위의 모든 장점을 한 곳에 모음으로써, Formik은 테스트, 리팩토링 및 양식에 대한 추론을 쉽게 구성할 수 있도록 합니다.

## Installation

```bash
npm install formik --save
```

```bash
yarn add formik
```

## 간단 사용법  

### A simple newsletter signup form  

여러 input 마다 모두 useState로 관리하면 너무 state도 많고 힘들다. 하지만 Formik을 사용하면 useFormik을 사용하여 모든 데이터를 쉽게 관리 할 수 있다.  

```javascript
import React from 'react';
import { useFormik } from 'formik';

const SignupForm = () => {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```

initialValues와 onSubmit 함수를 useFormik 에 넣어두면 이 hook은 formik이라고 하는 녀석을 반환합니다.
여기서 중요하게 보는 것은 다음 3가지 입니다.

- handleSubmit

- handleChange

- values  

***

## Validation (유효성 검사)  

↓ 대충 이런 느낌..

<img src="https://user-images.githubusercontent.com/87749134/161918271-9c09a718-5c34-4ee7-b3e2-28038009ef10.png" alt="이미지" width="400px" />

- ex) 비밀번호 10자리를 입력하라고 했는데 8자리만 입력하면 빨간색 알림 떠서 경고를 보냄.  

만약 브라우저에 내장된 HTML input validation을 사용한다면 우리는 몇가지 props를 필요로한다. (예를 들어 ```maxlength``` and ```minlength```) 하지만 제약이 많다.

1. Only 브라우저에서만 사용 가능하다. (React Native에서는 사용 불가)  

2. custom error messages 를 유저에게 보여 줄 수 없다.  

let’s specify a custom validation function and pass it as validate to the useFormik() hook.
If an error exists, this custom validation function should produce an ```error object``` with a matching shape to our values/initialValues.

사용자가 아직 input을 클릭도 안했는데 유효성 검사를 하고 error를 보여주는건 사용자 경험에 좋지 않다. 확실히 사용자가 해당 input을 클릭하고 부적절한 내용을 입력했을 때 error을 출력해야한다. 이때 ```touched``` 했는지 안했는지를 판단해야 하고 ```touched```를 사용한다. 값은 ```true``` / ```false```이다.

```javascript
import React from 'react';
import { useFormik } from 'formik';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const SignupForm = () => {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );

};
```

## Yup

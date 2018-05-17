# React 주소록에 리덕스 기능을 추가해보기 

https://velopert.com/3360 

### redux의 bindActionCreator 사용하기
bindActionCreator사용하면 액션함수를 모두 자동으로 설정해줍니다.
지금의 경우에 base에 있는 모든 액션함수를 불러와서 이를 dispatch하는 함수를 만들어서 props로BaseActions라는 객체안에 넣어서 전달해주었습니다.
액션이 많아지면 bindActionCreator가 유용하게 사용된다. 

```javascript
  // bindActionCreator 사용 안했을때 mapDispatchToProps 함수 
  (dispatch) => ({
    BaseActions: {
      setView: (payload) => dispatch(baseActions.setView(payload)),
      changeSearch: (payload) => dispatch(baseActions.changeSearch(payload))
    }
  })

  // bindActionCreator 사용한 mapDispatchToProps 함수 
  (dispatch) => ({
    // bindActionCreators는 액션함수들을 자동으로 바인딩해줍니다.
    BaseActions : bindActionCreators(baseActions, dispatch)
  })
  
```
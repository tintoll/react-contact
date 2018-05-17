import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as baseActions from '../modules/base';
import ViewSelector from "../components/ViewSelector";

class ViewSelectorContainer extends Component {

  handleSelect = (view) => {
    const { BaseActions } = this.props;
    BaseActions.setView(view);
  }
  render(){
    const { view } = this.props;
    const { handleSelect } = this;
    return(
      <ViewSelector selected={view} onSelect={handleSelect} />
    );
  }
}
/* 기본적인 mapDispatchToProps 사용법 
const mapDispatchToProps = (dispatch) => ({
  handleSelect: (view) => dispatch(baseActions.setView(view))
})
*/

export default connect(
  (state) => ({
    view : state.base.get('view')
  }),
  (dispatch) => ({
    // bindActionCreators는 액션함수들을 자동으로 바인딩해줍니다.
    BaseActions : bindActionCreators(baseActions, dispatch)
  })
  /*
  bindActionCreator사용하면 액션함수를 모두 자동으로 설정해줍니다.
  지금의 경우에 base에 있는 모든 액션함수를 불러와서 이를 dispatch하는 함수를 만들어서 props로
  BaseActions라는 객체안에 넣어서 전달해주었습니다.
  액션이 많아지면 bindActionCreator가 유용하게 사용된다. 
  (dispatch) => ({
    BaseActions: {
      setView: (payload) => dispatch(baseActions.setView(payload)),
      changeSearch: (payload) => dispatch(baseActions.changeSearch(payload))
    }
  })
  */
)(ViewSelectorContainer);
import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import { connect } from 'react-redux';
import ViewSelectorContainer from './containers/ViewSelectorContainer';
import InputContainer from './containers/InputContainer';
import FavoriteListContainer from './containers/FavoriteListContainer';
import FloatingButtonContainer from './containers/FloatingButtonContainer';
import ContactModalContainer from './containers/ContactModalContainer';
import ContactListContainer from './containers/ContactListContainer';

class App extends Component {
  

  render() {
    const { 
      view
    } = this.props;

    return (
      <div>
        <Header />
        <ViewSelectorContainer />
        
        {/* view 값에 따라 다른 컨테이너를 보여준다. */}
        <Container visible={view === 'favorite'}>
          <FavoriteListContainer />
        </Container>
        <Container visible={view === 'list'}>
          <InputContainer />
          <ContactListContainer />
        </Container>

        <ContactModalContainer />
        <FloatingButtonContainer />
      </div>
    );
  }
}

/*
주의 하실 점은, 애로우 함수를 작성 할 때, 화살표 다음 {}
객체를() 괄호로 감싸야 한다는 점 입니다.만약에 => ({ ...}) 이 아닌 => {}
으로 하시면, 객체가 생성되는것이 아니라 코드블록이 생기므로 오류가 발생합니다.
*/
export default connect(
  (state) => ({
    view : state.base.get('view')
  })
)(App);

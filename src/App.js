import React, { Component } from 'react';
import Header from './components/Header';
import Container from './components/Container';
import ViewSelector from './components/ViewSelector';

class App extends Component {
  state = {
    view : 'favorite'
  }
  // view 선택 메소드 정의
  handleSelectView = (view) => this.setState({view});

  render() {
    const { handleSelectView } = this;
    const { view } = this.state;

    return (
      <div>
        <Header />
        <ViewSelector onSelect={handleSelectView} selected={view} />
        
        {/* view 값에 따라 다른 컨테이너를 보여준다. */}
        <Container visible={view === 'favorite'}>즐겨찾기</Container>
        <Container visible={view === 'list'}>리스트</Container>
      </div>
    );
  }
}

export default App;

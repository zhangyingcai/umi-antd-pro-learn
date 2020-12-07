import React from 'react';

class Page extends React.Component {
  state = {
    page: 1,
  };

  // eslint-disable-next-line
  // componentWillMount() {
  //     // this.setState({ page: this.state.page + 1 })
  //     this.state.page = 2;
  //     console.log('我更想了');
  // }

  render() {
    const { page } = this.state;
    return <React.Fragment>{page}</React.Fragment>;
  }
}

export default Page;

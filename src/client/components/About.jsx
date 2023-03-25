import React, { Component } from 'react';
import defaultlogo from './public/image/deafultprofileimg.jpg';
import Editable from './Editable';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'insert name',
      bio: 'add bio here',
      image: defaultlogo
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  }

  handleBioChange = (e) => {
    this.setState({ bio: e.target.value });
  }

  handleImageChange = (e) => {
    const file = e.target.files[0];
    this.setState({ image: URL.createObjectURL(file) });
  }

  render() {
    return (
      <section id="container-about" className="container-about">
        <img src={this.state.image} width="180" height="180" alt="abtimg" />
        <input type="file" onChange={this.handleImageChange} />

        <div className="entername">
        <Editable
          text={this.state.name}
          placeholder="Enter name"
          type="input"
        >
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </Editable>
        </div>

        <Editable
          text={this.state.bio}
          placeholder="Enter bio"
          type="textarea"
        >
          <textarea
            value={this.state.bio}
            onChange={this.handleBioChange}
          />
        </Editable>
      </section>
    );
  }
}

export default About;

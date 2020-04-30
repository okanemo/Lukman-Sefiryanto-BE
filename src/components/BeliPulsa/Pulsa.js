import React, { Component } from 'react';
var md5 = require('md5');
class Pulsa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
    console.log('ini state', this.state);
  }
  onSubmit = async () => {
    // var path = 'https://testprepaid.mobilepulsa.net/v1/legacy/index';
    // var usernameTxt = '082322377542';
    // var passwordTxt = '7295e8d80dcbf769';
    // var signTxt = md5(usernameTxt + passwordTxt + 'bl');zz
    // var number = this.state.phone;

    // var doc =
    //   `{
    //     "commands" : "balance",
    //     "username" : "` +
    //   number +
    //   `",
    //     "sign"     : "` +
    //   signTxt +
    //   `"
    // }`;

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', path, true);
    // xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    // xhr.onload = function () {
    //   if (xhr.readyState == 4 && xhr.status == '200') {
    //     // var data =xhr.responseText);
    //     var json = JSON.parse(xhr.responseText);
    //     var doc = (document.getElementById('data').innerHTML =
    //       json.data.balance);
    //     console.log(doc);
    //   } else {
    //     console.error(xhr.responseText);
    //   }
    // };
    // xhr.send(doc);
    var path = 'https://testprepaid.mobilepulsa.net/v1/legacy/index';
    var usernameTxt = '082322377542';
    var passwordTxt = '7295e8d80dcbf769';
    var signTxt = md5(usernameTxt + passwordTxt + 'bl');

    var doc =
      `{
        "commands" : "balance",
        "username" : "082322377542",
        "sign"     : "` +
      signTxt +
      `"
    }`;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', path, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onload = function () {
      if (xhr.readyState == 4 && xhr.status == '200') {
        document.getElementById('data').innerHTML = xhr.responseText;
      } else {
        console.error(xhr.responseText);
      }
    };
    xhr.send(doc);
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  render() {
    return (
      <div>
        <form>
          <p>
            Suggestions: <span id='data'></span>
          </p>
          <input
            type='text'
            placeholder='Enter phone'
            name='phone'
            onChange={this.onChange}
          />{' '}
          <button type='submit' onSubmit={this.onSubmit()}>
            click
          </button>
        </form>
      </div>
    );
  }
}
export default Pulsa;

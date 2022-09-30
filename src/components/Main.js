import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h1 className="d-4">Welcome To EtherGram</h1>
              <h2>Share Image</h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                // THIS PASS THE DESCRIPTION TO THE FUNCTION uploadImage() in App.js
                this.props.uploadImage(description)
              }} >
                {/* Image Input HERE */}
                <input type='file' accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={this.props.captureFile} />
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="Image description..."
                        required />
                  </div>
                <button type="submit" class="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>
                {/* Code ... */}
                
              <p>&nbsp;</p>
                
                {/* Code ... */}

            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
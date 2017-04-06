import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

class Embedly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provider_url: '',
      description: '',
      title: '',
      thumbnail_width: 1,
      url: '',
      thumbnail_url: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
      version: '',
      provider_name: '',
      type: '',
      thumbnail_height: 1
    };
  }

  componentWillMount() {
    let params = {
      url: this.props.url,
      key: this.props.apiKey
    };

    request.get(this.props.apiUrl)
         .query(params)
         .end((err, res) => {
            if (res.body.constructor === Array) {
              const result = res.body[0];

              if (result.images.length) {
                result.thumbnail_url = result.images[0].url;
              }

              this.setState(result);
            } else {
              this.setState(res.body);
            }
         });
  }

  render() {
    const linkStyle = Object.assign({
      color: '#222',
      textDecoration: 'none',
      position: 'relative',
      border: 'solid 1px #E1E8ED',
      display: 'block',
      borderRadius: '5px',
      overflow: 'hidden'
    }, this.props.linkStyle);

    const imageContainerStyle = Object.assign({
      width: '80px',
      height: '80px',
      overflow: 'hidden',
      position: 'absolute',
      left: 0,
      top: 0
    }, this.props.imageContainerStyle);

    const imageStyle = Object.assign({
      height: '100%',
      width: 'auto',
      transform: 'translateX(-50%)',
      position: 'relative',
      left: '50%'
    }, this.props.imageStyle);

    const textStyle = Object.assign({
      marginLeft: '85px',
      minHeight: '80px',
      padding: '5px',
      boxSizing: 'border-box'
    }, this.props.textStyle);

    const titleStyle = Object.assign({
      margin: 0,
      fontSize: '15px',
      fontWeight: 'bold'
    }, this.props.titleStyle);

    const descStyle = Object.assign({
      margin: '5px 0 0',
      fontSize: '11px'
    }, this.props.descStyle);

    const providerStyle = Object.assign({
      margin: '5px 0 0',
      fontSize: '11px'
    }, this.props.providerStyle);

    return (
      <a className="embedly" href={this.state.url} style={linkStyle}>
        <div className="embedly__image" style={imageContainerStyle}>
          <img src={this.state.thumbnail_url} alt={this.state.title} style={imageStyle}/>
        </div>
        <div className="embedly__text" style={textStyle}>
          <p className="embedly__title" style={titleStyle}>{this.state.title}</p>
          <p className="embedly__desc" style={descStyle}>{this.state.description}</p>
          <p className="embedly__provider" style={providerStyle}>{this.state.provider_url}</p>
        </div>
      </a>
    );
  }
}

Embedly.propTypes = {
    linkStyle: React.PropTypes.object,
    imageContainerStyle: React.PropTypes.object,
    imageStyle: React.PropTypes.object,
    textStyle: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    descStyle: React.PropTypes.object,
    providerStyle: React.PropTypes.object,
    url: React.PropTypes.string.isRequired,
    apiKey: React.PropTypes.string.isRequired,
    apiUrl: React.PropTypes.string.isRequired
};

Embedly.defaultProps = {
  apiUrl: 'https://api-cdn.embed.ly/1/card-details';
};


export default Embedly;

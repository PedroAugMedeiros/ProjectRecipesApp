import React from 'react';
import Image from 'react-bootstrap/Image';
import pageNotFoundImage from '../images/pageNotFound.svg';

function PageNotFound() {
  return (
    <div>
      <p style={ { color: 'white' } }>Not Found</p>
      <Image src={ pageNotFoundImage } style={ { width: '22.5rem' } } />
    </div>
  );
}

export default PageNotFound;

import * as React from 'react';
import { Container, Image } from 'semantic-ui-react';

import logo from '../../assets/images/logo_white.png';

/**
 * Header component placed on top of page. Contains application logo.
 */
export const Header: React.StatelessComponent = () => {
  return (
    <div className="pl-header-container">
      <Container className="pl-header">
        <Image
          src={logo}
          alt={'Premier League'}
          height={80}
          className="pl-logo"
        />
      </Container>
    </div>
  );
};

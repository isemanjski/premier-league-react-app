import * as React from 'react';
import { Container, Image } from 'semantic-ui-react';

const Header: React.StatelessComponent = () => {
  return (
    <div className="pl-header-container">
      <Container className="pl-header">
        <Image
          src={process.env.PUBLIC_URL + '/assets/logo_white_80.png'}
          alt={'Premier League'}
          height={80}
          className="pl-logo"
        />
      </Container>
    </div>
  );
};

export default Header;

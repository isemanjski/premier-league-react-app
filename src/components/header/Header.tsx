import * as React from 'react';
import { Image, Container, Menu } from 'semantic-ui-react';

interface Props {
  active?: string;
}

const Header: React.StatelessComponent<Props> = (props: Props) => {
  const isActive = (menuItem: string): boolean => {
    return props.active === menuItem;
  };

  return (
    <div className="pl-header-container">
      <Container className="pl-header">

        <Image
          src={process.env.PUBLIC_URL + '/assets/logo_white_119_50.png'}
          alt={'Premier League'}
          height={50}
          className="pl-logo"
        />

        <Menu inverted={true} pointing={true} secondary={true} size="large" className="pl-header-menu">
          <Menu.Item as="a" active={isActive('home')} className="pl-menu-item">Home</Menu.Item>
          <Menu.Item as="a" active={isActive('work')} className="pl-menu-item">Work</Menu.Item>
          <Menu.Item as="a" className="pl-menu-item">Company</Menu.Item>
          <Menu.Item as="a" className="pl-menu-item">Careers</Menu.Item>
        </Menu>
      </Container>
    </div>
  );
};

export default Header;

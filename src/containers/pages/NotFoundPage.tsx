import * as React from 'react';
import { Container, Header, Image } from 'semantic-ui-react';

import logo from '../../assets/images/logo_head_darker.png';

export interface Props {
  text: string;
}

/**
 * Component which represents "404 Not Found" page.
 */
export const NotFoundPage: React.StatelessComponent<Props> = (props: Props) => {
  let { text } = props;

  if (!text) {
    text = '404 Not Found';
  }

  return (
    <div className="pl-not-found-page">
      <Container>
        <div>
          <Image
            src={logo}
            alt={'Not Found'}
            height={250}
          />
        </div>
        <div>
          <Header as="h1">{text}</Header>
        </div>
      </Container>
    </div>
  );
};

import * as React from 'react';
import { hasChildren } from '../../utils/helpers';

interface Props {
  fullText?: string;
  shortText?: string;
  className: string;
  children?: React.ReactNode;
}

/**
 * Component which renders table header - used to better handle responsive behaviour of table - showing/hiding
 * columns at certain breakpoints.
 */
export const StandingsTableHeader: React.StatelessComponent<Props> = (props: Props) => {
  const { fullText, shortText, className, children } = props;

  const content = (
    <div className="d-inline-block">
      <div className="d-block d-sm-none">{fullText}</div>
      {!shortText && <div className="d-none d-sm-block">{fullText}</div>}
      {shortText && <abbr className="d-none d-sm-block" title={fullText}>{shortText}</abbr>}
    </div>
  );

  const childrenDefined = hasChildren(children);

  return (
    <th className={className}>
      {children}
      {!childrenDefined && content}
    </th>
  );
};

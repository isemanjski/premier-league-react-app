import * as React from 'react';
import { Standing } from '../../api/models';
import { POINTS_FOR_DRAW, POINTS_FOR_WINNING } from '../../constants/constants';

interface Props {
  standing: Standing;
}

const FORM_WIN = 'W';
const FORM_LOSS = 'L';
const FORM_DRAW = 'D';

const TeamForm: React.StatelessComponent<Props> = (props: Props) => {
  const team = props.standing.team;
  const last5Matches = props.standing.playedMatches.slice(-5);

  const getFormFromPoints = (points: number): string => {
    switch (points) {
      case POINTS_FOR_WINNING:
        return FORM_WIN;
      case POINTS_FOR_DRAW:
        return FORM_DRAW;
      default:
        return FORM_LOSS;
    }
  };

  const formTrends: string[] = last5Matches.map(match => {
    if (match.homeTeam.id === team.id) {
      return getFormFromPoints(match.homeTeamPoints);
    } else {
      return getFormFromPoints(match.awayTeamPoints);
    }
  });

  return (
    <div>
      {formTrends.map((formTrend: string, index: number) => (
        <span key={index} style={{ width: '30px', textAlign: 'center', display: 'inline-block' }}>{formTrend}</span>
      ))}
    </div>
  );
};

export default TeamForm;

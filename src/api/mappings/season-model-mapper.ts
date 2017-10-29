import { Season } from '../models/season.model';
import { Round } from '../models/round.model';
import { Match } from '../models/match.model';

// tslint:disable:no-any
/**
 * Helper function which maps data received from server to model classes used in application.
 *
 * Example of data:
 * <code>
 * {
 *   "round": 1,
 *   "matches": [
 *      {
 *        "Hull City": 2,
 *        "Leicester City": 1
 *      },
 *      {
 *       "Burnley": 0,
 *       "Swansea": 1
 *      },
 *  ...
 * </code>
 *
 * @param {any} data - Data from server
 * @returns {Season} Model object with mapped data
 */
export const mapSeasonDataToModel = (data: any): Season => {
  let matchesByRound: Round[] = [];

  if (data) {
    data.forEach((roundData: any) => {
      const round: number = roundData.round;
      const matches: Match[] = [];

      if (roundData.matches) {
        roundData.matches.forEach((matchData: any) => {
          // Match participants are actually map keys and their goal score is corresponding map value
          const matchParticipants = Object.keys(matchData);

          matches.push(new Match({
            homeTeamName: matchParticipants[0],
            homeTeamGoals: matchData[matchParticipants[0]],
            awayTeamName: matchParticipants[1],
            awayTeamGoals: matchData[matchParticipants[1]]
          }));
        });
      }

      matchesByRound.push(new Round({ round, matches }));
    });
  }

  return new Season({ matchesByRound: matchesByRound });
};

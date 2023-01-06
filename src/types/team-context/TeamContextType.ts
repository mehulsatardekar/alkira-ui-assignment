type TeamsType = {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
};

type GamesType = {
  id: number;
  date: string;
  home_team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: string;
  time: string;
  visitor_team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
  visitor_team_score: number;
};

type modifierInitialStateType = {
  isLoading: boolean;
  currentPage: number;
  teamsPerPage: number;
  query: string;
  sort: boolean;
};

type ModifierActionType =
  | { type: "LOADING"; payload: boolean }
  | { type: "SEARCH_QUERY"; payload: string }
  | { type: "SORT"; payload: boolean }
  | { type: "CURRENT_PAGE"; payload: number }
  | { type: "TEAMS_PER_PAGE"; payload: number };

type TeamContextType = {
  teams: TeamsType[];
  games: GamesType[];
  modifierState: modifierInitialStateType;
  dispatchModifiers: React.Dispatch<ModifierActionType>;
  currentPageTeams: TeamsType[];
  searchedData: TeamsType[];
  isSelectedCell: boolean;
  setIsSelectedCell: React.Dispatch<React.SetStateAction<boolean>>;
  seletedTeam: GamesType | undefined;
  gotoNextPage: (pagenumber: number) => void;
  setSelectedTeamID: React.Dispatch<React.SetStateAction<number | null>>;
  selectedTeamID: number | null;
};

type TeamsListContextType = {
  children: React.ReactNode;
};
export type {
  TeamsType,
  GamesType,
  modifierInitialStateType,
  ModifierActionType,
  TeamContextType,
  TeamsListContextType,
};

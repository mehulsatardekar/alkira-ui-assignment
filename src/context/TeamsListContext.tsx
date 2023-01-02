import React, { useContext, useState, useEffect, useReducer, createContext } from 'react'
import axios from 'axios';
import { TeamsType, GamesType, modifierInitialStateType, TeamContextType, ModifierActionType, TeamsListContextType } from '../types';
import { filterBySearch, sortByTeams } from '../utils';
import { useDebounce } from '../hook';

const TeamsContext = createContext<TeamContextType | null>(null);

const initialModifiers: modifierInitialStateType = {
    isLoading: true,
    currentPage: 1,
    teamsPerPage: 10,
    query: "",
    sort: true,
}

const TeamsListContext = ({ children }: TeamsListContextType) => {

    const [teams, setTeams] = useState<TeamsType[]>([]);
    const [games, setGames] = useState<GamesType[]>([]);

    const reducer = (state: modifierInitialStateType, action: ModifierActionType) => {
        switch (action.type) {
            case "LOADING":
                return { ...state, isLoading: action.payload };
            case "SEARCH_QUERY":
                return { ...state, query: action.payload };
            case "SORT":
                return { ...state, sort: action.payload };
            case "CURRENT_PAGE":
                return { ...state, currentPage: action.payload };
            default:
                return state;
        }
    }


    const [modifierState, dispatchModifiers] = useReducer(reducer, initialModifiers);
    const [isSelectedCell, setIsSelectedCell] = useState(false);
    const [selectedTeamID, setSelectedTeamID] = useState<number | null>(null);
    const [seletedTeam, setSelectedTeam] = useState<GamesType>();

    const { debounceValue } = useDebounce(modifierState.query);

    const sortedDataByTeam = sortByTeams(teams, modifierState.sort);
    const searchedData = filterBySearch(sortedDataByTeam, debounceValue);
    const indexOfLastPost = modifierState.currentPage * modifierState.teamsPerPage;
    const indexOfFirstPost = indexOfLastPost - modifierState.teamsPerPage;
    const currentPageTeams = searchedData.slice(indexOfFirstPost, indexOfLastPost);


    const gotoNextPage = (pagenumber: number) => {
        dispatchModifiers({ type: "CURRENT_PAGE", payload: pagenumber });
    }

    const getTeamsData = async () => {
        try {
            const response = await axios.get('https://www.balldontlie.io/api/v1/teams');
            setTeams(response.data.data);
            dispatchModifiers({ type: "LOADING", payload: false })
        } catch (error) {
            console.error('something bad happen while fetching a teams data')
        }
    }
    const getGamesData = async () => {
        try {
            const response = await axios.get('https://www.balldontlie.io/api/v1/games/');
            setGames(response.data.data);
        } catch (error) {
            console.error('something bad happen while fetching a games data')
        }
    }
    useEffect(() => {
        getTeamsData();
        getGamesData();
    }, []);

    useEffect(() => {
        setSelectedTeam(games.find((game) => game.home_team.id === selectedTeamID));
    }, [selectedTeamID, games]);


    return (
        <TeamsContext.Provider value={{ teams, games, modifierState, dispatchModifiers, currentPageTeams, searchedData, isSelectedCell, setIsSelectedCell, seletedTeam, setSelectedTeamID, selectedTeamID, gotoNextPage }}>
            {children}
        </TeamsContext.Provider>
    )
}

const useTeams = () => useContext(TeamsContext) as TeamContextType

export { TeamsListContext, useTeams }
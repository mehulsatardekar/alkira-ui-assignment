import React from 'react'
import { Table } from 'react-bootstrap';
import { useTeams } from '../../context';
import './teamlist-table.css'
const TeamsListTable = () => {

    const { dispatchModifiers, modifierState, currentPageTeams, isSelectedCell, setSelectedTeamID, selectedTeamID, setIsSelectedCell } = useTeams();
    return (
        <Table responsive hover borderless className="table mt-3">
            <thead className="table-head">
                <tr>
                    <th
                        className="city-col"
                        onClick={() =>
                            dispatchModifiers({ type: "SORT", payload: !modifierState.sort })
                        }
                    >
                        <span title={modifierState.sort ? "sort by asc" : "sort by desc"}>Team Name</span>
                        <span title={modifierState.sort ? "sort by asc" : "sort by desc"}>
                            <svg
                                style={{ transform: `rotate(${modifierState.sort ? 180 : 0}deg)` }}
                                width="12"
                                height="6"
                                viewBox="0 0 18 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.25 9.5L9 0.75L17.75 9.5H0.25Z"
                                    fill="white"
                                />
                            </svg>
                        </span>
                    </th>
                    <th>City</th>
                    <th>Abbreviation</th>
                    <th>Conference</th>
                    <th>Division</th>
                </tr>
            </thead>

            <tbody className="table-body">
                {currentPageTeams?.map((team) => {
                    return (
                        <tr
                            key={team.id}
                            className={`table-row ${team.id === selectedTeamID && isSelectedCell ? "bg-blue" : ""
                                }`}
                            onClick={(e) => {
                                setSelectedTeamID(team.id);
                                setIsSelectedCell(!isSelectedCell);
                            }}
                        >
                            <td>{team.name}</td>
                            <td>{team.city}</td>
                            <td>{team.abbreviation}</td>
                            <td>{team.conference}</td>
                            <td>{team.division}</td>
                        </tr>
                    );
                })}

            </tbody>
        </Table>
    )
}

export { TeamsListTable }
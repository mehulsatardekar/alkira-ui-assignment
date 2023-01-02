import React from 'react'
import Offcanvas from 'react-bootstrap/esm/Offcanvas';
import { useTeams } from '../../context';
import './selectedteam-details.css';

const SelectedTeamDetails = () => {
    const { isSelectedCell, setIsSelectedCell, seletedTeam } = useTeams();
    return (
        <Offcanvas show={isSelectedCell} onHide={setIsSelectedCell} placement={"end"}>
            <Offcanvas.Header closeButton className="offcanvas-header">
                <Offcanvas.Title>{seletedTeam?.home_team?.name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className="details-container">
                    <div className="details-head">
                        <div className="team-row">
                            <p>Team Full Name</p>
                            <p>
                                {seletedTeam
                                    ? seletedTeam?.home_team?.full_name
                                    : "Atlanta Hawks"}
                            </p>
                        </div>
                        <div className="team-row">
                            <p>Total Games in {seletedTeam?.season}</p>
                            <p>{seletedTeam ? seletedTeam?.home_team_score : "88"}</p>
                        </div>
                    </div>
                    <div className="details-body">
                        <h6>Random Game Details:</h6>
                        <div className="details">
                            <div className="details-row">
                                <p>Date</p>
                                <p>
                                    {seletedTeam
                                        ? seletedTeam?.date?.split("T")[0]
                                        : "2019-02-08"}
                                </p>
                            </div>
                            <div className="details-row">
                                <p>Home Team</p>
                                <p>{seletedTeam ? seletedTeam?.home_team?.name : "Hawks"}</p>
                            </div>
                            <div className="details-row">
                                <p>Home Team Score</p>
                                <p>{seletedTeam ? seletedTeam?.home_team_score : "120"}</p>
                            </div>
                            <div className="details-row">
                                <p>Visitor Team</p>
                                <p>
                                    {seletedTeam ? seletedTeam?.visitor_team?.name : "Hornets"}
                                </p>
                            </div>
                            <div className="details-row">
                                <p>Visitor Team Score</p>
                                <p>{seletedTeam ? seletedTeam?.visitor_team_score : "129"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export { SelectedTeamDetails }
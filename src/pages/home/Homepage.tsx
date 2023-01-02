import React from 'react'
import { SearchList, SelectedTeamDetails, TeamsListTable, PaginationList } from '../../components'
import { useTeams } from '../../context'
const Homepage = () => {

    const { modifierState } = useTeams();
    return (
        <div className="container mt-3">
            <h1 className='fw-bold title'>NBA Teams</h1>
            <SearchList />
            {
                modifierState.isLoading ? (
                    <>
                        <div className="d-flex flex-column justify-content-center mt-5 gap-2 align-items-center">
                            <div className='d-flex gap-2'>
                                {
                                    [...new Array(5).fill(5)].map((e,index) =>
                                        <div className="spinner-grow text-primary" role="status" key={index+"-"}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>)
                                }
                            </div>
                            <span>Loading ...</span>
                        </div>
                    </>) : (
                    <TeamsListTable />
                )
            }
            <SelectedTeamDetails/>
            <PaginationList/>
        </div>
    )
}

export { Homepage }
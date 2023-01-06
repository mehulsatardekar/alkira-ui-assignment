import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import { useTeams } from "../../context";
import "./pagination.css";

const PaginationList = () => {
    const { searchedData, gotoNextPage, modifierState, dispatchModifiers } = useTeams();
    const pageNumberList = [];
    for (
        let i = 1;
        i <= Math.ceil(searchedData.length / modifierState.teamsPerPage);
        i++
    ) {
        pageNumberList.push(i);
    }
    return (
        <div className="pagination-container">
            <Pagination size="sm">
                <div className="select-container">
                    <span>Show</span>
                    <select
                        name="page"
                        onClick={(e) => {
                            dispatchModifiers({ type: "CURRENT_PAGE", payload: 1 });
                            dispatchModifiers({ type: "TEAMS_PER_PAGE", payload: Number(e.currentTarget.value) });
                        }}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <span>Entries</span>
                </div>
                {pageNumberList.map((number) => {
                    return (
                        <PageItem
                            key={number}
                            active={number === modifierState.currentPage}
                            onClick={() => {
                                gotoNextPage(number);
                            }}
                        >
                            {number}
                        </PageItem>
                    );
                })}
            </Pagination>
        </div>
    )
}

export { PaginationList }
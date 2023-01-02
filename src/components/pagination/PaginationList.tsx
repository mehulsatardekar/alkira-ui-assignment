import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import { useTeams } from "../../context";
import "./pagination.css";

const PaginationList = () => {
    const { searchedData, gotoNextPage, modifierState } = useTeams();
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
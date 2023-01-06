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

    console.log({ modifierState });
    console.log(PageItem);


    return (
        <div className="pagination-container">
            <Pagination size="sm" className="btn-arrows">
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
                <div>
                    <span
                        className={`${modifierState.currentPage === 1 ? "fade" : "arrow"}`}
                        onClick={() => {
                            dispatchModifiers({
                                type: "CURRENT_PAGE",
                                payload: modifierState.currentPage > 1 ? modifierState.currentPage - 1 : 1,
                            });
                        }}
                    >
                        <span title="go back">{"<"}</span>
                    </span>
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

                <div>
                    <span
                        className={`${modifierState.currentPage === pageNumberList.length ? "fade" : "arrow"}`}
                        onClick={() => {
                            dispatchModifiers({
                                type: "CURRENT_PAGE",
                                payload: modifierState.currentPage < pageNumberList.length ? modifierState.currentPage + 1 : pageNumberList.length,
                            });
                        }}
                    >
                        <span title="go forward">{">"}</span>
                    </span>
                </div>
            </Pagination>
        </div>
    )
}

export { PaginationList }
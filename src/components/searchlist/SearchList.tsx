import { useTeams } from '../../context';
import { ExcelExport } from '../index';
import './SearchList.css';
import { BiSearch } from 'react-icons/bi';

const SearchList = () => {
    const { dispatchModifiers } = useTeams();

    return (
        <div className='main-container'>
            <div className="search-container">
                <BiSearch title='Search team name' />
                <input
                    className="search-input"
                    placeholder="Search By Team Names..."
                    aria-label='Search team names'
                    type="search"
                    onChange={(e) => dispatchModifiers({ type: "SEARCH_QUERY", payload: e.target.value })}
                />
            </div>

            <ExcelExport />
        </div>
    )
}

export { SearchList }
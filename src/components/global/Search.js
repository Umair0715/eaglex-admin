import { debounce } from 'lodash';


const Search = ({ fetcher , timeout = 500 , setSearch }) => {

    const handleInputChange = debounce((event) => {
        const value = event.target.value;
        setSearch(value);
        fetcher(value);
    }, timeout );


    return (
        <div className='flex items-center gap-4 border border-grayText rounded-full sm:py-2 py-1.5 px-4 '>
            <i className="uil uil-search text-grayText"></i>
            <input 
            type="text" 
            placeholder='Search...' 
            className='outline-none border-none'
            onChange={handleInputChange}
            />
        </div>
    )
}

export default Search
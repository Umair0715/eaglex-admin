import './styles.css';
import ReactPaginate from 'react-paginate';
import ArrowLeftSvg from 'assets/svgs/ArrowLeft';
import ArrowRightSvg from 'assets/svgs/ArrowRight';
import { useDispatch } from 'react-redux';

const Pagination = ({ pageCount , setPage , currentPage , redux = true }) => {
    const dispatch = useDispatch();
    const handlePageClick = ({ selected }) => {
        if(redux) {
            dispatch(setPage(selected+1))
        }else {
            setPage(selected + 1)
        }
    }

    return (
        <div className='max-w-full flex py-4 relative bg-[#F5F5F5] px-2'>
            <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowRightSvg />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ArrowLeftSvg />}
            className='flex items-center gap-4 pagination'
            forcePage={currentPage-1}
            />
        </div>
    )
}

export default Pagination
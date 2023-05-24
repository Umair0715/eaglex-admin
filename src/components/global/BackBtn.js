import { useNavigate } from 'react-router-dom';


const BackBtn = () => {
    const navigate = useNavigate();

    return (
        <div>
            <button 
            className="flex items-center gap-1 hover:text-secondary"
            onClick={() => navigate(-1)}
            >
                <i className="uil uil-arrow-left text-lg"></i>
                <span>Back</span>
            </button>
        </div>
    )
}

export default BackBtn
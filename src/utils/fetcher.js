import Axios from "config/api";

const fetcher = (url , user) => {
    return Axios( url , {
        headers : {
            Authorization : `Bearer ${user?.token}`
        }
    });
}

export default fetcher;
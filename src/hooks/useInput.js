import { useState } from 'react';

const useInput = ({ defaultValue }) => {
    const [value , setValue] = useState(defaultValue);

    const reset = () => {
        return setValue(defaultValue)
    }
    const bind = {
        value ,
        onChange : e => setValue(e.target.value)
    }
    
    
    return [value , setValue , bind , reset ]
}

export default useInput;
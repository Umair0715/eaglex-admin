import Select from 'react-select';

const SelectBox = ( { options , setValue , value = '' , label , ...props } ) => {
    
    const handleChange = e => {
        setValue(e.value);      
    }

    const selectedOption = options.find(option => option.value === value);

    return (
        <div className='flex flex-col gap-2 flex-1 w-full '>
            {
                label && 
                <label clclassName='font-semibold text-grayText ' style={{
                    color : 'var(--grayText)',
                    fontWeight : '500'
                }}>
                    {label}
                </label>
            }
            <Select
            options={options}
            className='outline-none w-full'
            inputId='select-box-input'
            onChange={handleChange}
            value={selectedOption}
            {...props}
            />
        </div>
    );
}

export default SelectBox;
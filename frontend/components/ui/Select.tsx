import { ChangeEventHandler } from "react"

interface Option {
    label: string
    value: string | number
}

interface Props  {
    label?: string
    id?: string
    name?: string
    value: string | number
    onChange: ChangeEventHandler<HTMLSelectElement>
    options: Option[]
    placeHolder?: string
    className?: string
}

const Select = ({label, id, name, onChange, options, placeHolder, value, className}:Props) => {

    return (
        <div className="flex flex-col items-start gap-2 ">
            {label && <p className="text-xl">{label}</p>}
            <select 
                id={id} 
                name={name} 
                value={value} 
                onChange={onChange} 
                className={`border border-slate-500 p-2 rounded-lg ${className}`}
            >
                {placeHolder && (
                    <option value="" disabled>
                        {placeHolder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select
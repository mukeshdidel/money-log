import { ChangeEventHandler } from "react"

interface Props  {
    label?: string
    id?: string
    name?: string
    type: string
    onChange: ChangeEventHandler<HTMLInputElement> 
    placeHolder: string
    value: string | number
    className?: string
}

const Input = ({label, id, name, onChange, placeHolder, type, value, className}:Props) => {

    return (
        <div className="flex flex-col items-start gap-2 ">
            <p className="text-xl">{label}</p>
            <input 
                type={type} placeholder={placeHolder} onChange={onChange} value={value} id={id} name={name}
                className={`border p-2 rounded-lg ${className}`} 
            />
        </div>
    )
}

export default Input
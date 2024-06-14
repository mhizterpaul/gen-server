
export type Props = Pick<React.CSSProperties, "backgroundColor" | "color"> & {
    outline ?: boolean,
    text: string,
    image?: string,
    imageAlt?: string    
}


const Button: React.FC<Props> = (props: Props) : JSX.Element =>{
    return (
        <button className = "rounded-lg px-4 py-2 capitalize h-2 w-4 font-semibold text-lg"
        style={{
            backgroundColor: props.backgroundColor||"inherit",
             color: props.color||"inherit", 
             outline: props.outline? "thin solid" : "unset"}}>

            {props.image ? <img className=" rounded-full " 
            src={props.image} 
            alt={props.imageAlt}/> : null}

            {props.text}
            </button>
    )
}

export default Button
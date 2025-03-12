
/* Explicit prop tye required since typescript is used, Interface defines prop types */
interface InputLabelProps {
    type: string;
    value: string;
    name: string;
    valueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
  }
export default function InputLabel(props: InputLabelProps){
    return(
        <>
        <div className="form-floating mt-2">
      <input type={props.type} className="form-control" id="floatingInput" placeholder="name@example.com" 
      name={props.name}
      value={props.value}
      onChange={props.valueChange}/>
      <label htmlFor="floatingInput">{props.label}</label>
    </div>
        </>
    )
}
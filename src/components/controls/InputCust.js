import {TextField} from "@material-ui/core";

const InputCust = (props) => {
    const{name,label,value,variant,error=null,onChange}=props;
  return(
      <TextField
      variant={variant || "outlined"}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && {error:true,helperText:error})}
      
      />
  );
};

export default InputCust;

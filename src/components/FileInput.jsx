import {useRef, useState} from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import ButtonBase from "@material-ui/core/ButtonBase";

const FileInput = ({label, onChange, error}) => {
  const ref = useRef();
  const theme = useTheme();
  const classes = useStyles();
  const [attachment, setAttachment] = useState();

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    const [file] = files;
    setAttachment(file);
    if (!!onChange) onChange({target: {value: file}});
   
  };

  return (
    <Box
      position="relative"
      height={98}
      color={
        !!error ? theme.palette.error.main : theme.palette.background.paper
      }
      borderBottom={4}
    >
      <Box position="absolute" top={0} bottom={0} left={0} right={0} mx={2}>
        <TextField
          className={classes.field}
          InputProps={{disableUnderline: true}}
          margin="normal"
          fullWidth
          disabled
          label={label}
          value={attachment?.name || ""}
          error={!!error}
          helperText={error?.message || " "}
        />
      </Box>
      <ButtonBase
        className={classes.button}
        component="label"
        onKeyDown={(e) => e.keyCode === 32 && ref.current?.click()}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          onChange={handleChange}
        />
      </ButtonBase>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  field: {
    "& .MuiFormLabel-root.Mui-disabled": {
      color: theme.palette.text.secondary,
    },
  },
  button: {
    width: "70%",
    height: "80%",
    overflow: "hidden",
  },
}));

export default FileInput;

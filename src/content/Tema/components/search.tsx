import {TextField,IconButton,useTheme} from '@mui/material'
import { SearchOutlined } from '@mui/icons-material';
const SearchTema = () => {
    const theme = useTheme()

    return (
        <TextField 
        fullWidth 
        variant='outlined'
        size='small'
        sx={{mb:2}}
        inputProps={{
            style:{
                padding:'14px',
                paddingRight:'4px',
                fontSize:theme.typography.htmlFontSize,
                fontWeight: theme.typography.fontWeightRegular,
                fontFamily: theme.typography.fontFamily,
            }
        }} 
        InputProps={{
            endAdornment: (
                <IconButton>
                    <SearchOutlined />
                </IconButton>
            )
        }}/>
    )
}

export default SearchTema;

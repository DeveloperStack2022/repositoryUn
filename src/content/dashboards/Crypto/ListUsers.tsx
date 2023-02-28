import {styled,List,ListItem,ListItemText,ListItemButton,Card,Divider,Typography,Avatar,useTheme} from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import {Fragment} from 'react'
import { NavLink as RouterLink } from 'react-router-dom';

const DivCustom = styled('div')(({theme}) =>({
    position:'relative',
    overflow:'hidden',
    width:'100%',
    height:'100%'
}))

const DivCustomTwo = styled('div')(({theme}) => ({
    position: "absolute",
    inset: "0px",
    overflow: "scroll",
    marginRight: "-17px",
    marginBottom: "-17px"
}))

interface IProps {
    data: any[]
    loading_query:any
}

const ListUsers = ({data,loading_query}:IProps) => {
    const theme = useTheme()
    return (
        <Card sx={{ height: '237px', mt: 2 }}>
            <DivCustom>
                <DivCustomTwo>
                    <List sx={{px:0}}>
                        {!loading_query && data.map(elem => (
                            <Fragment key={elem.id}>
                                <ListItemButton disabled={elem.reuniones > 0 ? false : true } component={RouterLink} disableRipple   sx={{borderRadius:0,px:3}}  to={`/dashboards/Reuniones/${elem.id}`} >
                                    <ListItemText primary={elem.gradoPolicial} secondary={`${elem.nombres} ${elem.apellidos}`} primaryTypographyProps={{noWrap:true,variant:'h5'}}  />
                                           {elem.reuniones == 0 ? (
                                               <Avatar variant='circular' sx={{background:theme.colors.error.lighter,color:theme.colors.error.main}} >
                                                    <TrendingDownIcon />
                                                </Avatar>
                                           ) : elem.reuniones > 0  && elem.reuniones < 2 ? (
                                            <Avatar variant='circular' sx={{background:theme.colors.warning.lighter,color:theme.colors.warning.main}} >
                                                    <HorizontalRuleIcon />
                                                </Avatar>
                                           ):(
                                            <Avatar variant='circular' sx={{background:theme.colors.success.lighter,color:theme.colors.success.main}} >
                                                <TrendingUpIcon />
                                            </Avatar>
                                           )}
                                </ListItemButton>
                                <Divider />
                            </Fragment>
                        ))}
                    </List>
                </DivCustomTwo>
            </DivCustom>
        </Card>
    )
}
export default ListUsers;
import {useState} from 'react'
import {Card,List,ListItem,ListItemAvatar,Avatar,ListItemText,Divider,Box,Button} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink as RouterLink } from 'react-router-dom';

interface IProps {
    data:any[],
    loading:any
}

const ListOptionsCards  = ({data,loading}:IProps) => {
    return (
        <Card sx={{height:'237px',mt:2}}>
            <div style={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                height: '100%'
            }}>
                <div
                    style={{
                        position: 'absolute',
                        inset: '0px',
                        overflow: 'scroll',
                        marginRight: '0px',
                        marginBottom: '0px'
                    }}
                >
                    <List disablePadding>
                        {!loading && data.length > 0 ? data.map((elem,index) => (
                            <>
                            <ListItem sx={{py:2.7}}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primaryTypographyProps={{noWrap:true,variant:'h5'}} secondaryTypographyProps={{noWrap:true,variant:'subtitle2'}} primary={elem.gradoPolicial} secondary={`${elem.nombres}`} />
                                <Box>
                                    <Button size="small" variant="outlined" component={RouterLink} disableRipple  to={`/dashboards/felicitaciones/${elem.id}`} >Detalle</Button>
                                </Box>
                            </ListItem>
                            <Divider variant="fullWidth" />
                            </>
                        )): null }
                    </List>
                </div>
            </div>
        </Card>
    )
}
export default ListOptionsCards
import {Card,CardHeader,CardContent,Avatar,Typography,IconButton,IconButtonProps,Collapse,Box,Chip,List,ListItem,ListItemAvatar,ListItemText} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ExpandMore as ExpandMoreIcons} from '@mui/icons-material'

import {styled} from '@mui/material/styles'
import {lightBlue} from '@mui/material/colors'
import {FC,useState} from 'react'

interface IProps {
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props:ExpandMoreProps) =>{
    const {expand,...other} = props;
    return <IconButton {...other} />
})(({theme,expand}) =>({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform',{
        duration: theme.transitions.duration.shorter
    }),
}))

const CardDropDown:FC<IProps> = ({}) => {
    const [Expand, setExpand] = useState<boolean>(false)
    return (
        <>
            <Card sx={{mb:1}}>
                <CardHeader title={
                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                        <Typography>REUNION</Typography>
                        <Chip color='success' label={'18-01-2023'} />
                    </Box>
                } subheader={'PN-ASDAS-ASDAS-DASD-ASD'} action={
                    <ExpandMore expand={Expand} araia-label="Show more" onClick={() => {
                        setExpand(prev => !prev)
                    }}>
                        <ExpandMoreIcons />
                    </ExpandMore>
                }>
                </CardHeader>
                <Collapse in={Expand} timeout='auto' unmountOnExit>
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText  primaryTypographyProps={{ noWrap: true, variant: 'h5' }}
                                secondaryTypographyProps={{
                                    noWrap: true,
                                    variant: 'subtitle2'
                                }} primary={'MAYR'} secondary={'EDISON RAMOS'} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText  primaryTypographyProps={{ noWrap: true, variant: 'h5' }}
                                secondaryTypographyProps={{
                                    noWrap: true,
                                    variant: 'subtitle2'
                                }} primary={'MAYR'} secondary={'EDISON RAMOS'} />
                            </ListItem>
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        
        </>        
    )
}

export default CardDropDown

//Sistema capacitacion para la gestion de servidores policiales.

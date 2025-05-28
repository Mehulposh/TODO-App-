import {Stack,Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


function Card({item,handleDelete}){

    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
                bgcolor: 'orange',
                p: 2,
                mb: 2,
                borderRadius: 2
            }}
        >
            <Typography variant='p' component={'p'}>
                {item.title}
            </Typography>
            <DeleteIcon 
                onClick = {() => handleDelete(item.id)}
            />
        </Stack>
    )
}

export default Card;
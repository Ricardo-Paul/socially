import React from 'react';
import { Box, Button, Paper, Typography } from '@material-ui/core';
const avatar = "https://material-ui.com/static/images/avatar/2.jpg"

const PeopleCard = () => {

    return(
        <Box style={{height: 282, width: 180}}>
            <Paper>
                <Box>
                    <img src={avatar} />
                </Box>
                <Box>
                    <Typography> Alex Xavier </Typography>
                    <Button> FOllow </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default PeopleCard;
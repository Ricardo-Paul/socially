import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import React from "react";
import Image from "./Image";
import makeStyles from "@material-ui/core/styles/makeStyles";

// each 4 photos
// nth-child(5n + )

const useStyles = makeStyles(theme => ({
  image_grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: ".5rem",

    "& > :nth-child(18n+2)":{
      gridColumnStart: 2,
      gridColumnEnd: 2,
      gridRow: "span 2"
    },

    "& > :nth-child(18n + 10)":{
      gridColumn: "1 / span 2",
      gridRow: "span 2"
    },
    "& > :nth-child(9n + 9)": {
      gridColumn: "1 / span 3"
    }
  }
}))

const images = [
  "https://res.cloudinary.com/socially/image/upload/v1611174110/postimages/3lm22bzkvgmz8fs3x1vm.jpg",
  "https://res.cloudinary.com/socially/image/upload/v1611255538/postimages/iy00f7y9e8wqy34flwmx.jpg",
  "https://res.cloudinary.com/socially/image/upload/v1611371707/postimages/xex4rqniw6apmiczlwtg.jpg",
  "https://res.cloudinary.com/socially/image/upload/v1608221758/postimages/q6b673szi04yqi4e5i6l.jpg",

  "https://res.cloudinary.com/socially/image/upload/v1611174110/postimages/3lm22bzkvgmz8fs3x1vm.jpg",
  "https://res.cloudinary.com/socially/image/upload/v1611255538/postimages/iy00f7y9e8wqy34flwmx.jpg",
  "https://res.cloudinary.com/socially/image/upload/v1611371707/postimages/xex4rqniw6apmiczlwtg.jpg",
  "https://res.cloudinary.com/socially/image/upload/v1608221758/postimages/q6b673szi04yqi4e5i6l.jpg",

  "https://res.cloudinary.com/socially/image/upload/v1611174110/postimages/3lm22bzkvgmz8fs3x1vm.jpg",
  "https://res.cloudinary.com/socially/image/upload/v1611255538/postimages/iy00f7y9e8wqy34flwmx.jpg",
  "https://res.cloudinary.com/socially/image/upload/v1611174110/postimages/3lm22bzkvgmz8fs3x1vm.jpg",
  "https://res.cloudinary.com/socially/image/upload/v1611255538/postimages/iy00f7y9e8wqy34flwmx.jpg",
]

const Browse = () => {
  const classes = useStyles();
  return(
    <Grid container>
      <Grid item md="8" lg="7" xs="12">
        <Box className={classes.image_grid}>
          { images.map(i => (
            <Image image={i} />
          ))}
        </Box>
      </Grid>
    </Grid>
  )
};

export default Browse;

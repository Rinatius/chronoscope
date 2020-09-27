import {
    Button, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Grid, Typography
} from "@material-ui/core";
import React from "react";

const ImgGrid = (props) => (
    <Grid container justifyContent="center" spacing={2}>
        {props.data.map(img_data => (
            <Grid item>
                <Card style={{maxWidth: 400}}>
                    <CardActionArea>
                        <CardMedia
                            style={{height: 300}}
                            image={img_data.url}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {img_data.distance.toFixed(2) + " " + img_data.date.toISOString()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="medium" color="primary">
                            TAG
                        </Button>
                        <Button size="medium" color="primary">
                            NEGTAG
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))}
    </Grid>
)

export default ImgGrid;
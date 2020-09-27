import {
    Button, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Grid, Typography
} from "@material-ui/core";
import React from "react";

const ImgGrid = (props) => (
    <Grid container justifyContent="center" spacing={2}>
        {props.data.map((img_data, i) => (
            <Grid item key={img_data.get('key')}>
                <Card style={{width: 400}}>
                    <CardActionArea>
                        <CardMedia
                            style={{height: 300}}
                            image={img_data.get('url')}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {img_data.get('tags')}
                                {/*{img_data.get('distance').toFixed(2) + " " + img_data.get('date').toISOString()}*/}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {img_data.get('negtags')}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="medium"
                                color="primary"
                                onClick={() => props.tagClick('tag', i)}>
                            TAG
                        </Button>
                        <Button size="medium"
                                color="primary"
                                onClick={() => props.tagClick('negtag', i)}>
                            NEGTAG
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        ))}
    </Grid>
)

export default ImgGrid;
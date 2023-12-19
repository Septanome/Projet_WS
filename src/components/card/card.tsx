import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import HelpIcon from "@mui/icons-material/Help";
import { FC } from "react";

interface CardResultsProps {
    content: any;
}
export const CardComponent: FC<CardResultsProps> = ({ content }) => {
    return (
        <Link to={`/${content.uriPart}`}>
            <Card sx={{ minHeight: "280px", width: 180 }}>
                <CardCover>
                    <img
                        src={content.thumbnail}
                        srcSet={content.thumbnail + " 2x"}
                        loading="lazy"
                        alt={content.label}
                    />
                </CardCover>
                <CardCover
                    sx={{
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                    }}
                />
                <CardContent sx={{ justifyContent: "flex-end" }}>
                    <Typography level="title-lg" textColor="#fff">
                        {content.label}
                    </Typography>
                    <Typography
                        startDecorator={
                            content.type == "character" ? (
                                <PersonIcon />
                            ) : content.type == "location" ? (
                                <LocationOnRoundedIcon />
                            ) : (
                                <HelpIcon />
                            )
                        }
                        textColor="neutral.300"
                    >
                        {content.type.at(0).toUpperCase() +
                            content.type.slice(1)}
                    </Typography>
                </CardContent>
            </Card>
        </Link>
    );
};

export default CardComponent;

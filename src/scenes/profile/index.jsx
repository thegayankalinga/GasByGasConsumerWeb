import { useContext, useState, useEffect } from "react";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
    Box,
    Button,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { CreateRounded } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Header, ProgressCircle, StatBox } from "../../components";
import { tokens } from "../../theme/theme";
import UserService from "./../../services/user.service";

function Profile() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize loading state
    const theme = useTheme();
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isXsDevices = useMediaQuery("(max-width: 436px)");
    const colors = tokens(theme.palette.mode);
    const Card = styled(MuiCard)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '100%',
        padding: theme.spacing(4),
        gap: theme.spacing(2),
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '450px',
        },
        boxShadow:
            'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
        ...theme.applyStyles('light', {
            boxShadow:
                'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
        }),
    }));

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await UserService.getConsumer();
                if (response) {
                    setData(response);
                } else {
                    setError("Data fetching error");
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between">
                <Header title="Profile" subtitle="Consumer" />
                {!isXsDevices && (
                    <Box>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: colors.blueAccent[700],
                                color: "#fcfcfc",
                                fontSize: isMdDevices ? "14px" : "10px",
                                fontWeight: "bold",
                                p: "10px 20px",
                                mt: "18px",
                                transition: ".3s ease",
                                ":hover": { bgcolor: colors.blueAccent[800] },
                            }}
                            startIcon={<CreateRounded />}
                        >
                            Request Token
                        </Button>
                    </Box>
                )}
            </Box>
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                </Box>
            </Card>
        </Box>
    );
}
export default Profile;
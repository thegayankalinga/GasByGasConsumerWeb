import { useContext, useState, useEffect } from "react";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {
    Box,
    Button,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Header, ProgressCircle, StatBox } from "../../components";
import {
    DownloadOutlined,
    Email,
    PersonAdd,
    PointOfSale,
    Traffic,
} from "@mui/icons-material";
import { tokens } from "../../theme/theme";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import OutletService from "./../../services/outlet.service";

const columns = [
    { field: "outletName", headerName: "Outlet Name", width: 200 },
    { field: "outletAddress", headerName: "Outlet Address", width: 200 },
    { field: "city", headerName: "City", type: "number", width: 200 }
];

const paginationModel = { page: 0, pageSize: 5 };

function Outlets() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isXsDevices = useMediaQuery("(max-width: 436px)");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await OutletService.getAllOutlet();
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
        return <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Full viewport height
            }}
        >
            <CircularProgress color="primary" sx={{ color: colors.blueAccent[700] }} />      </Box>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between">
                <Header title="Outlets" subtitle="Gas By Gas Outlets" />
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
                            startIcon={<DownloadOutlined />}
                        >
                            {" "}
                            DOWNLOAD REPORTS{" "}
                        </Button>{" "}
                    </Box>
                )}{" "}
            </Box>
            <Paper sx={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 20]}
                    sx={{ border: 0 }}
                />
            </Paper>

        </Box>
    );
}
export default Outlets;

import { useState, useEffect } from "react";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
    Box,
    Button,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Header } from "../../components";
import { CreateRounded } from "@mui/icons-material";
import { tokens } from "../../theme/theme";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import GasTokenService from "./../../services/gastoken.service";
import OutletService from "./../../services/outlet.service";
import TokenFormPopup from "./../../components/token/TokenFormPopup";
import TokenFormUpdatePopup from "./../../components/token/TokenFormUpdatePopup";
import { ConsumerType, getConsumerName } from "./../../utils/ConsumerType";
import userService from "./../../services/user.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notificationService from "../../services/notification.service";
import { Edit } from "@mui/icons-material";

const paginationModel = { page: 0, pageSize: 5 };


function Tokens() {
    const user = userService.getCurrentUser();
    const [data, setData] = useState(null);
    const [outlets, setOutlets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const theme = useTheme();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupToeknUpdateOpen, setIsPopupToeknUpdateOpen] = useState(false);
    const colors = tokens(theme.palette.mode);
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isXsDevices = useMediaQuery("(max-width: 436px)");
    const [rowData, setRowData] = useState(null);
    const fetchData = async () => {
        setLoading(true);
        try {
            setLoading(true);
            const response = await GasTokenService.getAll(user.email);
            if (response) {
                const outlets = await OutletService.getAllOutlet();
                setOutlets(outlets);
                const arr = response.map(element => {
                    const outlet = outlets.find(out => out.id === element.outletId);
                    return outlet ? { ...element, outletName: outlet.outletName, outletCity: outlet.city, outletAddress: outlet.outletAddress } : element;
                });
                setData(arr);
                setLoading(false);
            } else {
                setError("Data fetching error");
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdatePopupOpen = (row) => {
        setRowData(row);
        setIsPopupToeknUpdateOpen(true);
    };

    const columns = [
        { field: "requestDate", headerName: "Date", type: "number", width: 100 },
        { field: "expectedPickupDate", headerName: "Expected Pickup Date", type: "number", width: 100 },
        { field: "isEmpltyCylindersGiven", headerName: "Empty Cylinder", width: 80, valueGetter: (params) => params? "Received" : "Not Yet" },
        { field: "isPaid", headerName: "Payment", width: 80, valueGetter: (params) => params ? "Received" : "Not Yet" },
        { field: "paymentDate", headerName: "Payment Date", type: "number", width: 90, valueGetter: (params) => params ? params : "_" },
        { field: "readyDate", headerName: "Cylinder Collectable Date", type: "number", width: 100, valueGetter: (params) => params ? params : "_" },
        { field: "outletName", headerName: "Outlet Name", width: 100 },
        { field: "outletAddress", headerName: "Outlet Address", width: 150 },
        { field: "outletCity", headerName: "City", type: "number", width: 80 },
        {
            field: "status",
            headerName: "Token Status",
            width: 100,
            valueGetter: (params) => {
                switch (params.status) {
                    case 1:
                        return "Pending";
                    case 2:
                        return "Assigned";
                    case 3:
                        return "Completed";
                    case 4:
                        return "Cancelled";
                    default:
                        return "Unknown"; // Or handle other cases
                }
            },
        }, {
            field: "edit",
            headerName: "Action",
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleUpdatePopupOpen(params.row)}>
                    <Edit />
                </IconButton>
            )
        }
    ];


    const handlePopupOpen = () => setIsPopupOpen(true);
    const handlePopupClose = () => setIsPopupOpen(false);
    const handleFormSubmit = async (formData) => {
        setLoading(true);
        const exDate = formData.expectedPickupDate.format("YYYY-MM-DD");
        const outletId = formData.outletID;
        const consumerType = getConsumerName(user.userType);
        const email = user.email;

        try {
            const response = await GasTokenService.createReq({ "expectedPickupDate": exDate, "userType": consumerType }, { "outletId": outletId, "consumerEmail": email });
            if (response) {   
                console.log(response)             
                toast.success('Gas Request Successfully Created.');
                const resMail = notificationService.sendEmail(response.userEmail,user.fullName,"Your token successfully created",
                    "Dear sir, <br>Your request successfully saved<br><br>Expected PickupDate:"+response.expectedPickupDate+"<br>"
                );
                // const resSms = notificationService.sendSms(user.phoneNumber,
                //     "Dear sir, Your request successfully saved.  Expected PickupDate:"+response.expectedPickupDate+"<br>"
                // );

                fetchData();
            } else {
                toast.error('Something missing');
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }

    };

    const handlePopupToeknUpdatePopupOpen = () => {
        setIsPopupToeknUpdateOpen(true);
    };

    const handlePopupToeknUpdatePopupClose = () => {
        setIsPopupToeknUpdateOpen(false);
    };

    const handlePopupToeknUpdateFormSubmit = async (formData) => {
        console.log("Form data submitted:", formData);
        setLoading(true);
        let userType;
        switch (formData.userType) {
            case 0:
                userType = "Personal";
                break;
            case 1:
                userType = "Business";
                break;
            case 2:
                userType = "Industry";
                break;
            case 3:
                userType = "Admin";
                break;
            case 4:
                userType = "Manager";
                break;
            default:
                userType = "";
        }
            const expectedPickupDate = formData.expectedPickupDate.format("YYYY-MM-DD");
        try {
            const response = await GasTokenService.updateReq(expectedPickupDate,userType, formData.id);
            if (response) {
                toast.success('Gas Request expected date successfully updated.');
                fetchData();
            } else {
                toast.error('Something missing');
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        handlePopupToeknUpdatePopupClose();
    };

    if (loading) {
        return <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Full viewport height
            }}
        ><ToastContainer />
            <CircularProgress color="primary" sx={{ color: colors.blueAccent[700] }} />      </Box>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Box m="20px">
            <ToastContainer />
            <Box display="flex" justifyContent="space-between">
                <Header title="My Tokens" subtitle="List Of Your GBG Tokens" />
              

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
                                            onClick={handlePopupOpen}
                                        >
                                            {" "}
                                            Request Token{" "}
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
            <TokenFormPopup open={isPopupOpen} handleClose={handlePopupClose} handleSubmit={handleFormSubmit} outletOptions={outlets} />
            <TokenFormUpdatePopup
                open={isPopupToeknUpdateOpen}
                handleClose={handlePopupToeknUpdatePopupClose}
                handleSubmit={handlePopupToeknUpdateFormSubmit}
                rowData={rowData}
                userType={rowData?.userType}
                expectedPickupDate={rowData?.expectedPickupDate} // pass rowData pickup Date
            />
        </Box>
    );
}

export default Tokens;

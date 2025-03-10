import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs'; // Import dayjs

function TokenFormUpdatePopup({ open, handleClose, handleSubmit, rowData, userType, expectedPickupDate }) {
    const [formData, setFormData] = useState({
        id: "",
        expectedPickupDate: null,
        userType: "",
    });

    useEffect(() => {
        if (rowData) {
            setFormData({
                id: rowData.id,
                expectedPickupDate: expectedPickupDate ? dayjs(expectedPickupDate) : null,
                userType: userType,
            });
        }
    }, [rowData, userType, expectedPickupDate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, expectedPickupDate: date });
    };

    const handleFormSubmit = () => {
        handleSubmit(formData);
        handleClose();
    };

    const shouldDisablePreviousDates = (date) => {
        return date.isBefore(dayjs(), 'day');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Gas Request</DialogTitle>
                <DialogContent>
                    <TextField
                        label="ID"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                        style={{ display: 'none' }}
                    />

                    <DatePicker
                        label="Expected Pickup Date"
                        value={formData.expectedPickupDate}
                        onChange={handleDateChange}
                        style={{ display: 'none' }}
                        renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                        shouldDisableDate={shouldDisablePreviousDates} // Disable previous dates
                    />

                    <TextField
                        label="User Type"
                        name="userType"
                        value={formData.userType}
                        onChange={handleChange}
                        fullWidth
                        style={{ display: 'none' }}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Cancel</Button>
                    <Button onClick={handleFormSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
}

export default TokenFormUpdatePopup;
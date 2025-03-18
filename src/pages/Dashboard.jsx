import * as React from 'react';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function DeviceDashboard() {
    const [devices, setDevices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const devicesPerPage = 10;

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await fetch("https://apis.enggenv.com/forwarders/hwra/getAllDeviceInfo");
            const data = await response.json();
            setDevices(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching devices:", error);
            setDevices([]);
        }
    };

    const filteredDevices = devices.filter((device) =>
        device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.info.CompanyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastDevice = currentPage * devicesPerPage;
    const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
    const currentDevices = filteredDevices.slice(indexOfFirstDevice, indexOfLastDevice);
    const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);

    return (
        <TableContainer component={Paper} sx={{ padding: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <h2>📊 Device Dashboard</h2>
                <TextField
                    label="Search..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>S.No.</StyledTableCell>
                        <StyledTableCell align="center">Device ID</StyledTableCell>
                        <StyledTableCell align="center">Company Name</StyledTableCell>
                        <StyledTableCell align="center">NOC Number</StyledTableCell>
                        <StyledTableCell align="center">User Key</StyledTableCell>
                        <StyledTableCell align="center">Last Sync</StyledTableCell>
                        <StyledTableCell align="center">Status</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentDevices.length > 0 ? (
                        currentDevices.map((device, index) => (
                            <StyledTableRow key={device.deviceId}>
                                <StyledTableCell>{indexOfFirstDevice + index + 1}</StyledTableCell>
                                <StyledTableCell align="center">{device.deviceId}</StyledTableCell>
                                <StyledTableCell align="center">{device.info.CompanyName}</StyledTableCell>
                                <StyledTableCell align="center">{device.info.NOCNumber}</StyledTableCell>
                                <StyledTableCell align="center" style={{ width: "150px" }}>{String(device.info.Userkey).trim()}</StyledTableCell>
                                <StyledTableCell align="center">{new Date(device.LastSync).toLocaleDateString("en-GB")} 
                                    {" "}
                                    {new Date(device.LastSync).toLocaleTimeString("en-GB", { hour12: false })} (
                                    {new Date(device.LastSync).toLocaleTimeString("en-US", { hour12: true }).split(" ")[1]})</StyledTableCell>
                                <StyledTableCell align="center">
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        color: 'white',
                                        backgroundColor: device.status === "Active" ? "green" : "red"
                                    }}>
                                        {device.status}
                                    </span>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        <StyledTableRow>
                            <StyledTableCell colSpan={7} align="center">No devices found.</StyledTableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    variant="contained"
                >
                    ◀ Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    variant="contained"
                >
                    Next ▶
                </Button>
            </div>
        </TableContainer>
    );
}

import {React, useState} from 'react';
import { useHistory} from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHeader, TableHead, TableRow, Paper, TableSortLabel } from '@mui/material/';

import './Main.css';


function Main() {

    const history = useHistory();
    const dispatch = useDispatch();

    // const approvedJobs = useSelector(store => store.archiveStorage);

    const rowInformation = [
        {company: "data.company", date_posted: "data.date", role: "data.available.role", description: "data.description"}
    ]

    const [orderDirection, setOrderDirection] = useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = useState('date')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(1)

    const handleRequestSort = (event, property) => {
        const isAscending = (valueToOrderBy === property && orderDirection === 'asc')
        setValueToOrderBy(property)
        setOrderDirection(isAscending ? 'desc' : 'asc')
    }

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event,property)
    }
 
    return (
        <>
            <div className="parent">
                <div className="logo">
                    <h1>LOGO</h1>
                    <div>
                        In support of Minnesota’s marketing community, this weekly update is dedicated to sharing marketing
                        career opportunities with Minnesota-based companies. We invite you to review the opportunities below
                        and apply directly through the hiring company unless otherwise noted.
                    </div>
                </div>
                <div className="top-of-table"><h2>Companies Hiring</h2></div>
            </div>
            <div className="tables-container">
                <div className="job-postings-table">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell key="company">
                                                <TableSortLabel
                                                active={valueToOrderBy === "company"}
                                                direction={valueToOrderBy === "company" ? orderDirection: 'asc'}
                                                onClick={createSortHandler("company")}>Company</TableSortLabel></TableCell>
                                    <TableCell  key="date">
                                                <TableSortLabel
                                                active={valueToOrderBy === "date"}
                                                direction={valueToOrderBy === "date" ? orderDirection: 'asc'}
                                                onClick={createSortHandler("date")}>Date Posted</TableSortLabel></TableCell>
                                    <TableCell key="role"><TableSortLabel>Role</TableSortLabel></TableCell>
                                    <TableCell key="description"><TableSortLabel>Description</TableSortLabel></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Prime Digital Academy</TableCell>
                                    <TableCell>2020</TableCell>
                                    <TableCell>Software Developer </TableCell>
                                    <TableCell> A long and detailed description</TableCell>
                                    <TableCell>Apply</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Minnesota Hospital Association</TableCell>
                                    <TableCell>2022</TableCell>
                                    <TableCell>Assistant </TableCell>
                                    <TableCell>Details include... </TableCell>
                                    <TableCell>Apply </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
               


                </div>

            </div>
        </>
    )



}

export default Main;
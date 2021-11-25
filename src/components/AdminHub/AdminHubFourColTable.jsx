import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import {
  Typography,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

import useStyles from "../Styles/Styles";
import "./AdminHub.css";

const AdminHubFourColTable = ({ subs, toggleSubStatus }) => {
    
  const classes = useStyles();

  return (
    <div>
      <div className="fourColTable">
        <Typography variant="h4" className={classes.fullSubListHeader}>
          Full Subscriber List:
        </Typography>

        <Paper elevation={4} className="adminPaper">
          <Grid>
            <TableContainer sx={{ maxHeight: 470 }}>
              <Table
                className="tableMain"
                stickyHeader
                aria-label="sticky table"
              >
                <TableHead className={classes.tableHeader}>
                  <TableRow>
                    <TableCell className={classes.tableHeaderCell}>
                      Name
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Email
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Zip Code
                    </TableCell>
                    <TableCell className={classes.tableHeaderCell}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="adminTableBody">
                  {subs.length > 0 ? (
                    subs[0].map((item) => (
                      <TableRow key={item.id} className={classes.tableBodyRow}>
                        <TableCell className={classes.tableCell}>
                          {item.full_name}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          {item.email_address}
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          {item.merge_fields.ADDRESS.zip}
                        </TableCell>

                        <TableCell className={classes.tableCell}>
                          {item.status}

                          <IconButton
                            onClick={() =>
                              toggleSubStatus(item.status, item.contact_id)
                            }
                          >
                            <ToggleOffIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <img src="./images/Pendulum.gif" />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default AdminHubFourColTable;

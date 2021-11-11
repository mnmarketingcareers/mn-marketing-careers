import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button, Paper, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import "./AdminHub.css";

const AdminHub = () => {
  const dispatch = useDispatch();
  const subs = useSelector((store) => store.setSubsListReducer);

  //loading and redux state
  const [isLoading, setIsLoading] = useState(false);
  const [subList, setSubList] = useState([]);

  //manual user entry info
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userZip, setUserZip] = useState("");

  useEffect(() => {
    setIsLoading(true);
    console.log("page loaded - fetching subscribers...");
    dispatch({ type: "GET_SUBS" });
    setSubList(subs.data);
  }, []);

  //check email - is it real? if keep required attribute //deletelater
  const validateEmail = () => {
    if (userEmail.indexOf("@") > -1) {
      submit();
    } else {
      alert("invalid email, yo!");
    }
  };

  // new subscriber admin post!
  const submit = () => {
    const userAddress = {
      addr1: "test addr",
      city: "test city",
      state: "test state",
      zip: userZip,
    };
    console.log(
      "valid!! sending:",
      userEmail,
      userFirstName,
      userLastName,
      userZip
    );
    dispatch({
      type: "ADD_SUBSCRIBER",
      payload: {
        email: userEmail,
        firstName: userFirstName,
        lastName: userLastName,
        address: userAddress,
      },
    });
    setUserEmail("");
    setUserFirstName("");
    setUserLastName("");
    setUserZip("");

  };

  return (
    <div className="adminHubPage">
      <Typography className="tempHeader">WUT IT DO, ADMIN PAGE</Typography>

      <Container className="adminContainer">
        <div className="gridWrapper">
          <div className="gridL">
            <Typography variant="h6">Manual Subsucriber Entry</Typography>
            <form onSubmit={() => validateEmail()}>
              <TextField
                value={userEmail}
                type="email"
                id="email"
                size="small"
                placeholder="Email"
                style={{ width: "200px" }}
                onChange={(event) => setUserEmail(event.target.value)}
              />{" "}
              <br />
              <TextField
                value={userFirstName}
                type="text"
                id="firstName"
                size="small"
                placeholder="First Name"
                style={{ width: "200px" }}
                onChange={(event) => setUserFirstName(event.target.value)}
              />
              <br />
              <TextField
                value={userLastName}
                type="text"
                id="lastName"
                size="small"
                placeholder="Last Name"
                style={{ width: "200px" }}
                onChange={(event) => setUserLastName(event.target.value)}
              />
              <br />
              <TextField
                value={userZip}
                type="text"
                id="email"
                size="small"
                placeholder="Zip Code"
                style={{ width: "200px" }}
                onChange={(event) => setUserZip(event.target.value)}
              />
              <br />
              <Button type="submit">Submit</Button>
            </form>
          </div>

          <div className="gridR">
            <Typography
              variant="h4"
              style={{ margin: "20px", textDecoration: "underline" }}
            >
              Full Subscriber List:
            </Typography>

            <Paper elevation={8} className="adminPaper">
              <Table className="tableMain">
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="tableHeaderCell"
                      style={{
                        fontFamily: "Lato",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      className="tableHeaderCell"
                      style={{
                        fontFamily: "Lato",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      className="tableHeaderCell"
                      style={{
                        fontFamily: "Lato",
                        textAlign: "center",
                        fontSize: "20px",
                      }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="adminTableBody">
                  {subs.length > 0 ? (
                    subs[0].map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          style={{
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.full_name}
                        </TableCell>
                        <TableCell
                          style={{
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.email_address}
                        </TableCell>

                        <TableCell
                          style={{
                            fontFamily: "Lato",
                            textAlign: "center",
                            fontSize: "16px",
                          }}
                        >
                          {item.status}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <img className="loader" src="./images/Pendulum.gif" />
                  )}
                </TableBody>
              </Table>
            </Paper>
            <Typography></Typography>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminHub;

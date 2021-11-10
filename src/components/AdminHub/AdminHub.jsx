import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Container, Button } from "@mui/material";
import "./AdminHub.css";

const AdminHub = () => {
  const dispatch = useDispatch();
  const reduxStore = useSelector((store) => store);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    dispatch({ type: "GET_SUBS" });
  }, []);

  const handleGetSubsClick = () => {
    console.log('in handleGetSubsClick')
  }

  //final leg of pulling in all subscribers for any purpose
  const listSubscribers = () => {
    console.log("loaded!", reduxStore);
    // setIsLoading(false);
  };

  return (
    <Container className="adminContainer">
      <Typography className="tempHeader" >WUT IT DO, ADMIN PAGE</Typography>

      <Button
      onClick={() => handleGetSubsClick()}
        style={{ marginTop: "50px" }}
        variant="contained"
        color="secondary"
        className="getSubsButton"
      >
        Get Subs List
      </Button>

      <Typography>
          {JSON.stringify(reduxStore)}
      </Typography>

      <Typography>{listSubscribers()}</Typography>

    </Container>
  );
};

export default AdminHub;

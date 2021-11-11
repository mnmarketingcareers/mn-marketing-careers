// import { makeStyles } from "@material-ui/styles";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({

  //-------------AdminHub.jsx-------------//

  adminHeader: {
    textAlign: "center",
    fontSize: "40px",
    marginBottom: "7px",
    color: "#74BDCB",
    textDecoration: "underline"
  },

  //admin sub table

  tableHeader: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Lato"
  },

  tableHeaderCell: {
    fontFamily: "Lato",
    textAlign: "center",
    fontSize: "25px",
    paddingLeft: 0,
    paddingRight: 0
  },

  tableBodyRow: {
margin: 0,
padding: 0,
  },

  adminSubmitButton: {
      backgroundColor: '#FFA384'
  
  }

}, {index: 1});

export default useStyles;

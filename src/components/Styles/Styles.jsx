// import { makeStyles } from "@material-ui/styles";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(
  {
    //-------------AdminHub.jsx-------------//

    adminHeader: {
      textAlign: "center",
      fontSize: "40px",
      marginBottom: "7px",
      color: "#74BDCB",
      textDecoration: "underline",
    },

    //admin sub table

    tableHeader: {
      fontWeight: "bold",
      fontSize: 22,
      textAlign: "center",
      fontFamily: "Lato",
    },

    tableHeaderCell: {
      fontFamily: "Lato",
      textAlign: "center",
      fontSize: "25px",
      paddingLeft: 0,
      paddingRight: 0,
    },

    tableBodyRow: {
      margin: 0,
      padding: 0,
    },

    adminSubmitButton: {
      backgroundColor: "#FFA384",
    },

    //-------------Campaign (formerly UserPage) (admin email campaign page)-------------//

    campaignPaperContainer: {
      width: "90%",
      display: "block",
      margin: "auto",
      jusitfyContent: "center",
      textAlign: "center",
    },

    campaignTitleTextField: {
      width: "90%",
      margin: "12px 0",

    },

    subjectTextField: {
      width: "90%",
      margin: "12px 0",
    },

    previewTextField: {
      width: "90%",
      margin: "12px 0",
    },

    bodyTextField: {
      width: "90%",
      margin: "12px 0",
    },

    footerCheckDiv: {
      display: "flex",
      justifyContent: "center",
      margin: "18px 0 40px",

    },
  },
  { index: 1 }
);

export default useStyles;

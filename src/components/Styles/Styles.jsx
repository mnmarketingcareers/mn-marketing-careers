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
      fontFamily: "Red Hat Text",
    },

    tableHeaderCell: {
      fontFamily: "Red Hat Text",
      textAlign: "center",
      fontSize: "22px",
      fontWeight: '600',
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
      width: "93%",
      display: "block",
      margin: "auto",
      justifyContent: "center",
      textAlign: "center",
    },

    loginTextField: {
      width: "22ch",

    },

    templateIdTextField: {
      width: "60%",
      margin: "12px 0",
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

    //-------------Template (admin email template page)-------------//


    templatePageContainer: {
      justifyContent: 'center',
      textAlign: 'center'
    },

    templatePaperContainer: {
      width: "90%",
      display: "block",
      margin: "auto",
      justifyContent: "center",
      textAlign: "center",
    },

    newOrModSelect: {
    },

    templateIdSelect: {

    },


    templateNameField: {
      width: "80%",
      margin: "24px 0 12px",
    },

    //-------------EMAIL CONFIRM PAGE (final before send)-------------//


    emailConfirmText: {
      fontSize: '20px',
    },


        //-------------LOGIN PAGE / FORM (Mo 11/17 @ 9 PM)-------------//


        loginRegisterPaper: {
          width: '80%', 
          margin: '50px auto 30px', 
          textAlign: 'center', 
          padding: '30px 0'
          
        },

    loginButton: {
      color: 'white',
      backgroundColor: '#FFA384',
      fontWeight: 'bold',
      marginTop: '18px',
      padding: '1px',
      fontSize: '20px',
      transitionDuration: '1s',
      '&:hover': {
        transitionDuration: '.7s',
        backgroundColor: '#008183',
      }
    },

    loginRegisterSpacing: {
      margin: '8px',
    },

    loginHeaderText: {
      fontFamily: 'Red Hat Text',
      fontWeight: '500',
      fontSize: '36px',
    },


  },
  { index: 1 }
);

export default useStyles;

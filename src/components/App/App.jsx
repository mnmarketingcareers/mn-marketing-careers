import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import Campaign from "../Campaign/Campaign";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import EmployerPage from "../EmployerPage/EmployerPage";
import AdminHub from "../AdminHub/AdminHub";
import Main from "../Main/Main";
import EmailTemplate from "../EmailTemplate/EmailTemplate";
import FinalizeAndSendCampaign from "../FinalizeAndSendCampaign/FinalizeAndSendCampaign";
import OopsPage from "../OopsPage/OopsPage";
// leaving space for other new Pages here
import ApproveSubmissions from "../ApproveSubmissions/ApproveSubmissions";
import UnsubFeedbackPage from "../UnsubFeedbackPage/UnsubFeedbackPage";
import AdminJobList from "../AdminJobList/AdminJobList";
import "./App.css";
import AdminAddJobPage from "../AdminAddJobPage/AdminAddJobPage";
import JobPostingIssuesPage from "../JobPostingIssuesPage/JobPostingIssuesPage";
import JobIssuesReviewPage from "../JobIssuesReviewPage/JobIssuesReviewPage";
import EditJobPage from "../EditJobPage/EditJobPage";
import UnsubInformation from "../UnsubInformation/UnsubInformation";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* localhost:3000 will redirect to localhost:3000/MAIN */}
          <Redirect exact from="/" to="/main" />

          <Route exact path="/about">
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the Campaign if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows Campaign else shows MAIN
            exact
            path="/emailtemplate"
          >
            <EmailTemplate />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Campaign else shows MAIN
            exact
            path="/campaign"
          >
            <Campaign />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Campaign else shows MAIN
            exact
            path="/finalizeandsendcampaign"
          >
            <FinalizeAndSendCampaign />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows MAIN
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ApproveSubmissions else shows MAIN
            exact
            path="/reviewsubmissions"
          >
            <ApproveSubmissions />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows MAIN
            // added by Mo 11/9/21 @ 10p
            exact
            path="/adminhub"
          >
            <AdminHub />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows MAIN
            // added by Mo 11/9/21 @ 10p
            exact
            path="/adminjoblist"
          >
            <AdminJobList />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AdminAddJobPage else shows MAIN
            exact
            path="/adminaddjob"
          >
            <AdminAddJobPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows EditJobPage else shows MAIN
            exact
            path="/editpage/:id"
          >
            <EditJobPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Job Issue List Page
            exact
            path="/adminjobissuelist"
          >
            <JobIssuesReviewPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Unsubscriber Information Page
            exact
            path="/unsubscribeinfo"
          >
            <UnsubInformation />
          </ProtectedRoute>

          <Route exact path="/mnmcadmin101">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/adminhub" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/adminhub" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/adminhub" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          <Route exact path="/unsubfeedbackpage">
            <UnsubFeedbackPage />
          </Route>

          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          <Route exact path="/employerpage">
            <EmployerPage />
          </Route>

          <Route exact path="/main">
            <Main />
          </Route>

          <Route exact path="/jobpostingissue/:id">
            <JobPostingIssuesPage />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <OopsPage />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

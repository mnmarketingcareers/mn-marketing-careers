import React from 'react';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { LinkedinShareButton, TwitterShareButton, FacebookShareButton} from "react-share";
import {LinkedinIcon, TwitterIcon, FacebookIcon} from "react-share";

function ShareOurApp() {
  return (

    //Icons that link to user's Facebook, LinkedIn and Twitter so they can share app.
    
        <>
            <Container>               
                    <FacebookShareButton url="http://fullstack.primeacademy.io/"
                    quote={"This week's Minnesota Marketing Careers email features an awesome list of marketing, digital, and PR career openings. To receive the full list of jobs in your inbox, sign up here https://bit.ly/mnmcsignup"}
                    hashtag="#Minnesota">
                        <FacebookIcon round={true}></FacebookIcon>
                    </FacebookShareButton>

                    <LinkedinShareButton url="http://fullstack.primeacademy.io/"
                    title={"Minnesota Marketing Careers"}
                    summary={"This week's Minnesota Marketing Careers email features an awesome list of marketing, digital, and PR career openings. To receive the full list of jobs in your inbox, sign up here https://bit.ly/mnmcsignup"}
                    hashtag="#Minnesota">
                        <LinkedinIcon round={true}></LinkedinIcon>
                    </LinkedinShareButton>

                    <TwitterShareButton url="http://fullstack.primeacademy.io/"
                    title={"Minnesota Marketing Careers"}
                    hashtag="#Minnesota">
                        <TwitterIcon round={true}></TwitterIcon>
                    </TwitterShareButton>                              
            </Container>

        </>
  );
}

export default ShareOurApp;

import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';

import './Main.css';


function Main() {

    const history = useHistory();
    const dispatch = useDispatch();

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
                    
                
                </div>

            </div>
        </>
    )



}

export default Main;
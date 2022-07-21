import { Button, CircularProgress, Grid, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from 'styled-components';

const DialogBoxWrapper = styled.div`
    .main-div{
        margin: 2em;
    }

    .header-text{
        margin-bottom: 1em
    }
`

const CustomerDialog = ({ documentId, closeModal }) => {
    const [loader, setLoader] = useState(false);
    const [carData, setCarData] = useState({});
    const [vehicleSegment, setVehicleSegment] = useState("");
    const [sellingPrice,setSellingPrice] = useState("");
    const [airBags,setAirBags] = useState("");
    const [fuel, setFuel] = useState("");
    const [mattFinish, setMatFinish] = useState("");
    const [musicSystem, setMusicSystem] = useState("");
    const [powerSteering, setPowerSteering] = useState("");
    const [sunRoof,setSunRoof] = useState("")
    const [updatingDataLoader, setUpdatingDataLoader] = useState(false);

    const fetchPolicyData = async (documentId) => {
        setLoader(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/car-data`, {
                params: {
                    docId: documentId
                }
            });
            if (response.status === 200) {
                const { data } = response.data;
                setCarData(data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        fetchPolicyData(documentId);
    }, [documentId]);

    useEffect(() => {
        if (Object.keys(carData).length > 0) {
            setSellingPrice(carData.sellingPrice)
            setVehicleSegment(carData.vehicleSegment);
            setAirBags(carData.airBags);
            setFuel(carData.fuel);
            setMatFinish(carData.mattFinish);
            setMusicSystem(carData.musicSystem);
            setPowerSteering(carData.powerSteering);
            setSunRoof(carData.sunRoof);
        }
    }, [carData])

// API to update only sales details
    const handleUpdate = async () => {
        setUpdatingDataLoader(true);
        try {
            const reqData = {
                objectID: documentId,
                updatedData: {
                    vehicleSegment,
                    airBags,
                    fuel,
                    mattFinish,
                    musicSystem,
                    powerSteering,
                    sunRoof,
                    sellingPrice
                }
            };
            if(sellingPrice.length>7){
                alert('Selling price cannot be more than 1 million')
                setUpdatingDataLoader(false)
                return;
            }
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/`, reqData);
            if (response.status === 200) {
                closeModal();
            }
            window.location.reload()
        } catch (err) {
            alert('Failed to update the information');
        }
        setUpdatingDataLoader(false);
    }
    return (
        <DialogBoxWrapper>
        <div className="main-div">
            <Typography variant="h4" className="header-text"> Customer and Car information </Typography>
            {loader && (
                <Grid container justifyContent="center">
                    <CircularProgress />
                </Grid>
            )}
            {!loader && (
                <>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={4}>
                            <TextField label="Customer Id" variant="outlined" defaultValue={carData.customerId} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Sales ID" variant="outlined" defaultValue={carData.salesId} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Date Of purchase" variant="outlined" defaultValue={carData.dateOfPurchase} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Customer Gender" variant="outlined" defaultValue={carData.customerGender} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Customer Income" variant="outlined" defaultValue={carData.customerIncome} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Customer Region" variant="outlined" defaultValue={carData.customerRegion} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Customer Marital Status" variant="outlined" defaultValue={carData.customerMaritalStatus} disabled />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Selling Price ($)" variant="outlined" defaultValue={carData.sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} error={sellingPrice.length > 7} helperText={"It cannot be more than 1 Million"} />
                        </Grid>

                        <Grid item xs={6} md={4}>
                            <TextField label="Vehicle Segment" variant="outlined" defaultValue={carData.vehicleSegment} onChange={(e) => setVehicleSegment(e.target.value)} error={!["A", "B", "C"].includes(vehicleSegment)} helperText={"Wrong vehicle Segment"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Air Bags" variant="outlined" defaultValue={carData.airBags} onChange={(e) => setAirBags(e.target.value)} error={!["1", "0"].includes(airBags)} helperText={"It can be either 1 or 0"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Fuel" variant="outlined" defaultValue={carData.fuel} onChange={(e) => setFuel(e.target.value)} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Matt Finish" variant="outlined" defaultValue={carData.mattFinish} onChange={(e) => setMatFinish(e.target.value)} error={!["1", "0"].includes(mattFinish)} helperText={"It can be either 1 or 0"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Music System" variant="outlined" defaultValue={carData.musicSystem} onChange={(e) => setMusicSystem(e.target.value)} error={!["1", "0"].includes(musicSystem)} helperText={"It can be either 1 or 0"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Power Steering" variant="outlined" defaultValue={carData.powerSteering} onChange={(e) => setPowerSteering(e.target.value)} error={!["1", "0"].includes(powerSteering)} helperText={"It can be either 1 or 0"} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <TextField label="Sun Roof" variant="outlined" defaultValue={carData.sunRoof} onChange={(e) => setSunRoof(e.target.value)} error={!["1", "0"].includes(sunRoof)} helperText={"It can be either 1 or 0"} />
                        </Grid>
                        <Grid item xs={6} md={12}>
                            <Button variant="contained" color="primary" onClick={() => handleUpdate()}> {updatingDataLoader ? <CircularProgress color="secondary" /> : "Update"} </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </div>
        </DialogBoxWrapper>
    );
};

export default CustomerDialog;

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

function FemrInstallationGuide() {
    const [macLink, setMacLink] = useState("");
    const [winLink, setWinLink] = useState("");

    const getDownloadLinks = async () => {
        try {
            const winResponse = await fetch(
                "https://vgyc6fujod.execute-api.us-east-1.amazonaws.com/prod/installer/windows"
            );
            const winLink = await winResponse.text();

            setWinLink(winLink);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDownloadLinks();
    }, []);

    const handleDownload = () => {
        window.open(winLink);
    };
    
    return (
        <html>
            <body>
                <div>
                    <center>
                        <img src="../logo_color.png" alt="FEMR Logo" />
                    </center>
                </div>
                <div>
                    <center>
                        <h1> How to Install Off-Chain Femr On Windows </h1>
                    </center>
                    <center>
                        <p>
                            {" "}
                            <b>
                                &nbsp;&nbsp;1. Download the FEMR Installer
                            </b>{" "}
                        </p>
                    </center>
                    <center>
                        <pre>
                            &nbsp;&nbsp;&nbsp;&nbsp;Click the button below to download the windows installer. 
                            <br></br>
                            &nbsp;&nbsp;&nbsp;&nbsp;Take note of where the installer file is located<br></br>
                            <br></br>
                            <div class="winButton">
                            <Button
                                variant="contained"
                                disabled={winLink === ""}
                                onClick={handleDownload}
                                color="primary"
                                textTransform="none"
                            >
                                Install fEMR Off-Chain
                            </Button>
                        </div>
                            <br></br>
                        </pre>
                    </center>
                    <center>
                        <p>
                            {" "}
                            <b>
                                &nbsp;&nbsp;2. Launch the FEMR Installer Package
                            </b>{" "}
                        </p>
                    </center>
                    <center>
                        <pre>
                        &nbsp;&nbsp;&nbsp;&nbsp;Double-click the FEMR installer package to start the installation of the FEMR.<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;Start the process and follow the prompts. Accept any licenses presented including the docker installation and license,<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;it is crucial to the program. When prompted to make a shortcut for the FEMR application on your desktop it would be<br></br>
                        &nbsp;&nbsp;&nbsp;&nbsp;advantageous to do so.<br></br>
                        </pre>
                    </center>
                    <center>
                        <p>
                            {" "}
                            <b>&nbsp;&nbsp;3. Open Docker</b>{" "}
                        </p>
                    </center>
                    <center>
                        <pre>
                            &nbsp;&nbsp;&nbsp;&nbsp;Part of the FEMR installer includes the Docker desktop.<br></br>
                            To Run the locally hosted website you need to first run docker desktop. <br></br>
                            Open the Docker app via the windows start menu from the bottom left and accept the terms and conditions. <br></br>
                            The Docker dashboard should look something like this:<br></br>
                        </pre>
                    </center>
                    <center>
                        <img
                            src="../Docker_example.png"
                            alt="Docker Dashboard"
                            width="750"
                            height="375"
                        />
                    </center>
                    <center>
                        <p>
                            {" "}
                            <b>
                                &nbsp;&nbsp;4. Launch the FEMR Service
                            </b>{" "}
                        </p>
                    </center>
                    <center>
                        <pre>
                            Go to your applications folder and double-click the FEMR executable. This will launch a terminal window.<br></br>
                            The first time you run this, please make sure you are connected to the internet the first time and be patient.<br></br> 
                            This first run may take up to 30 minutes<br></br>
                            (after the first run, the program may be used offline and will  be launched in less than a minute).<br></br>
                            Alternatively, if you could not complete step 3, run the FEMR application twice.<br></br>
                        </pre>
                    </center>
                    <center>
                        <p>
                            {" "}
                            <b>&nbsp;&nbsp;5. Navigate to the FEMR page</b>{" "}
                        </p>
                    </center>
                    <center>
                        <pre>
                            &nbsp;&nbsp;&nbsp;&nbsp;Open a browser window and
                            navigate to <a href="https://localhost:9000" target="_blank">https://localhost:9000</a> if you see the
                            FEMR<br></br>
                            &nbsp;&nbsp;&nbsp;&nbsp;login page, success!
                            <br></br>
                        </pre>
                    </center>
                </div>
            </body>
        </html>
    )
}

export default FemrInstallationGuide;

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect } from "react";
import Plotly, { Layout, Data } from 'plotly.js';
import "./Statistics.css"
import { useAppDispatch } from "../../../redux/hooks";
import useService from "../../../hooks/useService";
import User from "../../../services/auth-aware/User";
import { init as initVacations } from '../../../redux/vacationsSlice'
import { init as initLikes } from '../../../redux/followingSlice'

export default function Statistics(): JSX.Element {
    const likesReduxState = useSelector((state: RootState) => state.following.likes);
    const vacationsState = useSelector((state: RootState) => state.vacations.vacations);
    const dispatch = useAppDispatch()
    const userService = useService(User)

    //if the user reloads, this will init the data
    useEffect(() => {
        (async () => {
            try {
                if (vacationsState.length === 0) {
                    const vacationsFromServerBeforeSort = await userService.getAllVacations()
                    const vacationsFromServer = vacationsFromServerBeforeSort.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
                    dispatch(initVacations(vacationsFromServer))
                    const likesFromServer = await userService.getAllLikes()
                    dispatch(initLikes(likesFromServer))
                }
            } catch (e) {
                alert(e)
            }
        })()
    }, [dispatch, userService, vacationsState.length])

    // useEffect to render Plotly once the data is available
    useEffect(() => {
        // Step 1: Extract vacation destinations
        const destinations = vacationsState.map(v => v.destination);

        // Step 2: Count the number of likes for each destination
        const likeCounts = destinations.map(destination => {
            const vacationId = vacationsState.find(v => v.destination === destination)?.id;
            if (vacationId) {
                const count = likesReduxState.filter(like => like.vacationId === vacationId).length;
                return count;
            }
            return 0;
        });

        // Step 3: Create Plotly data trace
        const trace1: Data = {
            type: 'bar',
            x: destinations,  // vacation destinations on the x-axis
            y: likeCounts,     // like counts on the y-axis
            marker: {
                color: '#C8A2C8',
                line: {
                    width: 2.5
                }
            }
        };

        const data: Data[] = [trace1];

        // Step 4: Create a layout with Partial<Layout> to avoid required props error
        const layout: Partial<Layout> = {
            title: {
                text: "Admin Statistics: Likes Per Vacation", // Title text explicitly set here
                font: {
                    size: 24,  // Customize the title font size if necessary
                    family: 'Arial, sans-serif' // Customize font family if desired
                },
                x: 0.5,  // Center the title horizontally
                xanchor: 'center' // Center the title on the chart
            },
            xaxis: {
                title: "Destinations",
            },
            yaxis: {
                title: "Number of Likes"
            },
            margin: {
                t: 60  // Top margin to ensure title fits properly
            }
        };

        // Step 5: Render Plotly chart
        Plotly.newPlot('graphDiv', data, layout);
    }, [likesReduxState, vacationsState]);  // Re-run when vacationsState or likesReduxState changes

    const exportCSV = () => {
        // Extract vacation destinations and like counts
        const destinations = vacationsState.map(v => v.destination);
        const likeCounts = destinations.map(destination => {
            const vacationId = vacationsState.find(v => v.destination === destination)?.id;
            if (vacationId) {
                const count = likesReduxState.filter(like => like.vacationId === vacationId).length;
                return count;
            }
            return 0;
        });

        // Create CSV string
        let csvContent = "Destination,Likes\n";
        destinations.forEach((destination, index) => {
            csvContent += `${destination},${likeCounts[index]}\n`;
        });

        // Create a Blob object to download the file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "vacation_likes.csv";  // Set the file name for the download
        link.click();
    };


    return (
        <div className="plotly">
            <div id="graphDiv" style={{ width: '100%', height: '400px' }}></div>
            <button onClick={exportCSV} style={{ marginTop: '20px' }}>
                Export Data to CSV
            </button>
            <br />
        </div>
    );
}

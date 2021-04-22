import React from 'react'
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ServeModelViewer from './components/ServeModelViewer'

export default () => {
    return (
        <ServeModelViewer 
            stats
            backgroundScene
            rollScene
            orbitControls
            bgColor = {'black'}
            lidar
            lidarOnly
            powerEfficiencyMode
        />
        // <Router>
        //     <Switch>
        //         <Route path='/demo'>
        //             <ServeModelViewer 
        //                 // stats
        //                 backgroundScene
        //                 rollScene
        //                 orbitControls
        //                 customizer
        //                 // bgColor = {'green'}
        //                 powerEfficiencyMode
        //             />
        //         </Route>
        //         <Route path='/'>
        //             <ServeModelViewer 
        //                 // stats
        //                 orbitControls
        //                 customizer
        //                 // bgColor = {'green'}
        //                 powerEfficiencyMode
        //             />
        //         </Route>
        //     </Switch>
        // </Router>
    )
}
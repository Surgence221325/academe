import React, { Component } from 'react'

import integralimg from '../Components/public/image/integral.png'
import java from '../Components/public/image/java.png'
import csharp from '../Components/public/image/csharp.png'
import coop from '../Components/public/image/coop.jpeg'






class Project extends Component {
    render() {
        return (
       
            <section id="skillheader" className="flex-project-container">
                    
                    <div><img src={java} width="140" height="100" alt="js"/></div>
                    <div><img src={integralimg} width="120" height="100" alt="integral calculus"/></div>
                    <div><img src={csharp} width="150" height="95" alt="csharp"/></div>  
                    <div><img src={coop} width="100" height="100" alt="coop"/></div>
                    
            </section>
        )
    }
}

export default Project

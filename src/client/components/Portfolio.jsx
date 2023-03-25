import React, { Component } from 'react'
import racket from '../Components/public/image/racket.png';
import calculus from '../Components/public/image/calculus.png';
import discrete from '../Components/public/image/discrete.png';
import chemistry from '../Components/public/image/chemistry.png';
import biology from '../Components/public/image/biology.png';






class Portfolio extends Component {
    render() {
        return (
            
            <section id="skillheader" className="flex-project-container">

                    <div><img src={racket} width="100" height="100" alt="js"/></div>
                    <div><img src={calculus} width="100" height="100" alt="integral calculus"/></div>
                    <div><img src={discrete} width="120" height="80" alt="html"/></div>  
                    <div><img src={chemistry} width="110" height="110" alt="css"/></div>
                    <div><img src={biology} width="110" height="110" alt="css"/></div>

                       
            </section>
        )
    }
}

export default Portfolio



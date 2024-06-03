import React from 'react';
import Navbar from '../subcomponents/navbar/Navbar';
import ReactFullpage from "@fullpage/react-fullpage";
import Google from "../subcomponents/googleMaps/Google.jsx"
import Footer from "../subcomponents/footer/Footer.jsx"

import './Home.css';



const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const originalColors = [
    "#ff5f45",
    "#f19b9b",
    "#fc6c7c",
    "#435b71",
    "orange",
    "blue",
    "purple",
    "yellow"
];

const pluginWrapper = () => {
    /*
     * require('./fullpage.fadingEffect.min'); // Optional. Required when using the "fadingEffect" extension.
     */
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionsColor: [],
            fullpages: [
                {
                    text:
                        <>
                            <h1 className="titulo">
                                ¡Bienvenido a importaciones ciclopista!
                            </h1>

                            <h2 className="subtitulo">Venta de repuestos para bicicletas<br />al detal y al por mayor</h2>
                        </>

                },
                {
                    text: <>

                        <div className="slide">
                            <img className="" src="https://firebasestorage.googleapis.com/v0/b/ciclopista.appspot.com/o/decorative%2Fsilla.png?alt=media&token=5fb3be6e-315f-4d13-93f3-df04c0ccdc87" alt="Sillín"></img>
                        </div>

                        <div className="slide">
                            <img className="slide-image" src="https://firebasestorage.googleapis.com/v0/b/ciclopista.appspot.com/o/decorative%2Frelaci%C3%B3n.png?alt=media&token=9351b8d3-6a9f-4889-b425-56987729bd24" alt="Relación 58 cp"></img>
                        </div>

                        <div className="slide">
                            <img className="slide-image" src="https://firebasestorage.googleapis.com/v0/b/ciclopista.appspot.com/o/decorative%2Fintegrado.png?alt=media&token=79e1b4b9-17b9-4421-b3b2-5f89ead2d026" alt="Relación integrada cp"></img>
                        </div>

                    </>
                },
                {

                    text:
                        <>
                            <Google/>
                            <Footer /></>


                }
            ]
        };
    }

    onLeave(origin, destination, direction) {
        console.log("onLeave", { origin, destination, direction });
        // arguments are mapped in order of fullpage.js callback arguments do something
        // with the event
    }

    render() {
        const { fullpages } = this.state;

        if (!fullpages.length) {
            return null;
        }

        const Menu = () => (
            <><div>
                <Navbar/>
            </div></>
        );

        return (
            <div className="App">
                <Menu />
                <ReactFullpage
                    debug /* Debug logging */
                    // Required when using extensions
                    pluginWrapper={pluginWrapper}
                    // fullpage options
                    licenseKey={"YOUR_KEY_HERE"} // Get one from https://alvarotrigo.com/fullPage/pricing/
                    navigation
                    anchors={["firstPage", "secondPage", "thirdPage"]}
                    sectionSelector={SECTION_SEL}
                    onLeave={this.onLeave.bind(this)}
                    sectionsColor={this.state.sectionsColor}
                    render={(comp) => (
                        <ReactFullpage.Wrapper>
                            {fullpages.map(({ text }) => (
                                <>
                                    <div key={text} className={SEL}>

                                        {text}
                                    </div></>
                            ))}
                        </ReactFullpage.Wrapper>
                    )}
                />
            </div>
        );
    }
}

export default Home;

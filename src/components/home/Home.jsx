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
                            <img className="slide-image" src="https://firebasestorage.googleapis.com/v0/b/ciclopista.appspot.com/o/decorative%2Fsillin.png?alt=media&token=78c0cb89-65b8-4af3-8019-56ab0041b65a" alt="Sillín"></img>
                        </div>

                        <div className="slide">
                            <img className="slide-image" src="https://firebasestorage.googleapis.com/v0/b/ciclopista.appspot.com/o/decorative%2Farmador.png?alt=media&token=385972bd-c454-46f4-924a-9b397e36b660" alt="Armador De Bicicletas"></img>
                        </div>

                        <div className="slide">
                            <img className="slide-image" src="https://firebasestorage.googleapis.com/v0/b/ciclopista.appspot.com/o/decorative%2Fintegrada.png?alt=media&token=32d8757c-b83b-4907-bd21-42e1a758da1f" alt="Relación integrada cp"></img>
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

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

const topics = [
    { id: "topic1", title: "Topic 1" },
    { id: "topic2", title: "Topic 2" },
    { id: "topic3", title: "Topic 3" },
    { id: "topic4", title: "Topic 4" },
    { id: "topic5", title: "Topic 5" },
    { id: "topic6", title: "Topic 6" },
    { id: "topic7", title: "Topic 7" },
    { id: "topic8", title: "Topic 8" },
    { id: "topic9", title: "Topic 9" },
    { id: "topic10", title: "Topic 10" },
];



const ScrollNavbar = () => {
    const [activeTopic, setActiveTopic] = useState("");
    const topicRefs = useRef({});
    // const dataRef=useRef();
    const {ref:dataRef,inView :showingPara}=useInView();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {
                   
                    if (entry.isIntersecting) {
                        console.log("Entry");
                        console.log(entry);
                        setActiveTopic(entry.target.id);
                    }
                });
            },
            { threshold: 0.10 } // Trigger when 50% of section is visible
        );

        Object.values(topicRefs.current).forEach((section) => {
            console.log(section)
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            {/* Navbar */}
            <nav style={{ 
                position: "fixed", 
                top: 0, 
                width: "100%", 
                background: "#333", 
                color: "#fff", 
                padding: "10px", 
                display: "flex", 
                justifyContent: "center",
                gap: "10px"
            }}>
                {topics.map(({ id, title }) => (
                    <a 
                        key={id} 
                        href={`#${id}`} 
                        style={{
                            color: activeTopic === id ? "yellow" : "#fff",
                            textDecoration: "none",
                            fontWeight: activeTopic === id ? "bold" : "normal"
                        }}
                    >
                        {title}
                    </a>
                ))}
            </nav>

            {/* Content */}
            <div style={{ paddingTop: "50px" }}> {/* Offset for navbar */}
                {topics.map(({ id, title }) => (
                    <section
                        key={id}
                        id={id}
                        ref={(el) => (topicRefs.current[id] = el)}
                        style={{
                            height: "100vh",
                            padding: "20px",
                            borderBottom: "1px solid #ddd"
                        }}
                    >
                        <h2>{title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. 
                            Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc 
                            ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante 
                            ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; 
                            Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, 
                            in fringilla mi purus sit amet erat.
                        </p>
                    </section>
                ))}
            </div>
            <div>
                <div ref={dataRef}>
                npm warn     @testing-library/react@"^13.4.0" from the root project

added 1 package, and audited 1406 packages in 9s

271 packages are looking for funding
  run `npm fund` for details

10 vulnerabilities (4 moderate, 6 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
PS E:\personal projects\eCommerce-Website-main\eCommerce
                </div>
                <h1>{showingPara?"Yukenthiran":"none"}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.</p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Integer aliquet, orci in bibendum luctus, turpis nunc ullamcorper orci, sit amet tincidunt nisi justo et urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis euismod, felis eget dapibus volutpat, lorem ipsum lacinia libero, in fringilla mi purus sit amet erat.    
            </div>
        </div>

    );
};

export default ScrollNavbar;

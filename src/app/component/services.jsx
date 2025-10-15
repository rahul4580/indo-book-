import React from 'react';


 function services(){
    // Flip-card UI: Skills appear only on hover; front face otherwise
    // Using inline styles for a pure JSX approach; no external CSS needed


    const cardStyle = {
        perspective: '1200px',
        width: '230px',
        height: '310px',
        cursor: 'pointer',
    };

    const innerStyle = {
        // position: 'relative',
        width: '100%',
        height: '100%',
        transition: 'transform 0.5s cubic-bezier(.26,1.05,.72,1.02)',
        transformStyle: 'preserve-3d',
    };

    const faceCommon = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        borderRadius: '20px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: "32px 20px",
        backfaceVisibility: 'hidden',
    };

    const backFaceStyle = {
        ...faceCommon,
        transform: 'rotateY(180deg)',
        justifyContent: 'flex-start',
        padding: "32px 20px",
    };

    function FlipCard({ icon, title, skills }) {
      const [hovered, setHovered] = React.useState(false);

      return (
        <div
          style={cardStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            style={{
              ...innerStyle,
              transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front Face */}
            <div style={faceCommon}>
                <span role="img" aria-label={title.toLowerCase()} style={{fontSize: "2.5em", marginBottom: "18px"}}>{icon}</span>
                <h3 style={{fontWeight: 700, fontSize: "1.4em"}}>{title}</h3>
            </div>
            {/* Back Face (skills list) */}
            <div style={backFaceStyle}>
                <h3 style={{fontWeight: 700, fontSize: "1.2em", marginBottom: "15px"}}>{title} Skills</h3>
                <ul style={{padding: 0, margin: 0, listStyleType: "none", fontSize: "1em"}}>
                    {skills.map((skill, i) => <li key={i} style={{marginBottom:"3px"}}>{skill}</li>)}
                </ul>
            </div>
          </div>
        </div>
      );
    }

    return (
        <div style={{
            backgroundColor: "#f5f5f5",
            width: "100%",
            height: "60vh",
            color: "#222"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                gap: "40px"
            }}>
                <FlipCard
                   icon={<img src="https://imgs.search.brave.com/nBCFm0hfw6HuNj_JNrPcFqGAWg6Uj3RqJKYPMb5dEqo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/aWNvbnM4LmNvbS8_/c2l6ZT0xMjAwJmlk/PU5mYnlIZXh6VkVE/ayZmb3JtYXQ9anBn" alt="Data Analyst Icon" style={{ width: "2em", height: "2em" }} />}
                
                  title="Front End"
                  skills={[
                    "React.js, Next.js",
                    "HTML5, CSS3, SASS",
                    "Responsive Design",
                    "UI/UX Focused",
                    "Animation, Interactivity"
                  ]}
                />
                <FlipCard
                  icon={<img src="https://imgs.search.brave.com/1AKg2ZWpRvO84bSMdSqRwLsn2HrBWRiHkHCA1Mp_FVw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS12/ZWN0b3Ivbm9kZS1q/cy1mcmFtZXdvcmst/d2ViLWRldmVsb3Bt/ZW50LTI2MG53LTE3/NDA4MTEyODYuanBn" alt="Data Analyst Icon" style={{ width: "2em", height: "2em" }} />}
                
                  title="Back End"
                  skills={[
                    "Node.js, Express.js",
                    "API Development",
                    "Authentication, Security",
                    "Database Integrations",
                    "DevOps Basics"
                  ]}
                />
                <FlipCard
                  icon={<img src="https://imgs.search.brave.com/37j9GcoR8p4sjmGPaXFzkDFcMWdHdIDqFX_FsQ4pAgY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2M0LzE0/L2RiL2M0MTRkYmVi/YmQxNWY4Y2UzZGM2/YjAxNzQ5ODEwZWM2/LmpwZw" alt="Data Analyst Icon" style={{ width: "2em", height: "2em" }} />}
                
                  title="Full Stack"
                  skills={[
                    "MERN Stack",
                    "End-to-End Solutions",
                    "REST, GraphQL",
                    "Deployment & Workflows",
                    "Project Architecture"
                  ]}
                />
                <FlipCard
                  icon={<img src="https://imgs.search.brave.com/E06YUimU8Nzcj2F8Yh1CIPC7JGvqsP81S96Ar0WPzlg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMjE3Ni8xMjE3/Njg0OS5wbmc_c2Vt/dD1haXNfd2hpdGVf/bGFiZWw" alt="Data Analyst Icon" style={{ width: "2em", height: "2em" }} />}
                  title="Data Analyst"
                  skills={[
                    "Data Processing",
                    "Visualization (Charts, Dashboards)",
                    "SQL & NoSQL",
                    "Reporting & Insights",
                    "Python, Pandas, Excel"
                  ]}
                />
            </div>
        </div>
    );
    
}

export default services;

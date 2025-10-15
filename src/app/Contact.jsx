// export default function Contact() {
  
// async function handleSubmit(event) {
//   event.preventDefault();

//   const form = event.target; // get the form reference
//   const formData = new FormData(form);

//   formData.append("access_key", "cac0db14-8c2f-4f4e-b193-4c4b1edc2189");

//   const object = Object.fromEntries(formData);
//   const json = JSON.stringify(object);

//   try {
//     const response = await fetch("https://api.web3forms.com/submit", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       body: json
//     });

//     const result = await response.json();

//     if (result.success) {
//       alert("Message sent successfully ✅");
//       form.reset(); // ✅ clears all input fields
//     } else {
//       alert("Something went wrong ❌. Please try again.");
//     }

//   } catch (error) {
//     alert("Error sending message ❌");
//     console.error(error);
//   }
// }



// return (
//   <>
//     <form 
//       onSubmit={handleSubmit} 
    
//     >
//       <input
//     type="text"
//     name="name"
//     placeholder="Your Name"
//     style={{
//       width: "100%",
//       padding: "0.8rem 0",
//       marginBottom: "1.5rem",
//       border: "none",
//       borderBottom: "2px solid #000",
//       backgroundColor: "#fff",
//       color: "#000",
//       fontSize: "1rem",
//       outline: "none",
//       transition: "border-color 0.3s",
//     }}
//     onFocus={(e) => (e.target.style.borderBottomColor = "#000")}
//     onBlur={(e) => (e.target.style.borderBottomColor = "#000")}
//   />

//   <input
//     type="email"
//     name="email"
//     placeholder="Your Email"
//     style={{
//       width: "100%",
//       padding: "0.8rem 0",
//       marginBottom: "1.5rem",
//       border: "none",
//       borderBottom: "2px solid #000",
//       backgroundColor: "#fff",
//       color: "#000",
//       fontSize: "1rem",
//       outline: "none",
//       transition: "border-color 0.3s",
//     }}
//     onFocus={(e) => (e.target.style.borderBottomColor = "#000")}
//     onBlur={(e) => (e.target.style.borderBottomColor = "#000")}
//   />

//   <textarea
//     name="message"
//     placeholder="Your Message"
//     rows={5}
//     style={{
//       width: "100%",
//       padding: "0.8rem 0",
//       marginBottom: "1.5rem",
//       border: "none",
//       borderBottom: "2px solid #000",
//       backgroundColor: "#fff",
//       color: "#000",
//       fontSize: "1rem",
//       resize: "vertical",
//       outline: "none",
//       transition: "border-color 0.3s",
//     }}
//     onFocus={(e) => (e.target.style.borderBottomColor = "#000")}
//     onBlur={(e) => (e.target.style.borderBottomColor = "#000")}
//   ></textarea>

//   <button
//     type="submit"
//     style={{
//       width: "19%",
//       padding: "0.9rem",
//       borderRadius: "8px",
//       border: "1px solid #000",
//       backgroundColor: "#000",
//       color: "#fff",
//       fontSize: "1rem",
//       fontWeight: "bold",
//       cursor: "pointer",
//       transition: "all 0.3s",
//       marginLeft: "auto",
//       display: "block"
//     }}
//     onMouseOver={(e) => {
//       e.target.style.backgroundColor = "#fff";
//       e.target.style.color = "#000";
//     }}
//     onMouseOut={(e) => {
//       e.target.style.backgroundColor = "#000";
//       e.target.style.color = "#fff";
//     }}
//   // onClick={hh}
//   >
//     Submit
//   </button>
//     </form>
//   </>
// );
// }




export default function Contact() {
  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // ✅ Add your Web3Forms access key
    formData.append("access_key", "cac0db14-8c2f-4f4e-b193-4c4b1edc2189");

    // ✅ Add your Gmail (hidden — user won’t see it)
    formData.append("email", "kumararahul795@gmail.com");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        alert("Message sent successfully ✅");
        form.reset(); // ✅ clears all fields
      } else {
        alert("Something went wrong ❌. Please try again.");
      }
    } catch (error) {
      alert("Error sending message ❌");
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Hidden email field (not visible to user) */}
        <input type="hidden" name="email" value="kumararahul795@gmail.com" />

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          style={{
            width: "100%",
            padding: "0.8rem 0",
            marginBottom: "1.5rem",
            border: "none",
            borderBottom: "2px solid #000",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderBottomColor = "#000")}
          onBlur={(e) => (e.target.style.borderBottomColor = "#000")}
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          required
          style={{
            width: "100%",
            padding: "0.8rem 0",
            marginBottom: "1.5rem",
            border: "none",
            borderBottom: "2px solid #000",
            backgroundColor: "#fff",
            color: "#000",
            fontSize: "1rem",
            resize: "vertical",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderBottomColor = "#000")}
          onBlur={(e) => (e.target.style.borderBottomColor = "#000")}
        ></textarea>

        <button
          type="submit"
          style={{
            width: "25%",
            padding: "0.9rem",
            borderRadius: "8px",
            border: "1px solid #000",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s",
            marginLeft: "auto",
            display: "block",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#fff";
            e.target.style.color = "#000";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#000";
            e.target.style.color = "#fff";
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
}

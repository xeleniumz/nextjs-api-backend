import { useEffect, useRef,useState } from "react";

const HomePage = () => {

  const [feedbackItems, setFeedbackItems] = useState([]);
  const emailRef = useRef();
  const feedbackRef = useRef();

  const fetchData = () => {
    fetch("/api/feedback", {
      method: "GET",
    }).then((res) => res.json())
      .then((data) => setFeedbackItems(data.feedback))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;
    fetch("/api/feedback", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        feedback: enteredFeedback,
      }),
    }).then((res) => res.json())
      .then((data) => setFeedbackItems(data.feedback))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={fetchData}> Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.email} - {item.feedback}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
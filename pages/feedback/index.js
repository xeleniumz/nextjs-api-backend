import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

const IndexPage = (props) => {
    const [feedbackData, setFeedbackData] = useState();
    const loadFeedback = (id) => {
        fetch(`/api/${id}`)
            .then((res) => res.json())
            .then((data) => setFeedbackData(data.feedback))
            .catch((err) => console.log(err));
    }
    return ( 
        <Fragment>
            {feedbackData && <p>{feedbackData.email}</p>}
            <ul>
                {
                    props.feedbackItems.map((item) => (
                        <li
                            key={item.id}
                        >
                            {item.email} - {item.feedback}
                            <button
                                onClick={(() => loadFeedback(item.id))}
                            >
                                Show Details
                            </button>
                        </li>
                    ))
                }
            </ul>
        </Fragment>
    )
};

export const getStaticProps = () => {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data
        }
    }
};
export default IndexPage;
import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";

const Note = props => {
  const [note, setNote] = useState(null);

  console.log("props >>>>>", props);
  console.log("props >>>>>", props.match.params.id);

  useEffect(() => {
    async function getNote() {
      const res = await API.get("notes/" + props.match.params.id)
        .then(res => console.log("note", res))
        .catch(err => console.log("err", err));
    }
    getNote();
  }, []);

  return (
    <div>
      <h3>hello</h3>
    </div>
  );
};

export default Note;

import React, { useState, FormEvent } from "react";

import TextField from '@material-ui/core/TextField';
import { green } from "@material-ui/core/colors";

import AuthRequired from "components/AuthRequired";
import { useQuery } from "libs/Url";
import { getWorkerDetail, createNewMatching } from "libs/ServerClient"

export default function Create() {
  const query = useQuery();
  const [inquiry, setInquiry] = useState("");
  const workerId = query.get("worker");
  const worker = workerId ? getWorkerDetail(workerId) : null;

  const onSubmitButtonClicked = (e: FormEvent) => {
    e.preventDefault();
    if (workerId && inquiry) {
      const createResult = createNewMatching(inquiry, workerId);
      window.location.href = `/matching/${createResult.id}`
    }
  };

  return (
    <AuthRequired>
      <>
        マッチングページ

        {worker ?
          <>
            <h3>企業名</h3>
            <p>{worker.companyName}</p>

            <h3>職種</h3>
            <p>{worker.jobName} {worker.verified ? <b style={{ color: green[800] }}>認証済み</b> : null}</p>

            <h3>コメント</h3>
            <p>{worker.comment}</p>

            <form onSubmit={onSubmitButtonClicked}>
              <TextField
                required
                id="outlined-required"
                label="相談内容"
                variant="outlined"
                onChange={(event) => setInquiry(event.target.value)}
                style={{ width: "100%" }}
              />
              <button
                type="submit"
                onClick={onSubmitButtonClicked}
                style={{ margin: "10px 0", float: "right" }}
                disabled={!(workerId && inquiry)}
              >
                依頼する
              </button>
            </form>
          </> : <>
            <p>URLが正しくありません。</p>
          </>
        }
      </>
    </AuthRequired>
  );
}
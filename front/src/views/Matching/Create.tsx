import React, { FormEvent } from "react";

import TextField from '@material-ui/core/TextField';
import { green } from "@material-ui/core/colors";

import AuthRequired from "components/AuthRequired";
import { useQuery } from "libs/Url";

const getWorkerDetail = (id: string) => {
  return {
    id,
    jobName: "サーバーサイドエンジニア",
    companyName: "Sansan株式会社",
    verified: true,
    comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
  }
};

export default function Create() {
  const query = useQuery();
  const workerId = query.get("worker");
  const worker = workerId ? getWorkerDetail(workerId) : null;

  const onSubmitButtonClicked = (e: FormEvent) => {
    e.preventDefault();

    // workerId
    // inquiry: 相談内容
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
                style={{ width: "100%" }}
              />
              <button
                type="submit"
                onClick={onSubmitButtonClicked}
                style={{ margin: "10px 0", float: "right" }}
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

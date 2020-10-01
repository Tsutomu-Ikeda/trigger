import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import { green } from "@material-ui/core/colors";

import AuthRequired from "components/AuthRequired";
import { useParams } from "libs/Url";
import { getCompanyDetail } from "libs/ServerClient";

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

export default function Company() {
  const { id: companyId } = useParams() as { id: string };
  const [company, setCompany] = useState(null as {
    name: string;
    id: string;
    workersRegistered: number;
    workers: {
      id: string;
      job: { name: string };
      isAuthenticated: boolean;
      comment: string;
    }[];
  } | null);

  useEffect(
    () => { (async () => { setCompany(await getCompanyDetail(companyId)) })() }
    , []
  )

  return (
    <AuthRequired>
      <>
        企業詳細ページ
        { company && <> <Typography color="inherit" variant="h5" component="h2">
          {company.name}
        </Typography>

        登録済み社員数: {company.workersRegistered}

          {/* ユーザーを絞り込み */}

          <Divider style={{ marginTop: 20 }} />

          <List component="nav" aria-label="main mailbox folders">
            {company.workers.map((worker, index) =>
              <ListItemLink key={index} href={`/matching/create?worker=${worker.id}`}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<>{worker.job.name} {worker.isAuthenticated ? <b style={{ color: green[800] }}>認証済み</b> : null}</>}
                  secondary={worker.comment}
                />
              </ListItemLink>)}
          </List>
          {/* { company.workersRegistered > company.workers.length ?
            <button
              onClick={onMoreWorkersClick}
              style={{ margin: "10px 0", float: "right" }}
            >
              もっと見る
          </button>
            : null} */}
        </>}
      </>
    </AuthRequired>
  );
};

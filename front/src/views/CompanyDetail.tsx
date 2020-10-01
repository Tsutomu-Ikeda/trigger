import React, { useState } from "react";
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
import { getCompanyDetail, getMoreWorkers } from "libs/ServerClient";

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

export default function Company() {
  const { id: companyId } = useParams() as { id: string };
  const [company, setCompany] = useState(getCompanyDetail(companyId));

  const onMoreWorkersClick = () => {
    setCompany({
      ...company,
      workers: [...company.workers, ...getMoreWorkers(companyId, company.workers.length)]
    });
  }

  return (
    <AuthRequired>
      <>
        企業詳細ページ
        <Typography color="inherit" variant="h5" component="h2">
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
                primary={<>{worker.jobName} {worker.verified ? <b style={{ color: green[800] }}>認証済み</b> : null}</>}
                secondary={worker.comment}
              />
            </ListItemLink>)}
        </List>
        { company.workersRegistered > company.workers.length ?
          <button
            onClick={onMoreWorkersClick}
            style={{ margin: "10px 0", float: "right" }}
          >
            もっと見る
          </button>
          : null}
      </>
    </AuthRequired>
  );
};
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

const getCompanyDetail = (id: string) => {
  return {
    name: "Hoge 株式会社",
    id: id,
    workersRegistered: 12,
    workers: [{
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "サーバーサイドエンジニア",
      verified: false,
      comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    }, {
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "iOSエンジニア",
      verified: true,
      comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    }, {
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "フロントエンドエンジニア",
      verified: true,
      comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    }, {
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "インフラエンジニア",
      verified: true,
      comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    }, {
      id: "45bc28ee-1776-44af-bc07-9314ce22a909",
      jobName: "研究開発職",
      verified: false,
      comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
    }]
  }
};

const getMoreWorkers = (comapnyId: string, offset: number) => {
  return [{
    id: "45bc28ee-1776-44af-bc07-9314ce22a909",
    jobName: "サーバーサイドエンジニア",
    verified: false,
    comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
  }, {
    id: "45bc28ee-1776-44af-bc07-9314ce22a909",
    jobName: "iOSエンジニア",
    verified: true,
    comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
  }, {
    id: "45bc28ee-1776-44af-bc07-9314ce22a909",
    jobName: "フロントエンドエンジニア",
    verified: true,
    comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
  }, {
    id: "45bc28ee-1776-44af-bc07-9314ce22a909",
    jobName: "インフラエンジニア",
    verified: true,
    comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
  }, {
    id: "45bc28ee-1776-44af-bc07-9314ce22a909",
    jobName: "研究開発職",
    verified: false,
    comment: "がんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばりますがんばります",
  }];
}


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
          <button onClick={onMoreWorkersClick}>もっと見る</button> : null}
      </>
    </AuthRequired>
  );
}

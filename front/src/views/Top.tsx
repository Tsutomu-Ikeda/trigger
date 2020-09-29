import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { green, red } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import PaymentIcon from '@material-ui/icons/Payment';
import DoneIcon from '@material-ui/icons/Done';

import AuthRequired from "../components/AuthRequired";
import { convertDateTime, convertDurationDateTime } from '../libs/DateTime';
import { commafy } from '../libs/Number';

type PaymentStatus = "finished" | "pending" | "error";

const upcomingEvents = [{
  startDate: new Date("2020-09-26 12:00:00"),
  endDate: new Date("2020-09-26 13:00:00"),
  companyName: "Sansan株式会社",
  matchingId: "4c2ce54d-5a53-46e9-ae8b-7ca4bacab6a5",
  payment: {
    status: "finished" as PaymentStatus,
    amount: 1000,
    date: new Date("2020-09-23 23:31:12"),
    dueDate: null,
  },
}, {
  startDate: new Date("2020-09-29 18:00:00"),
  endDate: new Date("2020-09-29 19:00:00"),
  matchingId: "0c853551-193d-437c-8b53-c266963d9102",
  companyName: "ClipLine株式会社",
  payment: {
    status: "pending" as PaymentStatus,
    amount: 1000,
    date: null,
    dueDate: new Date("2020-09-26 18:00:00"),
  },
}];

const recentPayments = [{
  date: new Date("2020-09-23 23:31:12"),
  companyName: "Sansan株式会社",
  matchingId: "4c2ce54d-5a53-46e9-ae8b-7ca4bacab6a5",
  status: "finished" as PaymentStatus,
  amount: 1000,
  dueDate: null,
}, {
  date: new Date("2020-09-07 11:24:41"),
  companyName: "ビズリーチ株式会社",
  matchingId: "a8735832-c63b-4b9a-a050-a7309866af42",
  status: "finished" as PaymentStatus,
  amount: 1000,
  dueDate: null,
}, {
  date: new Date("2020-08-23 14:25:30"),
  companyName: "freee株式会社",
  matchingId: "6b12fb3e-296f-4384-ba19-b15a7c7134fc",
  status: "finished" as PaymentStatus,
  amount: 1000,
  dueDate: null,
}];

const PaymentStatus = ({ event }: { event: { payment: { status: PaymentStatus } } }) => {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  switch (event.payment.status) {
    case "finished":
      return <Tooltip title="支払い済み"
        open={tooltipIsOpen}
        onOpen={() => setTooltipIsOpen(true)}
        onClose={() => setTooltipIsOpen(false)}>
        <IconButton edge="end" onClick={() => setTooltipIsOpen(!tooltipIsOpen)}>
          <DoneIcon style={{ color: green[700] }} />
        </IconButton>
      </Tooltip>;
    case "pending":
      return <Tooltip title="未支払い"
        open={tooltipIsOpen}
        onOpen={() => setTooltipIsOpen(true)}
        onClose={() => setTooltipIsOpen(false)}>
        <IconButton edge="end" onClick={() => setTooltipIsOpen(!tooltipIsOpen)}>
          <PaymentIcon style={{ color: red[700] }} />
        </IconButton>
      </Tooltip>;
    default:
      return null;
  }
};

function ListItemLink(props: any) {
  return <ListItem button component="a" {...props} />;
}

export default function Top() {
  return (
    <AuthRequired>
      <>
        <Typography color="inherit" variant="h5" component="h2">面談予定</Typography>

        <List component="nav" aria-label="main mailbox folders">
          {upcomingEvents.map((event, index) =>
            <ListItemLink key={index} href={`/matching/${event.matchingId}`}>
              <ListItemText
                primary={event.companyName}
                secondary={convertDurationDateTime(event.startDate, event.endDate)}
              />
              <ListItemSecondaryAction>
                <PaymentStatus event={event} />
              </ListItemSecondaryAction>
            </ListItemLink>)}
        </List>
        <Typography color="inherit" variant="h5" component="h2">購入履歴</Typography>

        <List component="nav" aria-label="main mailbox folders">
          {recentPayments.map((payment, index) =>
            <ListItemLink key={index} href={`/matching/${payment.matchingId}`}>
              <ListItemText
                primary={payment.companyName}
                secondary={convertDateTime(payment.date)}
              />
              <ListItemSecondaryAction>
                {commafy(payment.amount)}円
              </ListItemSecondaryAction>
            </ListItemLink>)}
        </List>
      </>
    </AuthRequired>
  );
}

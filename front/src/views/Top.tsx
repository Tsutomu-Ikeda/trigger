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

import AuthRequired from "components/AuthRequired";
import { convertDateTime, convertDurationDateTime } from 'libs/DateTime';
import { commafy } from 'libs/Number';
import { getUpcomingEvents, getRecentPayments, PaymentStatusType } from "libs/ServerClient";

const PaymentStatus = ({ event }: { event: { payment: { status: PaymentStatusType } } }) => {
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
  const recentPayments = getRecentPayments();
  const upcomingEvents = getUpcomingEvents();

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

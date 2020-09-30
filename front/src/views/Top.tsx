import React from "react";
import Typography from "@material-ui/core/Typography";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import AuthRequired from "components/AuthRequired";
import PaymentStatus from "components/PaymentStatus";
import { convertDateTime, convertDurationDateTime } from 'libs/DateTime';
import { commafy } from 'libs/Number';
import { getUpcomingEvents, getRecentPayments } from "libs/ServerClient";

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
                <PaymentStatus payment={event.payment} />
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

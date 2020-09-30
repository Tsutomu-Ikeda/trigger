import React, { useState } from "react";
import { green, red } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PaymentIcon from '@material-ui/icons/Payment';
import DoneIcon from '@material-ui/icons/Done';

import { PaymentStatusType } from "libs/ServerClient";

export default function PaymentStatus({ payment }: { payment: { status: PaymentStatusType } }) {
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

  switch (payment.status) {
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

export function PaymentStatusSmall({ payment }: { payment: { status: PaymentStatusType } }) {

  switch (payment.status) {
    case "finished":
      return <b style={{ color: green[800] }}>支払い済み</b>;
    case "pending":
      return <b style={{ color: red[800] }}>未支払い</b>
    default:
      return null;
  };
};

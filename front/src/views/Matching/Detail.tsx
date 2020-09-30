import React from "react";
import { green } from '@material-ui/core/colors';
import { Link } from "react-router-dom";

import AuthRequired from "components/AuthRequired";
import Chat from "components/Chat";
import { PaymentStatusSmall } from "components/PaymentStatus";
import { useParams } from "libs/Url";
import { commafy } from 'libs/Number';
import { convertDateTime, convertDurationDateTime } from 'libs/DateTime';
import { getMatchingDetail } from "libs/ServerClient";

export default function Detail() {
  const { id: matchingId } = useParams() as { id: string };
  const matching = getMatchingDetail(matchingId);

  return (
    <AuthRequired>
      <>
        <h3>相談者情報</h3>
        <p>{matching.speaker.companyName}</p>
        <p>{matching.speaker.jobName} {matching.speaker.verified && <b style={{ color: green[800] }}>認証済み</b>}</p>

        <h3>質問内容</h3>
        <p>{matching.inquiry}</p>

        <h3>日程</h3>
        <p>
          {
            matching.startDate && matching.endDate
              ? convertDurationDateTime(matching.startDate, matching.endDate)
              : "調整中"
          }
        </p>

        <h3>支払い</h3>
        <PaymentStatusSmall payment={matching.payment} />: {commafy(matching.payment.amount)}円 <br />
        {matching.payment.dueDate && <>支払期限: {convertDateTime(matching.payment.dueDate)} </>}
        {matching.payment.status === "pending" &&
          <Link
          to="#hoge"
          >
            支払いリンク
          </Link>
        }

        <h3>メッセージ</h3>
        <Chat roomId={matching.chatRoomId}/>
      </>
    </AuthRequired>
  );
};

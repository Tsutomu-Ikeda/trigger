import React, { useState } from "react";
import AuthRequired from "components/AuthRequired";
import { useParams } from "libs/Url";

export default function Detail() {
  const { id: matchingId } = useParams() as { id: string };

  return (
    <AuthRequired>
      <>
        マッチング詳細ページ
        <p>{matchingId}</p>
      </>
    </AuthRequired>
  );
};

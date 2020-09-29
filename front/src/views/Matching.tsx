import React from "react";

import AuthRequired from "../components/AuthRequired";

export default function Matching() {
  return (
    <AuthRequired>
      <>
        マッチングページ
      </>
    </AuthRequired>
  );
}

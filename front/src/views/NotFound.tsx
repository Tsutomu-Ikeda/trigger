import React from "react";

import AuthRequired from "components/AuthRequired";

export default function NotFound() {
  return (
    <AuthRequired>
      <>
        <div>
          お探しのページは見つかりませんでした。
       </div>
      </>
    </AuthRequired>
  );
}

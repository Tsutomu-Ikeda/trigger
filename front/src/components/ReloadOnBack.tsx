import React from "react";
import { useHistory } from 'react-router-dom';

const history = useHistory()

export default function ReloadOnBack() {
  return (<>
    {history}
  </>)
}
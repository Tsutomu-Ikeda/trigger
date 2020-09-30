import {
  useLocation
} from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useHistory() {
  return window.history;
}

export { useLocation, useParams } from "react-router-dom";

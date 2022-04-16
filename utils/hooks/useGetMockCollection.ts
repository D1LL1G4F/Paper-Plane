import useFirestore from "./useFirestore";
import {
  collection,
  FirestoreError,
  query,
  QuerySnapshot,
} from "@firebase/firestore";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { UseQueryResult } from "react-query";
import { ApiMock } from "../types";

const useGetMockCollection = (
  projectId: string,
  mockGroupId: string
): UseQueryResult<QuerySnapshot<ApiMock>, FirestoreError> => {
  const firestore = useFirestore();
  const ref = query(
    collection(
      firestore,
      `projects/${projectId}/mockGroupCollection/${mockGroupId}/mockCollection`
    )
  );
  return useFirestoreQuery(
    [`projects/${projectId}/mockGroupCollection/${mockGroupId}/mockCollection`],
    ref,
    {
      subscribe: true,
    }
  );
};

export default useGetMockCollection;

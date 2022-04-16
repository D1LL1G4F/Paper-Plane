import useFirestore from "./useFirestore";
import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  FirestoreError,
} from "@firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { UseQueryResult } from "react-query";
import { ApiMock } from "../types";

const useGetMockDocument = (
  projectId: string,
  mockGroupId: string,
  mockId?: string
): UseQueryResult<DocumentSnapshot<ApiMock>, FirestoreError> | null => {
  const firestore = useFirestore();
  const ref = doc(
    firestore,
    `projects/${projectId}/mockGroupCollection/${mockGroupId}/mockCollection`,
    mockId || "0"
  );
  const mock = useFirestoreDocument<ApiMock, DocumentSnapshot<ApiMock>>(
    [
      `projects/${projectId}/mockGroupCollection/${mockGroupId}/mockCollection`,
      mockId,
    ],
    ref as DocumentReference<ApiMock>
  );

  if (!mock) {
    return null;
  }
  return mock;
};

export default useGetMockDocument;

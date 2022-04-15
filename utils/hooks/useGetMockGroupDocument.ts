import useFirestore from "./useFirestore";
import {
  doc,
  DocumentReference,
  DocumentSnapshot,
  FirestoreError,
} from "@firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { UseQueryResult } from "react-query";
import { MockGroup } from "../types";

const useGetMockGroupDocument = (
  projectId: string,
  mockGroupId?: string
): UseQueryResult<DocumentSnapshot<MockGroup>, FirestoreError> | null => {
  const firestore = useFirestore();
  const ref = doc(
    firestore,
    `projects/${projectId}/mockGroupCollection`,
    mockGroupId || "0"
  );
  const mockGroup = useFirestoreDocument<
    MockGroup,
    DocumentSnapshot<MockGroup>
  >(
    [`projects/${projectId}/mockGroupCollection`, mockGroupId],
    ref as DocumentReference<MockGroup>
  );

  if (!mockGroupId) {
    return null;
  }
  return mockGroup;
};

export default useGetMockGroupDocument;

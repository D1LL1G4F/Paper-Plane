import useFirestore from "./useFirestore";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  FirestoreError,
  WithFieldValue,
} from "@firebase/firestore";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import { ApiMock } from "../types";
import { UseMutationResult } from "react-query";

/**
 * Mutates existing mock or adds a new one if mockId not provided
 */
const useMockMutation = (
  projectId: string,
  mockGroupId: string,
  mockId?: string
): UseMutationResult<
  void | DocumentReference<ApiMock>,
  FirestoreError,
  WithFieldValue<ApiMock>
> => {
  const firestore = useFirestore();
  const ref = collection(
    firestore,
    `projects/${projectId}/mockGroupCollection/${mockGroupId}/mockCollection`
  );
  const documentMutation = useFirestoreDocumentMutation<ApiMock>(
    doc<ApiMock>(ref as CollectionReference<ApiMock>, mockId || "0"),
    {
      merge: true,
    }
  );
  const collectionMutation = useFirestoreCollectionMutation<ApiMock>(
    ref as CollectionReference<ApiMock>
  );

  return mockId ? documentMutation : collectionMutation;
};

export default useMockMutation;

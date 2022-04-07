import { Alert, CheckCircle } from "@kiwicom/orbit-components/lib/icons";
import Tooltip from "@kiwicom/orbit-components/lib/Tooltip";
import { EndpointMockValidityEnum } from "../utils/types";

type EndpointMockValidityIconProps = {
  validity: EndpointMockValidityEnum;
};

const EndpointMockValidityIcon = ({
  validity,
}: EndpointMockValidityIconProps): JSX.Element => {
  const isValid = validity === EndpointMockValidityEnum.VALID;
  const isInvalid = validity === EndpointMockValidityEnum.VIOLATES_SCHEMA;
  return (
    <Tooltip placement="top" content={validity}>
      {isValid ? (
        <CheckCircle color="success" />
      ) : (
        <Alert color={isInvalid ? "critical" : "warning"} />
      )}
    </Tooltip>
  );
};

export default EndpointMockValidityIcon;

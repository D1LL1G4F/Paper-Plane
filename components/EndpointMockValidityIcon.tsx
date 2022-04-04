import { Alert, CheckCircle } from "@kiwicom/orbit-components/lib/icons";
import Popover from "@kiwicom/orbit-components/lib/Popover";
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
    <Popover content={validity}>
      {isValid ? (
        <CheckCircle color="success" />
      ) : (
        <Alert color={isInvalid ? "critical" : "warning"} />
      )}
    </Popover>
  );
};

export default EndpointMockValidityIcon;

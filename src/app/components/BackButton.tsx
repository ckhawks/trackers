import styles from "./BackButton.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const BackButton = (props: {to: string, text: string}) => {
  return (
    <Link href={props.to} className={styles.BackButton}>
      <FontAwesomeIcon
        icon={faArrowLeft}
        size={"sm"}
        style={{ height: "14px" }}
      />
      {props.text}
    </Link>
  );
};
export default BackButton;
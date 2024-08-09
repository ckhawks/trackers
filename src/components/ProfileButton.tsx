"use client";

import styles from "@/app/page.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRightFromBracket, faChevronDown, faChevronUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button, Overlay, Popover } from "react-bootstrap";
import { useRef, useState } from "react";
import Link from "next/link";

const ProfileButton = (props: {username: string}) => {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
  
    const handleProfileClick = (event: any) => {
      setShow(!show);
      setTarget(event.target);
    };

  return (
    <>
        <div ref={ref} style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button className={`${styles.button} ${styles['button-secondary']}`} onClick={handleProfileClick}>
                <FontAwesomeIcon icon={faChevronDown} style={{marginRight: '8px'}}/> <FontAwesomeIcon icon={faUser} style={{color: 'rgba(0,0,0,.8)'}}/> <span style={{color: 'black', fontWeight: 500 }} >{props.username}</span>
            </Button>

            <Overlay
                show={show}
                target={target}
                placement="bottom-end"
                container={ref}
                containerPadding={0}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h3">User Menu</Popover.Header>
                    <Popover.Body>
                        <Link href="/api/logout"><FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout</Link>
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>
    </>
  );
};
export default ProfileButton;
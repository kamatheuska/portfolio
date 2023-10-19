import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faBars,
    faXmark,
    faUpRightFromSquare,
    faEnvelope,
    faArrowUp,
    faCircleXmark,
    faGear,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faInstagram, faLinkedin, faStackOverflow } from '@fortawesome/free-brands-svg-icons';
library.add(
    faBars,
    faXmark,
    faCircleXmark,
    faUpRightFromSquare,
    faGithub,
    faInstagram,
    faLinkedin,
    faStackOverflow,
    faEnvelope,
    faArrowUp,
    faGear
);

export { FontAwesomeIcon as CustomFontAwesomeIcon };

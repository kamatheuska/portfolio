import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faXmark, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
library.add(faBars, faXmark, faCircleXmark, faUpRightFromSquare);

export { FontAwesomeIcon as CustomFontAwesomeIcon };

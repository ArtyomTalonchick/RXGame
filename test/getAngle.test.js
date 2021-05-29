import test from "ava";
import angleOptions from "./getAngleOptions";

import RXObjectHelper from "../src/helpers/RXObjectHelper";

const getNumber = n => (+(n.toFixed(12))).toString();

angleOptions.forEach(options => {  
  test(`${options[0]}`, t => {

    t.is(getNumber(RXObjectHelper.getAngle(...options[1])), getNumber(options[2]))
  });
});
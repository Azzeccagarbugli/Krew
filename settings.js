var start_msg = "*Welcome in Krew!*\n\nWith this Bot you will be able to understand "+
                "more information about your blood through the command /blood"
var help_msg = "_I need your help_"
var positive_negative = "_Insert the value of the positivity or negativity_"

var blood_group= {
                  "AB":"Blood group AB individuals have both A and B antigens on the surface of their RBCs, and their blood"+
                     "plasma does not contain any antibodies against either A or B antigen."+
                     "\nTherefore, an individual with type AB blood can receive blood from any group (with AB being preferable),"+
                     "but cannot donate blood to any group other than AB. They are known as universal recipients.",
                  "A":"Blood group A individuals have the A antigen on the surface of their RBCs, and blood serum containing IgM antibodies against the B antigen."+
                    "\nTherefore, a group A individual can receive blood only from individuals of groups A or O "+
                    "(with A being preferable), and can donate blood to individuals with type A or AB.",
                  "B":"Blood group B individuals have the B antigen on the surface of their RBCs, and blood serum containing IgM antibodies against the A antigen."+
                    "\nTherefore, a group B individual can receive blood only from individuals of groups B or O (with B being preferable), and"+
                    "can donate blood to individuals with type B or AB.",
                  "O":"Blood group O (or blood group zero in some countries) individuals do not have either A or B antigens on the surface of their RBCs, and their "+
                    "blood serum contains IgM anti-A and anti-B antibodies. Therefore, a group O individual can receive blood only from a group O individual, but "+
                    "can donate blood to individuals of any ABO blood group (i.e., A, B, O or AB). If a patient in a hospital situation needs a blood transfusion in "+
                    "an emergency, and if the time taken to process the recipient's blood would cause a detrimental delay, O negative blood can be issued."+
                    "\nBecause it is compatible with anyone, O negative blood is often overused and consequently is always in short supply."+
                    "According to the American Association of Blood Banks and the British Chief Medical Officer’s National Blood Transfusion Committee, the use of "+
                    "group O RhD negative red cells should be restricted to persons with O negative blood, women who might be pregnant, and emergency cases in "+
                    "which blood-group testing is genuinely impracticable."
                  }

exports.start_msg = start_msg
exports.help_msg = help_msg
exports.positive_negative = positive_negative
exports.blood_group = blood_group

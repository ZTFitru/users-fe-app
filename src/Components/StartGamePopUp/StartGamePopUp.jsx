import React from "react";
import Popup from "reactjs-popup";

import "./StartGamePopUp";

function StartGamePopUp() {
  return (
    // <div>StartGamePopUp</div>
    // <Popup trigger={<button> Trigger</button>}>
    //   <div>Start game with {data.attributes.username}</div>
    //   <div>
    //     <button>Ok</button>
    //     <button>Cancel</button>
    //   </div>
    // </Popup>
    <div>
      <Popup trigger=
                {<button> Click to open modal </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                              Start game with 
                            </div>
                            <div>
                                <button onClick=
                                    {() => close()}>
                                        Close modal
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
    </div>
  );
}

export default StartGamePopUp;

import React from 'react';
import Information from './Information';
import listDev from "./Developers.json";

function Developer() {
    return (
        <div>
            <header>
                {listDev.map(des =>
                    <Information
                        name={des.name}
                        repository={des.repository}
                        hobby={des.hobby}
                    />
                )}
            </header>
        </div>
    )
}
export default Developer;
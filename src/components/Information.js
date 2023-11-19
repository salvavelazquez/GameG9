import React from "react";

function Information() {
    return(
        <div>
            <article>
                <ul>
                    <h3>{this.name}</h3>
                    <p>{this.repository}</p>
                    <p>{this.hobby}</p>
                </ul>
            </article>
        </div>
    )
}
export default Information;
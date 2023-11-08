import React from  'react';

function Header ({getLocation}){
    return(
        <form onSubmit={getLocation}>
            <input type="text" name="country"/>
        <input type="submit"/>
        </form>
    )
}

export default Header;